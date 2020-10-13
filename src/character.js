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
                            <td rowSpan={4}>
                                {character.image_url &&
                                <div style={{textAlign: "center"}}>
                                    <img src={character.image_url} height="150px"/>
                                </div>
                                }
                            </td>
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
                        <tr>
                            <CharacterInput
                                character={character}
                                characterKey={"image_url"}
                                type={"text"}
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
                <div className="sheet-section-spacer sheet-career-toggle-small"></div>

                <div className="sheet-description-toggle-small">
                    <div className="sheet-small-6 sheet-column">
                        <table cellSpacing="0" cellPadding="0" border="0">
                            <thead>
                            <tr><th colSpan="2">Description</th></tr>
                            </thead>
                            <tbody>
                            <tr>
                            <CharacterInput
                                character={character}
                                characterKey={"gender"}
                                type={"text"}
                                setState={setState}
                            />
                            </tr>
                            <tr>
                            <CharacterInput
                                character={character}
                                characterKey={"age"}
                                type={"text"}
                                setState={setState}
                            />
                            </tr>
                            <tr>
                            <CharacterInput
                                character={character}
                                characterKey={"height"}
                                type={"text"}
                                setState={setState}
                            />
                            </tr>
                            <tr>
                            <CharacterInput
                                character={character}
                                characterKey={"build"}
                                type={"text"}
                                setState={setState}
                            />
                            </tr>
                            <tr>
                            <CharacterInput
                                character={character}
                                characterKey={"hair"}
                                type={"text"}
                                setState={setState}
                            />
                            </tr>
                            <tr>
                            <CharacterInput
                                character={character}
                                characterKey={"eyes"}
                                type={"text"}
                                setState={setState}
                            />
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="sheet-small-6 sheet-column">
                        <table cellSpacing="0" cellPadding="0" border="0">
                            <thead>
                            <tr><th>Notable Features</th></tr>
                            </thead>
                            <tbody>
                            <tr><td>
                                <textarea
                                    rows="4"
                                    name="notable_features"
                                    value={character.notable_features}
                                    onChange={event => {
                                        event.preventDefault();
                                        const { target: {name, value} } = event;
                                        console.log(`FEATURES: ${name} ${value}`);
                                        setState(prev => ({
                                            ...prev,
                                            character: {
                                                ...prev.character,
                                                [name]: value
                                            }
                                        }))}
                                    }
                                >
                                </textarea>
                            </td></tr>
                            </tbody>
                        </table>
                        <table cellSpacing="0" cellPadding="0" border="0">
                            <thead>
                            <tr><th>Other</th></tr>
                            </thead>
                            <tbody>
                            <tr><td>
                                <textarea
                                    rows="4"
                                    name="other"
                                    value={character.other}
                                    onChange={event => {
                                        event.preventDefault();
                                        const { target: {name, value} } = event;
                                        setState(prev => ({
                                            ...prev,
                                            character: {
                                                ...prev.character,
                                                [name]: value
                                            }
                                        }))}
                                    }
                                >
                                </textarea>
                            </td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="sheet-clear"></div>
                <div className="sheet-section-spacer sheet-description-toggle-small"></div>

                <div className="sheet-motivation-toggle-small">
                    <div className="sheet-small-12 sheet-column">
                        <table cellSpacing="0" cellPadding="0" border="0">
                            <thead>
                            <tr><th colSpan="6">Motivations</th></tr>
                            </thead>
                            <tbody>
                            <tr>
                                <CharacterInput
                                    character={character}
                                    characterKey={"motivations_1_category"}
                                    type={"text"}
                                    setState={setState}
                                />
                                <CharacterInput
                                    character={character}
                                    characterKey={"motivations_1_type"}
                                    type={"text"}
                                    setState={setState}
                                />
                                <td><label>Description:</label></td>
                                <td>
                                    <textarea
                                        rows="2"
                                        name="motivations_1_description"
                                        value={character.motivations_1_description}
                                        onChange={event => {
                                            event.preventDefault();
                                            const { target: {name, value} } = event;
                                            setState(prev => ({
                                                ...prev,
                                                character: {
                                                    ...prev.character,
                                                    [name]: value
                                                }
                                            }))}
                                        }
                                    >
                                    </textarea>
                                </td>
                            </tr>
                            <tr>
                                <CharacterInput
                                    character={character}
                                    characterKey={"motivations_2_category"}
                                    type={"text"}
                                    setState={setState}
                                />
                                <CharacterInput
                                    character={character}
                                    characterKey={"motivations_2_type"}
                                    type={"text"}
                                    setState={setState}
                                />
                                <td><label>Description:</label></td>
                                <td>
                                    <textarea
                                        rows="2"
                                        name="motivations_2_description"
                                        value={character.motivations_2_description}
                                        onChange={event => {
                                            event.preventDefault();
                                            const { target: {name, value} } = event;
                                            setState(prev => ({
                                                ...prev,
                                                character: {
                                                    ...prev.character,
                                                    [name]: value
                                                }
                                            }))}
                                        }
                                    >
                                    </textarea>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="sheet-clear"></div>
                </div>
            </div>
            <div className="sheet-clear"></div>
            <div className="sheet-clear"></div>
            <div className="sheet-section-spacer sheet-character-toggle-small"></div>

            <div className="sheet-game-mechanics-toggle-small">
                <div className="sheet-row">
                    <div className="sheet-small-12 sheet-column">
                        <h3 className="sheet-section-header">Game Mechanics</h3>
                        <div className="sheet-mechanics-section">
                            <div className="sheet-obligation-toggle-small">
                                <table cellSpacing="0" cellPadding="0" border="0">
                                    <thead>
                                    <tr><th colSpan="4">Obligations</th></tr>
                                    </thead>
                                </table>
                                <br />
                                <fieldset className="repeating_obligation">
                                    <table cellSpacing="0" cellPadding="0" border="0">
                                        <tbody>
                                        <tr>
                                            <CharacterInput
                                                character={character}
                                                characterKey={"obligations_1_type"}
                                                type={"text"}
                                                value={character.obligations_1_type || ""}
                                                setState={setState}
                                            />
                                            <CharacterInput
                                                character={character}
                                                characterKey={"obligations_1_magnitude"}
                                                type={"number"}
                                                value={character.obligations_1_magnitude || 0}
                                                setState={setState}
                                            />
                                        </tr>
                                        <tr>
                                            <td><label>Details:</label></td>
                                            <td colSpan="3">
                                                <textarea
                                                    rows="3"
                                                    name="obligations_1_details"
                                                    value={character.obligations_1_details || ""}
                                                    onChange={event => {
                                                        event.preventDefault();
                                                        const { target: {name, value} } = event;
                                                        setState(prev => ({
                                                            ...prev,
                                                            character: {
                                                                ...prev.character,
                                                                [name]: value
                                                            }
                                                        }))}
                                                    }
                                                >
                                                </textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <CharacterInput
                                                character={character}
                                                characterKey={"obligations_2_type"}
                                                type={"text"}
                                                value={character.obligations_2_type || ""}
                                                setState={setState}
                                            />
                                            <CharacterInput
                                                character={character}
                                                characterKey={"obligations_2_magnitude"}
                                                type={"number"}
                                                value={character.obligations_2_magnitude || 0}
                                                setState={setState}
                                            />
                                        </tr>
                                        <tr>
                                            <td><label>Details:</label></td>
                                            <td colSpan="3">
                                                <textarea
                                                    rows="3"
                                                    name="obligations_2_details"
                                                    value={character.obligations_2_details || ""}
                                                    onChange={event => {
                                                        event.preventDefault();
                                                        const { target: {name, value} } = event;
                                                        setState(prev => ({
                                                            ...prev,
                                                            character: {
                                                                ...prev.character,
                                                                [name]: value
                                                            }
                                                        }))}
                                                    }
                                                >
                                                </textarea>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <br />
                                </fieldset>
                            </div>
                            <div className="sheet-clear"></div>
                        </div>
                    </div>
                    <div className="sheet-clear"></div>
                </div>
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
        image_url: "Image URL",
        gender: "Gender",
        age: "Age",
        height: "Height",
        build: "Build",
        hair: "Hair",
        eyes: "Eyes",
        motivations_1_category: "Category",
        motivations_1_type: "Type",
        motivations_2_category: "Category",
        motivations_2_type: "Type",
        obligations_1_type: "Type",
        obligations_1_magnitude: "Magnitude",
        obligations_2_type: "Type",
        obligations_2_magnitude: "Magnitude",
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