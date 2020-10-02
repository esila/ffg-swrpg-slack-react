import React, { useContext, useState, useEffect } from 'react'
import initState from './initStats'
import { API, Auth } from 'aws-amplify';
import { UserContext } from './App';
import Character from './character'
import Characteristics from './characteristics'
import SoakWoundsDefense from './soakWoundsDefense'
import Skills from './skills'
import Weapons from './weapons'
import Talents from './talents';
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
    const [state, setState] = useState({...initState, ...player_name, user: user});
    const {character, soakWounds, characteristics, generalSkills, combatSkills, knowledgeSkills, weapons, talents} = state;

    useEffect(() => {
        fetchCharacterSheets();
    }, []);

    async function fetchCharacterSheets() {
        const apiData = await API.graphql({ query: listCharacterSheets, variables: { filter: {user: {eq: user}}} });
        setCharacterSheets(apiData.data.listCharacterSheets.items);
        //console.log(apiData.data.listCharacterSheets.items[0]);
        const {createdAt, updatedAt, ...rest} = apiData.data.listCharacterSheets.items[0];
        console.log("REST");
        console.log(JSON.stringify(rest));

        const initTalents = rest.talents || initState.talents;
        console.log(`rest talents: ${JSON.stringify(rest.talents)}`);
        console.log(`init talents: ${JSON.stringify(initState.talents)}`);
        const newRest = {...rest, talents: initTalents };
        console.log("NEWREST");
        console.log(JSON.stringify(newRest));
        setState(newRest);
    }

    async function createCharacterSheet() {
        if (!character.name || !character.player_name) return;
        await API.graphql({ query: createCharacterSheetMutation, variables: { input: state } });
        fetchCharacterSheets();
    }

    async function updateCharacterSheet(id) {
        if (!character.name || !character.player_name) return;
        console.log("UPDATE: ", state);
        console.log(JSON.stringify(state));
        await API.graphql({ query: updateCharacterSheetMutation, variables: { input: { id, ...state } }});
        fetchCharacterSheets();
    }

    function handleSubmit(event) {
        event.preventDefault();
        characterSheets.length > 0 && characterSheets[0].id ? updateCharacterSheet(characterSheets[0].id) : createCharacterSheet()
    }

    return characterSheets.length > 0 ? (
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
                <p><button>Submit</button></p>
            </form>
        </div>
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
                <p><button>Submit</button></p>
            </form>
        </div>
}

export default CharacterSheet;
