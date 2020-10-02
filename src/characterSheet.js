import React, { useContext, useState, useEffect } from 'react'
import initState from './initStats'
import { API, Auth } from 'aws-amplify';
import { UserContext } from './App';
import Character from './character'
import Characteristics from './characteristics'
import SoakWoundsDefense from './soakWoundsDefense'
import Skills from './skills'
import Weapons from './weapons'
import serializeForm from 'form-serialize'
import './sheet-style.css';
import { listCharacterSheets } from './graphql/queries';
import {
    createCharacterSheet as createCharacterSheetMutation,
    updateCharacterSheet as updateCharacterSheetMutation
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
    const [state, setState] = useState({...initState, ...player_name});
    const {character, soakWounds, characteristics, generalSkills, combatSkills, knowledgeSkills, weapons} = state;

    useEffect(() => {
        fetchCharacterSheets();
    }, []);

    async function fetchCharacterSheets() {
        const apiData = await API.graphql({ query: listCharacterSheets });
        setCharacterSheets(apiData.data.listCharacterSheets.items);
    }

    async function createCharacterSheet() {
        if (!character.name || !character.player_name) return;
        await API.graphql({ query: createCharacterSheetMutation, variables: { input: state } });
        fetchCharacterSheets();
    }

    async function updateCharacterSheet(id) {
        if (!character.name || !character.player_name) return;
        //console.log("STATE: " + JSON.stringify(state));
        await API.graphql({ query: updateCharacterSheetMutation, variables: { input: { id, ...state } }});
        fetchCharacterSheets();
    }

    function handleSubmit(event) {
        event.preventDefault();
        //console.log("STATE: " + JSON.stringify(state));
        characterSheets.length > 0 && characterSheets[0].id ? updateCharacterSheet(characterSheets[0].id) : createCharacterSheet()
    }

    return (
        <div className={"charsheet"}>
            <h1>Character Sheet</h1>
            {characterSheets.map((characterSheet, cs_idx) => {
                return (
                    <h2 key={cs_idx}>{JSON.stringify(characterSheet)}</h2>
                )
            })}
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
                <p><button>Submit</button></p>
            </form>
        </div>
    )
}

export default CharacterSheet;
