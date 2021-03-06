import React, { useContext, useState, useEffect } from 'react'
import initState from '../initStats'
import { API } from 'aws-amplify';
import { UserContext } from '../App';
import Character from '../character'
import Characteristics from '../characteristics'
import Critical from '../critical'
import SoakWoundsDefense from '../soakWoundsDefense'
import Skills from '../skills'
import Weapons from '../weapons'
import Talents from '../talents';
import DestinyPool from '../destiny';
import Vehicles from '../vehicles';
import DiceModal from "../diceModal";
import {
    AppBar, Tabs, Tab
} from "@material-ui/core";
import '../sheet-style.css';
import { listCharacterSheets } from '../graphql/queries';
import {
    createCharacterSheet as createCharacterSheetMutation,
    updateCharacterSheet as updateCharacterSheetMutation,
    deleteCharacterSheet as deleteCharacterSheetMutation,
} from "../graphql/mutations";

function CharacterSheet({ fetchUserCharacterSheets, handleOpenSnackBar }){
    const user = useContext(UserContext);
    const player_name = {
        character: {
            ...initState.character,
            player_name: user
        }
    };
    const initDicePool = {
        ability: 0,
        proficiency: 0,
        boost: 0,
        difficulty: 0,
        challenge: 0,
        setback: 0,
        force: 0
    };
    const initDiceCheck = {
        dicePool: initDicePool,
        roll_message: {},
        roll_source: "",
        roll_user: "",
        roll_type: ""
    };
    const [characterSheets, setCharacterSheets] = useState([]);
    const [state, setState] = useState({...initState, ...player_name, user: user});
    const [activeIndex, setActiveIndex] = useState(0);
    const {
        character, soakWounds, characteristics, generalSkills, combatSkills, knowledgeSkills, weapons, talents,
        vehicles, critical_injuries
    } = state;

    // Dice Modal State
    const [open, setOpen] = useState(false);
    const [diceCheck, setDiceCheck] = useState(initDiceCheck);

    const handleClickOpen = (selectedDiceCheck) => {
        const dicePool = {...diceCheck.dicePool, ...selectedDiceCheck.dicePool};
        const {roll_source, roll_user, roll_message, roll_type} = selectedDiceCheck;
        setDiceCheck({ dicePool, roll_source, roll_user, roll_message, roll_type });
        setOpen(true);
    };

    const handleClose = () => {
        setDiceCheck(initDiceCheck);
        setOpen(false);
    };

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
        await API.graphql({ query: createCharacterSheetMutation, variables: { input: state } })
            .then(success => {
                    handleOpenSnackBar(["Character sheet created!", "success"]);
                    console.log(`SUCCESS: ${success}`);
                },
                error => {
                    console.log(`ERROR: ${JSON.stringify(error)}`)
                });
        setActiveIndex(0);
        fetchCharacterSheets();
        fetchUserCharacterSheets();
    }

    async function updateCharacterSheet(id) {
        if (!character.name || !character.player_name) return;
        //console.log("UPDATE: ", state);
        //console.log(JSON.stringify(state));
        await API.graphql({ query: updateCharacterSheetMutation, variables: { input: { id, ...state } }})
            .then(success => {
                    handleOpenSnackBar(["Character sheet saved!", "success"]);
                    console.log(`SUCCESS: ${success}`);
                },
                error => {
                    console.log(`ERROR: ${JSON.stringify(error)}`)
                });
        fetchCharacterSheets();
        fetchUserCharacterSheets();
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
        fetchUserCharacterSheets();
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

    return (
        <>
        <div className="character_select">
            {characterSheets.length > 0 &&
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
            }
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
                    <input type="radio" name="attr_sheet" className="sheet-tab-new sheet-tab-critical" value="5"/>
                    <span className="sheet-tab-new">&emsp;Critical Injuries&emsp;</span>

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
                            open={open}
                            setOpen={setOpen}
                            diceCheck={diceCheck}
                            setDiceCheck={setDiceCheck}
                            handleClickOpen={handleClickOpen}
                            handleClose={handleClose}
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
                            handleClickOpen={handleClickOpen}
                        />
                        <Talents
                            talents={talents}
                            setState={setState}
                        />
                    </div>
                    <div className="sheet-tab-content sheet-tab-critical">
                        <Critical source_name={character.name} critical_injuries={critical_injuries} type="Character" setState={setState}/>
                    </div>
                    <hr/>
                    <button type="button" onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}>Save Character Sheet</button>
                    {characterSheets.length > 0 &&
                    <button
                        type="button"
                        className="chat__delete"
                        style={{float: "right"}}
                        onClick={(event) => {
                            event.preventDefault();
                            const confirm = prompt("Enter 'DELETE' to confirm");
                            if (confirm === "DELETE") {
                                console.log("DELETE CALLED FOR ACTIVE INDEX: ", activeIndex);
                                console.log("DELETE CALLED FOR: ", characterSheets[activeIndex].character.name);
                                const deleteId = characterSheets[activeIndex].id;
                                if (!deleteId) return;
                                deleteCharacterSheet({id: deleteId});
                            } else {
                            }
                        }}
                    >
                        DELETE CHARACTER SHEET
                    </button>
                    }
                </form>
            </div>
            <Vehicles
                handleSubmit={handleSubmit}
                vehicles={vehicles}
                characteristics={characteristics}
                generalSkills={generalSkills}
                combatSkills={combatSkills}
                knowledgeSkills={knowledgeSkills}
                setState={setState}
                handleClickOpen={handleClickOpen}
            />
            <DiceModal
                open={open}
                diceCheck={diceCheck}
                setDiceCheck={setDiceCheck}
                handleClose={handleClose}
            />
        </div>
        </>
    );
}

export default CharacterSheet;
