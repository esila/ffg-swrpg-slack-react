import React from "react";
import careers from "./careers"
import specializations from "./specializations"
import speciesList from "./species"

const speciesDict = () => {
    let s = {};
    speciesList.forEach((elem) => { s[elem] = elem; });
    return s
};

function Character({character, setState}){

    function addSpecialization(event) {
        event.preventDefault();
        const specializationStub = {
            name: "",
            is_career: "yes",
        };
        let items = [...character.specializations];
        let newSpecializations = [...items, specializationStub];
        items = newSpecializations;
        console.log(`items: ${JSON.stringify(items)}`);
        setState(prev => ({
            ...prev,
            character: {
                ...prev.character,
                specializations: items
            }
        }));
    }

    function removeSpecialization(event, specialization_idx) {
        event.preventDefault();
        character.specializations.splice(specialization_idx, 1);
        setState(prev => ({
            ...prev,
            character: character
        }));
    }

    return (
        <div className="sheet-row">
            <div className="sheet-small-12 sheet-column">
                <h3>Character</h3>
                <table className="sheet-character" cellSpacing="0" cellPadding="0" border="0">
                    <tbody>
                        <tr>
                            <CharacterInput
                                character={character}
                                characterKey={"name"}
                                type={"text"}
                                setState={setState}
                            />
                            <CharacterInput
                                character={character}
                                characterKey={"player_name"}
                                type={"text"}
                                setState={setState}
                            />
                        </tr>
                        <tr>
                           <CharacterSelect
                               character={character}
                               characterKey={"species"}
                               type={"text"}
                               setState={setState}
                               options={speciesDict()}
                           />
                           <CharacterInput
                                character={character}
                                characterKey={"credits"}
                                type={"text"}
                                setState={setState}
                            />
                        </tr>
                        <tr>
                            <CharacterInput
                                character={character}
                                characterKey={"total_xp"}
                                type={"number"}
                                setState={setState}
                            />
                           <CharacterInput
                                character={character}
                                characterKey={"available_xp"}
                                type={"number"}
                                setState={setState}
                            />
                        </tr>
                    </tbody>
                </table>
                <div className="sheet-section-spacer sheet-career-toggle-small"></div>
                <div className="sheet-small-12 sheet-column">
                    <table cellSpacing="0" cellPadding="0" border="0">
                        <thead>
                            <tr>
                                <th>Career</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <CharacterSelect
                                    character={character}
                                    characterKey={"career"}
                                    type={"text"}
                                    setState={setState}
                                    options={careers}
                                    nested={true}
                                />
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="sheet-small-12 sheet-column">
                    <table cellSpacing="0" cellPadding="0" border="0">
                        <thead>
                            <tr>
                                <th>Specializations</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {character.specializations.map((specialization, specialization_idx) => {
                                return (
                                    <React.Fragment key={specialization_idx}>
                                     <tr key={specialization_idx}>
                                        <SpecializationSelect
                                            character={character}
                                            specialization_idx={specialization_idx}
                                            name={"name"}
                                            type={"text"}
                                            setState={setState}
                                            options={specializations}
                                            nested={true}
                                        />
                                    </tr>
                                    <tr>
                                        <SpecializationSelect
                                            character={character}
                                            specialization_idx={specialization_idx}
                                            name={"in_career"}
                                            type={"text"}
                                            setState={setState}
                                            options={{Yes: "yes", No: "no"}}
                                        />
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={(event) => { removeSpecialization(event, specialization_idx) }}>Delete Specialization</button>
                                        </td>
                                    </tr>
                                    </React.Fragment>

                                )
                            })}
                            <tr>
                                <td>
                                    <button onClick={(event) => { addSpecialization(event) }}>Add Specialization</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="sheet-clear"></div>
            </div>
        </div>
    )
}

const CharacterInput = ({character, characterKey, type, setState}) => {
    const character_labels = {
        name: "Name",
        player_name: "Player Name",
        credits: "Credits",
        total_xp: "Total XP",
        available_xp: "Available XP",
    };
    return (
        <>
            <td><label>{character_labels[characterKey]}</label></td>
            <td>
                <input
                    type={type}
                    name={`character_${characterKey}`}
                    value={`${character[characterKey]}`}
                    readOnly={characterKey === "player_name"}
                    onChange={event => {
                        event.preventDefault();
                        const { target: {value} } = event;
                        setState(prev => ({
                            ...prev,
                            character: {
                                ...prev.character,
                                [characterKey]: value
                            }
                    }))}}
                />
            </td>
        </>
    )
};

const CharacterSelect = ({character, characterKey, type, options, setState, nested = false}) => {
    const character_labels = {
        species: "Species",
        career: "Career",
    };
    return (
        <>
            <td><label>{character_labels[characterKey]}</label></td>
            <td>
                <select
                    type={type}
                    name={`character_${characterKey}`}
                    value={`${character[characterKey]}`}
                    onChange={event => {
                        event.preventDefault();
                        const { target: {value} } = event;
                        setState(prev => ({
                            ...prev,
                            character: {
                                ...prev.character,
                                [characterKey]: value
                            }
                    }))}}
                >
                {nested ?
                    Object.keys(options).map((option, idx) => {
                        return (
                            <optgroup key={idx} label={option}>
                                {options[option].map((opt, opt_idx) => {
                                    return ( <option key={opt_idx} value={opt}>{opt}</option> )
                                })}
                            </optgroup>
                        )
                    })
                    :
                    Object.keys(options).map((option, idx) => {
                        return <option key={idx} value={options[option]}>{option}</option>
                    })
                }
                </select>
            </td>
        </>
    )
};

const SpecializationSelect = ({character, specialization_idx, name, type, options, setState, nested = false}) => {
    const character_labels = {
        name: "Name",
        in_career: "In Career?",
    };
    return (
        <>
            <td><label>{character_labels[name]}</label></td>
            <td>
                <select
                    type={type}
                    name={`character_specialization_${name}`}
                    value={`${character.specializations[specialization_idx][name]}`}
                    onChange={event => {
                        event.preventDefault();
                        const { target: {value} } = event;
                        let items = [...character.specializations];
                        let item = {...items[specialization_idx]};
                        item[name] = value;
                        items[specialization_idx] = item;
                        setState(prev => ({
                            ...prev,
                            character: {
                                ...prev.character,
                                specializations: items
                            }
                        }))
                    }}
                >
                {nested ?
                    Object.keys(options).map((option, idx) => {
                        return (
                            <optgroup key={idx} label={option}>
                                {options[option].map((opt, opt_idx) => {
                                    return ( <option key={opt_idx} value={opt}>{opt}</option> )
                                })}
                            </optgroup>
                        )
                    })
                    :
                    Object.keys(options).map((option, idx) => {
                        return <option key={idx} value={options[option]}>{option}</option>
                    })
                }
                </select>
            </td>
        </>
    )
};

export default Character