import React, { useContext, useState, useEffect } from 'react'
import initState from './initStats'
import { API } from 'aws-amplify';
import { UserContext } from './App';
import Character from './character'
import Characteristics from './characteristics'
import SoakWoundsDefense from './soakWoundsDefense'
import Skills from './skills'
import Weapons from './weapons'
import Talents from './talents';
import DestinyPool from './destiny';
import Vehicles from './vehicles';
import { AppBar, Tabs, Tab } from "@material-ui/core";
import './sheet-style.css';
import { listCharacterSheets } from './graphql/queries';
import {
    createCharacterSheet as createCharacterSheetMutation,
    updateCharacterSheet as updateCharacterSheetMutation,
    deleteCharacterSheet as deleteCharacterSheetMutation, deleteFabricObject as deleteFabricObjectMutation
} from "./graphql/mutations";

function CharacterSheet(){
    const user = useContext(UserContext);
    const player_name = {
        character: {
            ...initState.character,
            player_name: user
        }
    };
    const [characterSheets, setCharacterSheets] = useState([]);
    const [state, setState] = useState({...initState, ...player_name, user: user});
    const [activeIndex, setActiveIndex] = useState(0);
    const {character, soakWounds, characteristics, generalSkills, combatSkills, knowledgeSkills, weapons, talents, vehicles} = state;

    useEffect(() => {
        fetchCharacterSheets();
    }, []);

    async function fetchCharacterSheets() {
        const apiData = await API.graphql({ query: listCharacterSheets, variables: { filter: {user: {eq: user}}} });
        setCharacterSheets(apiData.data.listCharacterSheets.items);
        //console.log(apiData.data.listCharacterSheets.items[0]);
        const newData = apiData.data.listCharacterSheets.items && apiData.data.listCharacterSheets.items[activeIndex || 0];
        if (newData) {
            console.log("newData: ", newData);
            let restData = newData;
            if (Object.keys(newData).includes("createdAt")) {
                const {createdAt, updatedAt, ...rest} = newData;
                restData = rest;
            }
            //console.log(JSON.stringify(restData));
            const initTalents = restData.talents || initState.talents;
            const initVehicles = restData.vehicles || initState.vehicles;
            //console.log(`rest talents: ${JSON.stringify(rest.talents)}`);
            //console.log(`init talents: ${JSON.stringify(initState.talents)}`);
            const newRest = {...restData, talents: initTalents, vehicles: initVehicles};
            //console.log("NEWREST");
            //console.log(JSON.stringify(newRest));
            setState(newRest);
        } else {
            setState({...initState, ...player_name, user: user});
        }
    }

    async function createCharacterSheet() {
        if (!character.name || !character.player_name) return;
        console.log("Create character sheet: ", state);
        await API.graphql({ query: createCharacterSheetMutation, variables: { input: state } });
        setActiveIndex(0);
        fetchCharacterSheets();
    }

    async function updateCharacterSheet(id) {
        if (!character.name || !character.player_name) return;
        //console.log("UPDATE: ", state);
        //console.log(JSON.stringify(state));
        await API.graphql({ query: updateCharacterSheetMutation, variables: { input: { id, ...state } }})
            .then(success => {
                console.log(`SUCCESS: ${success}`);
            },
                error => {
                console.log(`ERROR: ${JSON.stringify(error)}`)
                });
        fetchCharacterSheets();
    }

    async function deleteCharacterSheet({ id }) {
        setActiveIndex(0);
        await API.graphql({ query: deleteCharacterSheetMutation, variables: { input: { id } }})
            .then(success => {
                console.log(`SUCCESS`);
            },
                error => {
                console.log(`ERROR`)
                });
        fetchCharacterSheets();
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(state);
        characterSheets.length > 0 && characterSheets[activeIndex] && characterSheets[activeIndex].id ? updateCharacterSheet(characterSheets[activeIndex].id) : createCharacterSheet()
    }

    function handleTabChange(e, v) {
        e.preventDefault();
        if (v === -1) {
            setActiveIndex(-1);
            setState({...initState, ...player_name, user: user});
        } else {
            setActiveIndex(v);
            const {createdAt, updatedAt, ...rest} = characterSheets[v];
            console.log("Curr CS: ", rest);
            setState(rest);
        }
    }

    return characterSheets.length > 0 ? (
        <>
        <div className="character_select">
            <AppBar position="static" color="default">
                <Tabs
                    value={activeIndex}
                    onChange={handleTabChange}
                    aria-label="simple tabs example"
                    variant="fullWidth"
                >
                    <Tab value={-1} label="New Character Sheet"/>
                    {characterSheets.map((cs, cs_index) => {
                        return <Tab key={cs_index} value={cs_index} label={cs.character.name}/>
                    })}
                </Tabs>
            </AppBar>
        </div>
        <div className={"charsheet"}>
            <DestinyPool characterName={character.name}/>
            <input type="radio" name="attr_gmdicepool" className="sheet-player" value="1" defaultChecked="checked"
                   style={{display: "none"}}/>
            <input type="radio" name="attr_pcgm" className="sheet-tab-new sheet-tab-character-sheet sheet-player-sheet"
                   value="1" defaultChecked="checked"/>
            <span className="sheet-tab-new sheet-player-sheet">Character Sheet</span>
            <input type="radio" name="attr_pcgm" className="sheet-tab-new sheet-tab-ship-sheet sheet-player-sheet"
                   value="2" defaultChecked=""/>
            <span className="sheet-tab-new sheet-player-sheet">Vehicle Sheet</span>
            <div className="charsheet sheet-tab-content sheet-tab-character-sheet">
                <form onSubmit={handleSubmit}>
                    <SoakWoundsDefense soakWoundsDefense={soakWounds} setState={setState} />
                    <div className="sheet-clear"></div>

                    <input type="radio" name="attr_sheet" className="sheet-tab-new sheet-tab-character" value="1"
                           defaultChecked="checked"/>
                    <span className="sheet-tab-new">&emsp;Character Info&emsp;</span>
                    <input type="radio" name="attr_sheet" className="sheet-tab-new sheet-tab-skills" value="2"/>
                    <span className="sheet-tab-new">&emsp; &emsp;Skills&emsp; &emsp;</span>
                    <input type="radio" name="attr_sheet" className="sheet-tab-new sheet-tab-talents" value="3"/>
                    <span className="sheet-tab-new">&emsp; &emsp;Combat&emsp; &emsp;</span>

                    <div className="sheet-tab-content sheet-tab-character">
                        <Character character={character} setState={setState} />
                    </div>
                    <div className="sheet-tab-content sheet-tab-skills">
                        <Characteristics characteristics={characteristics} setState={setState} />
                        <Skills
                            character={character}
                            characteristics={characteristics}
                            generalSkills={generalSkills}
                            combatSkills={combatSkills}
                            knowledgeSkills={knowledgeSkills}
                            setState={setState}
                        />
                    </div>
                    <div className="sheet-tab-content sheet-tab-talents">
                        <Weapons
                            character={character}
                            weapons={weapons}
                            characteristics={characteristics}
                            generalSkills={generalSkills}
                            combatSkills={combatSkills}
                            setState={setState}
                        />
                        <Talents
                            talents={talents}
                            setState={setState}
                        />
                    </div>
                    <hr/>
                    <button>Save Character Sheet</button>
                    <button
                            className="chat__delete"
                            style={{float: "right"}}
                            onClick={(event) => {
                                event.preventDefault();
                                console.log("DELETE CALLED FOR ACTIVE INDEX: ", activeIndex);
                                console.log("DELETE CALLED FOR: ", characterSheets[activeIndex].character.name);
                                const deleteId = characterSheets[activeIndex].id;
                                if (!deleteId) return;
                                deleteCharacterSheet({id: deleteId});
                            }}
                        >
                            DELETE CHARACTER SHEET
                        </button>
                </form>
            </div>
            <Vehicles vehicles={vehicles} characteristics={characteristics} combatSkills={combatSkills} setState={setState} />
        </div>
        </>
    )
        :
        <div className={"charsheet"}>
            <input type="radio" name="attr_gmdicepool" className="sheet-player" value="1" defaultChecked="checked"
                   style={{display: "none"}}/>
            <input type="radio" name="attr_pcgm" className="sheet-tab-new sheet-tab-character-sheet sheet-player-sheet"
                   value="1" defaultChecked="checked"/>
            <span className="sheet-tab-new sheet-player-sheet">Character Sheet</span>
            <input type="radio" name="attr_pcgm" className="sheet-tab-new sheet-tab-ship-sheet sheet-player-sheet"
                   value="2" defaultChecked=""/>
            <span className="sheet-tab-new sheet-player-sheet">Vehicle Sheet</span>
            <div className="charsheet sheet-tab-content sheet-tab-character-sheet">
                <form onSubmit={handleSubmit}>
                    <SoakWoundsDefense soakWoundsDefense={soakWounds} setState={setState} />
                    <Character character={character} setState={setState} />
                    <Characteristics characteristics={characteristics} setState={setState} />
                    <Skills
                        character={character}
                        characteristics={characteristics}
                        generalSkills={generalSkills}
                        combatSkills={combatSkills}
                        knowledgeSkills={knowledgeSkills}
                        setState={setState}
                    />
                    <Weapons
                        character={character}
                        weapons={weapons}
                        characteristics={characteristics}
                        generalSkills={generalSkills}
                        combatSkills={combatSkills}
                        setState={setState}
                    />
                    <Talents
                        talents={talents}
                        setState={setState}
                    />
                    <p><button>Save</button></p>
                </form>
            </div>
            <Vehicles vehicles={vehicles} characteristics={characteristics} combatSkills={combatSkills} setState={setState} />
        </div>
}

export default CharacterSheet;
