import React, { useState } from 'react'
import initState from './initStats'
import Character from './character'
import Characteristics from './characteristics'
import SoakWoundsDefense from './soakWoundsDefense'
import Skills from './skills'
import Weapons from './weapons'
import serializeForm from 'form-serialize'
import './sheet-style.css';

function CharacterSheet(){
    const [state, setState] = useState(initState);
    const {character, soakWounds, characteristics, generalSkills, combatSkills, knowledgeSkills, weapons} = state;

    function handleSubmit(event) {
        event.preventDefault();
        console.log(JSON.stringify(state));
        //const values = serializeForm(event.target, { hash: true });
        //console.log(values);

    }

    return (
        <div className={"charsheet"}>
            <h1>Character Sheet</h1>
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
