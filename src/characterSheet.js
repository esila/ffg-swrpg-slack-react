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
        const newData = apiData.data.listCharacterSheets.items && apiData.data.listCharacterSheets.items[0];
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
        fetchCharacterSheets();
    }

    async function updateCharacterSheet(id) {
        if (!character.name || !character.player_name) return;
        //console.log("UPDATE: ", state);
        //console.log(JSON.stringify(state));
        await API.graphql({ query: updateCharacterSheetMutation, variables: { input: { id, ...state } }});
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

    return characterSheets.length > 0 ? (
        <>
        <div className="character_select">
            <a
                href="#"
                onClick={() => {
                    setActiveIndex();
                    setState({...initState, ...player_name, user: user});
                }}
            >New Character Sheet |</a>
            {characterSheets.map((cs, cs_index) => {
                return (
                    <a key={cs_index} href="#" onClick={() => {
                        setActiveIndex(cs_index);
                        const {createdAt, updatedAt, ...rest} = characterSheets[cs_index];
                        console.log("Curr CS: ", rest);
                        //const initTalents = rest.talents || initState.talents;
                        //const newRest = {...rest, talents: initTalents };
                        setState(rest);
                    }}>{cs.character.name} |</a>
                )
            })}
        </div>
        <div className={"charsheet"}>
            <DestinyPool characterName={character.name}/>
            <form onSubmit={handleSubmit}>
                <Character character={character} setState={setState} />
                <SoakWoundsDefense soakWoundsDefense={soakWounds} setState={setState} />
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
                <Vehicles vehicles={vehicles} characteristics={characteristics} combatSkills={combatSkills} setState={setState} />
                <p><button>Save</button></p>
                <p><button
                        className="chat__delete"
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
                </p>
            </form>
        </div>
        </>
    )
        :
        <div className={"charsheet"}>
            <form onSubmit={handleSubmit}>
                <Character character={character} setState={setState} />
                <SoakWoundsDefense soakWoundsDefense={soakWounds} setState={setState} />
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
                <Vehicles vehicles={vehicles} characteristics={characteristics} combatSkills={combatSkills} setState={setState} />
                <p><button>Save</button></p>
            </form>
        </div>
}

export default CharacterSheet;
