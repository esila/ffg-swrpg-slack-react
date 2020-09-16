import React from "react";
import DiceRoller from './diceRoller'

function Weapons({ character, weapons, characteristics, generalSkills, combatSkills, setState }){

    const getDerivedWeaponSkills = (skill) => {
        const derivedMap = {
            Brawl: ["Brawn", combatSkills],
            Gunnery: ["Agility", combatSkills],
            Melee: ["Brawn", combatSkills],
            RangedLight: ["Agility", combatSkills],
            RangedHeavy: ["Agility", combatSkills],
            Lightsaber: ["Brawn", combatSkills],
            Mechanics: ["Intellect", generalSkills],
            Medicine: ["Intellect", generalSkills],
            Resilience: ["Brawn", generalSkills],
        };
        const [characteristicKey, skillGroup] = derivedMap[skill];
        const characteristic = characteristics[characteristicKey];
        const rank = skillGroup[skill].rank;
        return characteristic === rank ?
          `${rank}p`
          : `${Math.min(characteristic, rank)}p ${Math.abs(characteristic - rank)}a`
    };

    function addWeapon(event) {
        event.preventDefault();
        const weaponStub = {
            make_model: "",
            weapon_type: "",
            modifiers: "",
            book_page: "",
            restricted: "No",
            features: "",
            range: "Engaged",
            skill: "Brawl",
            condition: "New",
            rarity: "",
            value: "",
            qualities: "",
            damage: 0,
            critical: 0,
            encumberance: 0,
            hp: 0,
            attachments: [
                {
                    attachment_name: "",
                    hard_points: "",
                    base_modifiers: "",
                    modifications: "",
                    book_page: "",
                }
            ]
        };
        setState(prev => ({
            ...prev,
            weapons: [
                ...prev.weapons,
                weaponStub
            ]
        }));
    }

    function removeWeapon(event,idx) {
        event.preventDefault();
        weapons.splice(idx, 1);
        setState(prev => ({
            ...prev,
            weapons: weapons
        }));
    }

    function addAttachment(event, weapon_idx) {
        event.preventDefault();
        const attachmentStub = {
            attachment_name: "",
            hard_points: 0,
            base_modifiers: "",
            modifications: "",
            book_page: "",
        };
        let items = [...weapons];
        let newAttachment = [...items[weapon_idx].attachments, attachmentStub];
        items[weapon_idx].attachments = newAttachment;
        setState(prev => ({
            ...prev,
            weapons: items
        }))
    }

    function removeAttachment(event, weapon_idx, attach_idx) {
        event.preventDefault();
        weapons[weapon_idx].attachments.splice(attach_idx, 1);
        setState(prev => ({
            ...prev,
            weapons: weapons
        }));
    }


    const damageCritArray = ["Damage", "Critical", "Encum", "HP"];

    return (
        <div className="sheet-row">
            <div className="sheet-small-12 sheet-column">
                <h3>Weapons</h3>
                <div className="sheet-weapon-section">
                    <fieldset className="repeating_weapons">
                        {weapons && weapons.map((elem, weapon_idx) => {
                            return (
                                <div key={weapon_idx} className="sheet-weapon">
                                    <div className="sheet-row">
                                        <table className="sheet-weapons" cellSpacing="0" cellPadding="0"
                                               border="0">
                                            <tbody>
                                            <tr>
                                                {damageCritArray.map((title, idx) => {
                                                    const lowerTitle = title === "Encum" ? "encumberance" : title.toLowerCase();
                                                    const {damage, critical, range, qualities, modifiers} = weapons[weapon_idx];
                                                    return (
                                                        <React.Fragment key={idx}>
                                                            {title !== "Encum" &&
                                                                <td></td>
                                                            }
                                                            {title === "Encum" &&
                                                                <td>
                                                                    <DiceRoller
                                                                        rollType={"weaponroll"}
                                                                        diceSource={weapons[weapon_idx].make_model}
                                                                        diceMessage={{
                                                                            Damage: damage,
                                                                            Critical: critical,
                                                                            Range: range,
                                                                            Qualities: qualities,
                                                                        }}
                                                                        diceUser={character.name || "anonymous"}
                                                                        diceString={`${getDerivedWeaponSkills(weapons[weapon_idx].skill)} ${modifiers}`}/>
                                                                </td>
                                                            }
                                                            <td>
                                                                <label data-i18n={lowerTitle}>{title}</label>
                                                                <input
                                                                    type="text"
                                                                    name={`weapon_${weapon_idx}_${lowerTitle}`}
                                                                    value={`${elem[lowerTitle]}`}
                                                                    style={{width: "50%"}}
                                                                    onChange={event => {
                                                                        event.preventDefault();
                                                                        const { target: {value} } = event;
                                                                        let items = [...weapons];
                                                                        let item = {...items[weapon_idx]};
                                                                        item[lowerTitle] = value;
                                                                        items[weapon_idx] = item;
                                                                        setState(prev => ({
                                                                            ...prev,
                                                                            weapons: items
                                                                        }))
                                                                    }}
                                                                  />
                                                            </td>
                                                        </React.Fragment>
                                                    )
                                                })}
                                                <td></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <table cellSpacing="0" cellPadding="0" border="0">
                                            <tbody>
                                            <tr>
                                                <WeaponInput
                                                    weapons={weapons}
                                                    weapon_idx={weapon_idx}
                                                    weaponKey={"make_model"}
                                                    type={"text"}
                                                    setState={setState}
                                                />
                                                <WeaponSelect
                                                    weapons={weapons}
                                                    weapon_idx={weapon_idx}
                                                    weaponKey={"range"}
                                                    setState={setState}
                                                    options={{
                                                        Engaged: "engaged",
                                                        Short: "short",
                                                        Medium: "medium",
                                                        Long: "long",
                                                        Extreme: "extreme",
                                                    }}
                                                />
                                            </tr>
                                            <tr>
                                                <WeaponInput
                                                    weapons={weapons}
                                                    weapon_idx={weapon_idx}
                                                    weaponKey={"weapon_type"}
                                                    type={"text"}
                                                    setState={setState}
                                                />
                                                <WeaponSelect
                                                    weapons={weapons}
                                                    characteristics={characteristics}
                                                    combatSkills={combatSkills}
                                                    generalSkills={generalSkills}
                                                    weapon_idx={weapon_idx}
                                                    weaponKey={"skill"}
                                                    setState={setState}
                                                    options={{
                                                        "Combat Skills": ["Brawl", "Gunnery", "Melee", "RangedLight", "RangedHeavy", "Lightsaber"],
                                                        "General Skills": ["Mechanics", "Medicine", "Resilience"],
                                                    }}
                                                    nested={true}
                                                />
                                            </tr>
                                            <tr>
                                                <WeaponInput
                                                    weapons={weapons}
                                                    weapon_idx={weapon_idx}
                                                    weaponKey={"modifiers"}
                                                    type={"text"}
                                                    setState={setState}
                                                />
                                                <WeaponSelect
                                                    weapons={weapons}
                                                    weapon_idx={weapon_idx}
                                                    weaponKey={"condition"}
                                                    setState={setState}
                                                    options={{
                                                        New: "",
                                                        Minor: "1s",
                                                        Moderate: "1d",
                                                        Major: "unusableWeapon",

                                                    }}
                                                />
                                            </tr>
                                            <tr>
                                                <WeaponInput
                                                    weapons={weapons}
                                                    weapon_idx={weapon_idx}
                                                    weaponKey={"book_page"}
                                                    type={"text"}
                                                    setState={setState}
                                                />
                                                <WeaponInput
                                                    weapons={weapons}
                                                    weapon_idx={weapon_idx}
                                                    weaponKey={"rarity"}
                                                    type={"number"}
                                                    setState={setState}
                                                />
                                            </tr>
                                            <tr>
                                                <WeaponSelect
                                                    weapons={weapons}
                                                    weapon_idx={weapon_idx}
                                                    weaponKey={"restricted"}
                                                    setState={setState}
                                                    options={{
                                                        No: "no",
                                                        Yes: "yes",
                                                    }}
                                                />
                                                <WeaponInput
                                                    weapons={weapons}
                                                    weapon_idx={weapon_idx}
                                                    weaponKey={"value"}
                                                    type={"text"}
                                                    setState={setState}
                                                />
                                            </tr>
                                            <tr>
                                                <WeaponTextArea
                                                    weapons={weapons}
                                                    weapon_idx={weapon_idx}
                                                    weaponKey={"features"}
                                                    type={"text"}
                                                    rows={2}
                                                    setState={setState}
                                                />
                                                <WeaponTextArea
                                                    weapons={weapons}
                                                    weapon_idx={weapon_idx}
                                                    weaponKey={"qualities"}
                                                    type={"text"}
                                                    rows={2}
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
                                        <div className="sheet-attachments-wrapper">
                                            <input type="checkbox" name="attr_weaponattchments"
                                                   className="sheet-view-attachments"/>
                                            <label className="sheet-view-attachments"
                                                   data-i18n="viewattachments">View Attachments</label>
                                            <div className="sheet-clear"></div>
                                            <table className="sheet-attachments" cellSpacing="0"
                                                   cellPadding="0" border="0">
                                                <thead>
                                                <tr>
                                                    <th>Attachment Name</th>
                                                    <th>Hard Points</th>
                                                    <th>Base Modifiers</th>
                                                    <th>Modifications</th>
                                                    <th>Book &amp; Page</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {elem.attachments.map((attachment, attach_idx) => {
                                                    return (
                                                        <React.Fragment key={attach_idx}>
                                                        <tr>
                                                            <td>
                                                                <AttachmentInput
                                                                    weapons={weapons}
                                                                    setState={setState}
                                                                    name={"attachment_name"}
                                                                    type={"text"}
                                                                    weapon_idx={weapon_idx}
                                                                    attachment_idx={attach_idx}
                                                                 />
                                                            </td>
                                                            <td>
                                                                 <AttachmentInput
                                                                    weapons={weapons}
                                                                    setState={setState}
                                                                    name={"hard_points"}
                                                                    type={"number"}
                                                                    weapon_idx={weapon_idx}
                                                                    attachment_idx={attach_idx}
                                                                 />
                                                            </td>
                                                            <td>
                                                                 <AttachmentTextArea
                                                                    weapons={weapons}
                                                                    setState={setState}
                                                                    name={"base_modifiers"}
                                                                    type={"number"}
                                                                    rows={3}
                                                                    weapon_idx={weapon_idx}
                                                                    attachment_idx={attach_idx}
                                                                 />
                                                            </td>
                                                            <td>
                                                                 <AttachmentTextArea
                                                                    weapons={weapons}
                                                                    setState={setState}
                                                                    name={"modifications"}
                                                                    type={"number"}
                                                                    rows={3}
                                                                    weapon_idx={weapon_idx}
                                                                    attachment_idx={attach_idx}
                                                                 />
                                                            </td>
                                                            <td>
                                                                <AttachmentInput
                                                                    weapons={weapons}
                                                                    setState={setState}
                                                                    name={"book_page"}
                                                                    type={"text"}
                                                                    weapon_idx={weapon_idx}
                                                                    attachment_idx={attach_idx}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <button onClick={(event) => { removeAttachment(event, weapon_idx, attach_idx) }}>Delete Attachment</button>
                                                            </td>
                                                        </tr>
                                                        </React.Fragment>
                                                    )
                                                })}
                                                <tr>
                                                    <td>
                                                        <button onClick={(event) => { addAttachment(event, weapon_idx) }}>Add Attachment</button>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <button onClick={(event) => { removeWeapon(event, weapon_idx) }}>Delete Weapon</button>
                                </div>
                            )
                        })}
                        <button onClick={(event) => { addWeapon(event) }}>Add</button>
                        <div className="sheet-clear" ></div>
                    </fieldset>
                </div> <div className="sheet-clear"></div>
            </div>
        </div>
    )
}

const WeaponSelect = ({weapons, weapon_idx, weaponKey, setState, options, value, nested = false, characteristics = {}, combatSkills = {}, generalSkills = {}}) => {
    const weapon_labels = {
        skill: "Skill",
        range: "Range",
        condition: "Condition",
        restricted: "Restricted",
    };


    return (
        <>
        <td><label>{weapon_labels[weaponKey]}:</label></td>
        <td>
            <select
                name={`weapon_${weapon_idx}_${weaponKey}`}
                onChange={event => {
                    event.preventDefault();
                    const { target: {value} } = event;
                    let items = [...weapons];
                    let item = {...items[weapon_idx]};
                    item[weaponKey] = value;
                    items[weapon_idx] = item;
                    setState(prev => ({
                        ...prev,
                        weapons: items
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

const WeaponInput = ({weapons, weapon_idx, weaponKey, type, setState}) => {
    const weapon_labels = {
        make_model: "Make / Model",
        weapon_type: "Weapon Type",
        modifiers: "Modifiers",
        book_page: "Book & Page",
        rarity: "Rarity",
        value: "Value",
    };
    return (
        <>
            <td><label>{weapon_labels[weaponKey]}</label></td>
            <td>
                <input
                    type={type}
                    name={`weapon_${weapon_idx}_${weaponKey}`}
                    value={`${weapons[weapon_idx][weaponKey]}`}
                    onChange={event => {
                        event.preventDefault();
                        const { target: {value} } = event;
                        let items = [...weapons];
                        let item = {...items[weapon_idx]};
                        item[weaponKey] = value;
                        items[weapon_idx] = item;
                        setState(prev => ({
                            ...prev,
                            weapons: items
                        }))
                    }}
                />
            </td>
        </>
    )
};

const WeaponTextArea = ({weapons, weapon_idx, weaponKey, type, rows, setState}) => {
    const weapon_labels = {
        features: "Features",
        qualities: "Qualities",
    };
    return (
        <>
            <td><label>{weapon_labels[weaponKey]}</label></td>
            <td>
                <textarea
                    rows={rows}
                    type={type}
                    name={`weapon_${weapon_idx}_${weaponKey}`}
                    value={`${weapons[weapon_idx][weaponKey]}`}
                    onChange={event => {
                        event.preventDefault();
                        const { target: {value} } = event;
                        let items = [...weapons];
                        let item = {...items[weapon_idx]};
                        item[weaponKey] = value;
                        items[weapon_idx] = item;
                        setState(prev => ({
                            ...prev,
                            weapons: items
                        }))
                    }}
                />
            </td>
        </>
    )
};

const AttachmentInput = ({weapons, setState, name, type, weapon_idx, attachment_idx}) => {
    return (
        <input
            type={type}
            name={`weapon_${weapon_idx}_attachment_${attachment_idx}_${name}`}
            value={`${weapons[weapon_idx].attachments[attachment_idx][name]}`}
            onChange={event => {
                event.preventDefault();
                const { target: {value} } = event;
                let items = [...weapons];
                let item = {...items[weapon_idx].attachments[attachment_idx]};
                item[name] = value;
                items[weapon_idx].attachments[attachment_idx] = item;
                setState(prev => ({
                    ...prev,
                    weapons: items
                }))
            }}
        />
    )
};

const AttachmentTextArea = ({weapons, setState, name, type, weapon_idx, attachment_idx, rows}) => {
    return (
        <textarea
            type={type}
            rows={rows}
            name={`weapon_${weapon_idx}_attachment_${attachment_idx}_${name}`}
            value={`${weapons[weapon_idx].attachments[attachment_idx][name]}`}
            onChange={event => {
                event.preventDefault();
                const { target: {value} } = event;
                let items = [...weapons];
                let item = {...items[weapon_idx].attachments[attachment_idx]};
                item[name] = value;
                items[weapon_idx].attachments[attachment_idx] = item;
                setState(prev => ({
                    ...prev,
                    weapons: items
                }))
            }}
        />
    )
};

export default Weapons;