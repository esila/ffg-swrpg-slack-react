import React from "react";

function Talents({ talents, setState }){

    function addTalent(event) {
        event.preventDefault();
        const talentStub = {
            name: "",
            rank: 0,
            passive_active: "passive",
            book_page: "",
            xp_cost: 0,
            summary: ""
        };

        setState(prev => ({
            ...prev,
            talents: [
                ...prev.talents,
                talentStub
            ]
        }));
    }

    function removeTalent(event,idx) {
        event.preventDefault();
        talents.splice(idx, 1);
        setState(prev => ({
            ...prev,
            talents: talents
        }));
    }

    return (
        <div className="sheet-row">
            <div className="sheet-small-12 sheet-column">
                <h3>Talents</h3>
                <div className="sheet-talent-section">
                    <fieldset className="repeating_skills">
                        {talents && talents.map((elem, talent_idx) => {
                            return (
                                <div key={talent_idx} className="sheet-talent">
                                    <div className="sheet-row">
                                        <table cellSpacing="0" cellPadding="0" border="0">
                                            <tbody>
                                            <tr>
                                                <TalentInput
                                                    talents={talents}
                                                    talent_idx={talent_idx}
                                                    talentKey={"name"}
                                                    type={"text"}
                                                    setState={setState}
                                                />
                                                <TalentTextArea
                                                    talents={talents}
                                                    talent_idx={talent_idx}
                                                    talentKey={"summary"}
                                                    type={"text"}
                                                    rows={3}
                                                    setState={setState}
                                                />
                                            </tr>
                                            <tr>
                                                <TalentInput
                                                    talents={talents}
                                                    talent_idx={talent_idx}
                                                    talentKey={"rank"}
                                                    type={"number"}
                                                    setState={setState}
                                                />
                                                <TalentSelect
                                                    talents={talents}
                                                    talent_idx={talent_idx}
                                                    talentKey={"passive_active"}
                                                    setState={setState}
                                                    options={{
                                                        Passive: "passive",
                                                        Active: "active"
                                                    }}
                                                />
                                            </tr>
                                            <tr>
                                                <TalentInput
                                                    talents={talents}
                                                    talent_idx={talent_idx}
                                                    talentKey={"book_page"}
                                                    type={"text"}
                                                    setState={setState}
                                                />
                                                <TalentInput
                                                    talents={talents}
                                                    talent_idx={talent_idx}
                                                    talentKey={"xp_cost"}
                                                    type={"number"}
                                                    setState={setState}
                                                />
                                            </tr>
                                            <tr>
                                                <td colSpan="4">
                                                    &nbsp;
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <button style={{float: "right"}} onClick={(event) => { removeTalent(event, talent_idx) }}>Delete Talent</button>
                                </div>
                            )
                        })}
                        <button onClick={(event) => { addTalent(event) }}>Add Talent</button>
                        <div className="sheet-clear" ></div>
                    </fieldset>
                </div> <div className="sheet-clear"></div>
            </div>
        </div>
    )
};

const TalentSelect = ({talents, talent_idx, talentKey, setState, options, value, nested = false }) => {
    const talent_labels = {
        passive_active: "Passive/Active",
    };


    return (
        <>
        <td><label>{talent_labels[talentKey]}:</label></td>
        <td>
            <select
                name={`talent_${talent_idx}_${talentKey}`}
                onChange={event => {
                    event.preventDefault();
                    const { target: {value} } = event;
                    let items = [...talents];
                    let item = {...items[talent_idx]};
                    item[talentKey] = value;
                    items[talent_idx] = item;
                    setState(prev => ({
                        ...prev,
                        talents: items
                    }))
                }}
            >
                {nested ?
                    Object.keys(options).map((option, idx) => {
                        return (
                            <optgroup key={idx} label={option}>
                                {options[option].map((skill, skill_idx) => {
                                    return ( <option key={skill_idx} value={skill}>{skill}</option> )
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

const TalentInput = ({talents, talent_idx, talentKey, type, setState}) => {
    const talent_labels = {
        name: "Name",
        rank: "Rank",
        book_page: "Book & Page",
        xp_cost: "XP Cost",
        summary: "Summary",
    };
    return (
        <>
            <td><label>{talent_labels[talentKey]}</label></td>
            <td>
                <input
                    type={type}
                    name={`talent_${talent_idx}_${talentKey}`}
                    value={`${talents[talent_idx][talentKey]}`}
                    onChange={event => {
                        event.preventDefault();
                        const { target: {value} } = event;
                        let items = [...talents];
                        let item = {...items[talent_idx]};
                        item[talentKey] = value;
                        items[talent_idx] = item;
                        setState(prev => ({
                            ...prev,
                            talents: items
                        }))
                    }}
                />
            </td>
        </>
    )
};

const TalentTextArea = ({talents, talent_idx, talentKey, type, rows, setState}) => {
    const talent_labels = {
        summary: "Summary",
    };
    return (
        <>
            <td><label>{talent_labels[talentKey]}</label></td>
            <td>
                <textarea
                    rows={rows}
                    type={type}
                    name={`talent_${talent_idx}_${talentKey}`}
                    value={`${talents[talent_idx][talentKey]}`}
                    onChange={event => {
                        event.preventDefault();
                        const { target: {value} } = event;
                        let items = [...talents];
                        let item = {...items[talent_idx]};
                        item[talentKey] = value;
                        items[talent_idx] = item;
                        setState(prev => ({
                            ...prev,
                            talents: items
                        }))
                    }}
                />
            </td>
        </>
    )
};

export default Talents;