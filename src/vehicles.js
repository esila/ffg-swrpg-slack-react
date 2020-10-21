import React from "react";
import DiceRoller from './diceRoller'

function Vehicles({ vehicles, setState, characteristics, combatSkills, handleClickOpen }){
    const starship_details = vehicles.starship;
    const starship_defense = vehicles.starship.starship_defense;
    const starship_weapons = vehicles.starship.starship_weapons;
    const starship_attachments = vehicles.starship.starship_attachments;

    function getDerivedDicePool(skill) {
        const derivedMap = {
            Gunnery: ["Agility", combatSkills],
            RangedHeavy: ["Agility", combatSkills],
        };
        const [characteristicKey, skillGroup] = derivedMap[skill];
        const characteristic = characteristics[characteristicKey];
        const rank = skillGroup[skill].rank;
        return characteristic === rank ?
            {proficiency: rank}
            :
            {
                proficiency: Math.min(characteristic, rank),
                ability: Math.abs(characteristic - rank)
            }
    }

    const getDerivedWeaponSkills = (skill) => {
        const derivedMap = {
            Gunnery: ["Agility", combatSkills],
            RangedHeavy: ["Agility", combatSkills],
        };
        const [characteristicKey, skillGroup] = derivedMap[skill];
        const characteristic = characteristics[characteristicKey];
        const rank = skillGroup[skill].rank;
        return characteristic === rank ?
          `${rank}p`
          : `${Math.min(characteristic, rank)}p ${Math.abs(characteristic - rank)}a`
    };

    function handleVehicleDetails(e, vehicle_type) {
        e.preventDefault();
        const { target: {value, name} } = e;
        setState(prev => ({
            ...prev,
            vehicles: {
                ...prev.vehicles,
                [vehicle_type]: {
                    ...prev.vehicles[vehicle_type],
                    [name]: name === "hard_points" ? parseInt(value) : value
                }
            }
        }))
    }

    function handleDefenseKeys(e, vehicle_type) {
        e.preventDefault();
        const { target: {value, name} } = e;
        setState(prev => ({
            ...prev,
            vehicles: {
                ...prev.vehicles,
                [vehicle_type]: {
                    ...prev.vehicles[vehicle_type],
                    starship_defense: {
                        ...prev.vehicles[vehicle_type].starship_defense,
                        [name]: parseInt(value)
                    }
                }
            }
        }))
    }

    function handleDefenseThreshold(e, vehicle_type) {
        e.preventDefault();
        const { target: {value, name} } = e;
        const [attr, thresh_curr] = name.split('-');
        setState(prev => ({
            ...prev,
            vehicles: {
                ...prev.vehicles,
                [vehicle_type]: {
                    ...prev.vehicles[vehicle_type],
                    starship_defense: {
                        ...prev.vehicles[vehicle_type].starship_defense,
                        [attr]: {
                            ...prev.vehicles[vehicle_type].starship_defense[attr],
                            [thresh_curr]: parseInt(value)
                        }
                    }
                }
            }
        }))
    }

    function handleWeapon(e, vehicle_type, weapon_idx) {
        e.preventDefault();
        const { target: {value, name} } = e;
        let items = [...starship_weapons];
        let item = {...items[weapon_idx]};
        item[name] = value;
        items[weapon_idx] = item;
        setState(prev => ({
            ...prev,
            vehicles: {
                ...prev.vehicles,
                [vehicle_type]: {
                    ...prev.vehicles[vehicle_type],
                    starship_weapons: items
                }
            }
        }))
    }

    function handleAttachment(e, vehicle_type, attachment_idx) {
        e.preventDefault();
        const { target: {value, name} } = e;
        let items = [...starship_attachments];
        let item = {...items[attachment_idx]};
        item[name] = value;
        items[attachment_idx] = item;
        setState(prev => ({
            ...prev,
            vehicles: {
                ...prev.vehicles,
                [vehicle_type]: {
                    ...prev.vehicles[vehicle_type],
                    starship_attachments: items
                }
            }
        }))
    }

    function handleWeaponCheckbox(e, vehicle_type, weapon_idx) {
        const target = e.target;
        const value = target.checked;
        const name = target.name;
        let items = [...starship_weapons];
        let item = {...items[weapon_idx]};
        item[name] = value;
        items[weapon_idx] = item;
        setState(prev => ({
            ...prev,
            vehicles: {
                ...prev.vehicles,
                [vehicle_type]: {
                    ...prev.vehicles[vehicle_type],
                    starship_weapons: items
                }
            }
        }))
    }

    function addVehicleWeapon(event, vehicle_type) {
        event.preventDefault();

        const vehicleWeaponStub = {
            character_name: "",
            weapon_name: "",
            arc_fore: false,
            arc_starboard: false,
            arc_aft: false,
            arc_port: false,
            critical: 0,
            damage: 0,
            range: "Close",
            dice: "",
            special: "",
            skill: "Gunnery",
            book_page: "",
            rarity: "",
            restricted: "No",
            value: ""
        };
        setState(prev => ({
            ...prev,
            vehicles: {
                ...prev.vehicles,
                [vehicle_type]: {
                    ...prev.vehicles[vehicle_type],
                    starship_weapons: [
                        ...prev.vehicles[vehicle_type].starship_weapons,
                        vehicleWeaponStub
                    ]
                }
            }
        }))
    }

    function removeVehicleWeapon(event, vehicle_type, idx) {
        event.preventDefault();
        vehicles[vehicle_type].starship_weapons.splice(idx, 1);
        setState(prev => ({
            ...prev,
            vehicles: {
                ...prev.vehicles,
                [vehicle_type]: {
                    ...prev.vehicles[vehicle_type],
                    starship_weapons: vehicles[vehicle_type].starship_weapons
                }
            }
        }));
    }

    function addVehicleAttachment(event, vehicle_type) {
        event.preventDefault();

        const vehicleAttachmentStub = {
            name: "",
            hard_points: 0,
            base_modifiers: "",
            modifications: "",
            book_page: "",
            rarity: "",
            restricted: "No",
            value: ""
        };
        setState(prev => ({
            ...prev,
            vehicles: {
                ...prev.vehicles,
                [vehicle_type]: {
                    ...prev.vehicles[vehicle_type],
                    starship_attachments: [
                        ...prev.vehicles[vehicle_type].starship_attachments,
                        vehicleAttachmentStub
                    ]
                }
            }
        }))
    }

    function removeVehicleAttachment(event, vehicle_type, idx) {
        event.preventDefault();
        vehicles[vehicle_type].starship_attachments.splice(idx, 1);
        setState(prev => ({
            ...prev,
            vehicles: {
                ...prev.vehicles,
                [vehicle_type]: {
                    ...prev.vehicles[vehicle_type],
                    starship_attachments: vehicles[vehicle_type].starship_attachments
                }
            }
        }));
    }
    return (
        <div className="sheet-tab-content sheet-tab-ship-sheet">
            <br/>
            <input type="radio" name="attr_v-sheet" className="sheet-tab-new sheet-tab-transport-space" value="1"
                   defaultChecked="checked"/>
            <span className="sheet-tab-new">&emsp;Starship&emsp;</span>
            <input type="radio" name="attr_v-sheet" className="sheet-tab-new sheet-tab-transport-planetary" value="2"/>
            <span className="sheet-tab-new">&emsp;Planetary&emsp;</span>
            <div className="sheet-tab-content sheet-tab-transport-space">
                <div className="sheet-row">
                    <div className="sheet-small-12 sheet-column">
                        <h3>Vehicles</h3>
                        <table className="sheet-ship" cellSpacing="0" cellPadding="0" border="0">
                            <tbody>
                            <tr>
                                <td className="sheet-ship-char-bg">
                                    <label>Silhouette</label>
                                    <input
                                        name="silhouette"
                                        type="number"
                                        max="10"
                                        min="0"
                                        value={starship_defense.silhouette}
                                        onChange={(e) => { handleDefenseKeys(e, "starship") }}
                                    />
                                </td>
                                <td className="sheet-ship-char-thre-bg-speed">
                                    <label className="sheet-label-title">Speed</label>
                                    <br/>
                                    <input
                                        name="speed-max"
                                        type="number"
                                        max="10"
                                        min="0"
                                        value={starship_defense.speed.max}
                                        onChange={(e) => { handleDefenseThreshold(e, "starship") }}
                                    />
                                    <input
                                        name="speed-current"
                                        type="number"
                                        max="10"
                                        min="0"
                                        value={starship_defense.speed.current}
                                        onChange={(e) => { handleDefenseThreshold(e, "starship") }}
                                    />
                                    <br/>
                                    <label className="sheet-label-threshold-speed">Max</label>
                                    <label className="sheet-label-current-speed">Current</label>
                                </td>
                                <td className="sheet-ship-char-bg">
                                    <label>Handling</label>
                                    <input
                                        name="handling"
                                        type="number"
                                        max="99"
                                        min="-9"
                                        value={starship_defense.handling}
                                        onChange={(e) => { handleDefenseKeys(e, "starship") }}
                                    />
                                </td>
                                <td rowSpan="2" className="sheet-ship-defense">
                                    <div style={{width: "302px", height: "1px"}}></div>
                                    <div className="sheet-fore">
                                        <label>Fore</label>
                                        <br/>
                                        <input
                                            name="fore"
                                            type="number"
                                            max="4"
                                            min="0"
                                            value={starship_defense.fore}
                                            onChange={(e) => { handleDefenseKeys(e, "starship") }}
                                        />
                                    </div>
                                    <div className="sheet-starboard">
                                        <label>Starboard</label>
                                        <br/>
                                        <input
                                            name="starboard"
                                            type="number"
                                            max="4"
                                            min="0"
                                            value={starship_defense.starboard}
                                            onChange={(e) => { handleDefenseKeys(e, "starship") }}
                                        />
                                    </div>
                                    <div className="sheet-aft">
                                        <label>Aft</label>
                                        <br/>
                                        <input
                                            name="aft"
                                            type="number"
                                            max="4"
                                            min="0"
                                            value={starship_defense.aft}
                                            onChange={(e) => { handleDefenseKeys(e, "starship") }}
                                        />
                                    </div>
                                    <div className="sheet-port">
                                        <label>Port</label>
                                        <br/>
                                        <input
                                            name="port"
                                            type="number"
                                            max="4"
                                            min="0"
                                            value={starship_defense.port}
                                            onChange={(e) => { handleDefenseKeys(e, "starship") }}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="sheet-ship-char-bg sheet-armor">
                                    <label className="sheet-label-title">Armor</label>
                                    <input
                                        name="armor"
                                        type="number"
                                        max="99"
                                        min="0"
                                        value={starship_defense.armor}
                                        onChange={(e) => { handleDefenseKeys(e, "starship") }}
                                    />
                                </td>
                                <td className="sheet-ship-char-thre-bg">
                                    <label className="sheet-label-title">Hull Trauma</label>
                                    <br/>
                                    <input
                                        name="hull_trauma-threshold"
                                        type="number"
                                        min="0"
                                        value={starship_defense.hull_trauma.threshold}
                                        onChange={(e) => { handleDefenseThreshold(e, "starship") }}
                                    />
                                    <input
                                        name="hull_trauma-current"
                                        type="number"
                                        min="0"
                                        value={starship_defense.hull_trauma.current}
                                        onChange={(e) => { handleDefenseThreshold(e, "starship") }}
                                    />
                                    <br/>
                                    <label className="sheet-label-threshold">Threshold</label>
                                    <label className="sheet-label-current">Current</label>
                                </td>
                                <td className="sheet-ship-char-thre-bg">
                                    <label className="sheet-label-title">Sys Strain</label>
                                    <br/>
                                    <input
                                        name="system_strain-threshold"
                                        type="number"
                                        min="0"
                                        value={starship_defense.system_strain.threshold}
                                        onChange={(e) => { handleDefenseThreshold(e, "starship") }}
                                    />
                                    <input
                                        name="system_strain-current"
                                        type="number"
                                        min="0"
                                        value={starship_defense.system_strain.current}
                                        onChange={(e) => { handleDefenseThreshold(e, "starship") }}
                                    />
                                    <br/>
                                    <label className="sheet-label-threshold">Threshold</label>
                                    <label className="sheet-label-current">Current</label>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="sheet-row">
                    <div className="sheet-small-12 sheet-column">
                        <h3 className="sheet-section-header">Space Vehicle Details</h3>
                        <div className="sheet-details-section">
                            <table cellSpacing="0" cellPadding="0" border="0">
                                <tbody>
                                <tr>
                                    <td><label>Name:</label></td>
                                    <td>
                                        <input
                                            name="name"
                                            type="text"
                                            value={starship_details.name}
                                            onChange={(e) => { handleVehicleDetails(e, "starship") }}
                                        />
                                    </td>
                                    <td><label>Hard Points:</label></td>
                                    <td>
                                        <input
                                            name="hard_points"
                                            type="number"
                                            min="0"
                                            max="9"
                                            value={starship_details.hard_points}
                                            onChange={(e) => { handleVehicleDetails(e, "starship") }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Hull Type/Class:</label></td>
                                    <td>
                                        <input
                                            name="hull_type"
                                            type="text"
                                            value={starship_details.hull_type}
                                            onChange={(e) => { handleVehicleDetails(e, "starship") }}
                                        />
                                    </td>
                                    <td><label>Sensor Range:</label></td>
                                    <td>
                                        <select
                                            name="sensor_range"
                                            value={starship_details.sensor_range}
                                            onChange={(e) => { handleVehicleDetails(e, "starship") }}
                                        >
                                            <option value="none">None</option>
                                            <option value="Close">Close</option>
                                            <option value="Short">Short</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Long">Long</option>
                                            <option value="Extreme">Extreme</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Manufacturer:</label></td>
                                    <td>
                                        <input
                                            name="attr_transport-space-manufact"
                                            type="text"
                                        />
                                    </td>
                                    <td><label>Ship's Complement:</label></td>
                                    <td>
                                        <input
                                            name="ship_complement"
                                            type="text"
                                            value={starship_details.ship_complement}
                                            onChange={(e) => { handleVehicleDetails(e, "starship") }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Hyperdrive Primary Class:</label></td>
                                    <td>
                                        <input
                                            name="hyperdrive_primary_class"
                                            type="number"
                                            min="0"
                                            max="20"
                                            value={starship_details.hyperdrive_primary_class}
                                            onChange={(e) => { handleVehicleDetails(e, "starship") }}
                                        />
                                    </td>
                                    <td><label>Hyperdrive Backup Class:</label></td>
                                    <td>
                                        <input
                                            name="hyperdrive_backup_class"
                                            type="number"
                                            min="0"
                                            max="20"
                                            value={starship_details.hyperdrive_backup_class}
                                            onChange={(e) => { handleVehicleDetails(e, "starship") }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Consumables:</label></td>
                                    <td>
                                        <input
                                            name="consumables"
                                            type="text"
                                            value={starship_details.consumables}
                                            onChange={(e) => { handleVehicleDetails(e, "starship") }}
                                        />
                                    </td>
                                    <td><label>Navicomputer:</label></td>
                                    <td>
                                        <select
                                            name="navicomputer"
                                            value={starship_details.navicomputer}
                                            onChange={(e) => { handleVehicleDetails(e, "starship") }}
                                        >
                                            <option value="no">No</option>
                                            <option value="yes">Yes</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Book &amp; Page:</label></td>
                                    <td>
                                        <input
                                            name="book_page"
                                            type="text"
                                            value={starship_details.book_page}
                                            onChange={(e) => { handleVehicleDetails(e, "starship") }}
                                        />
                                    </td>
                                    <td><label>Rarity</label></td>
                                    <td>
                                        <input
                                            name="rarity"
                                            type="number"
                                            min="1"
                                            max="10"
                                            value={starship_details.rarity}
                                            onChange={(e) => { handleVehicleDetails(e, "starship") }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Restricted:</label></td>
                                    <td>
                                        <select
                                            name="restricted"
                                            value={starship_details.restricted}
                                            onChange={(e) => { handleVehicleDetails(e, "starship") }}
                                        >
                                            <option value="no">No</option>
                                            <option value="yes">Yes</option>
                                        </select>
                                    </td>
                                    <td><label>Value:</label></td>
                                    <td>
                                        <input
                                            name="value"
                                            type="text"
                                            value={starship_details.value}
                                            onChange={(e) => { handleVehicleDetails(e, "starship") }}
                                        />
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="sheet-clear"></div>
                </div>
                <div className="sheet-row">
                    <div className="sheet-small-12 sheet-column">
                        <h3 className="sheet-section-header">Starship Weapons</h3>
                        {starship_weapons && starship_weapons.map((weapon, weapon_idx) => {
                            return (
                                <div key={weapon_idx} className="sheet-weapon-section">
                                    <table cellSpacing="0" cellPadding="0" border="0">
                                        <thead>
                                        <tr>
                                            <th>Character Name</th>
                                            <th>Weapon Name</th>
                                            <th>Arc</th>
                                            <th>Crit</th>
                                            <th>Dmg</th>
                                            <th colSpan="2">Range/Skill</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <input
                                                    name="character_name"
                                                    type="text"
                                                    value={weapon.character_name}
                                                    onChange={(e) => { handleWeapon(e, "starship", weapon_idx) }}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    name="weapon_name"
                                                    type="text"
                                                    value={weapon.weapon_name}
                                                    onChange={(e) => { handleWeapon(e, "starship", weapon_idx) }}
                                                />
                                            </td>
                                            <td className="sheet-firearc-field">
                                                <input
                                                    name="arc_fore"
                                                    type="checkbox"
                                                    className="sheet-fireArcFore"
                                                    title="Fore"
                                                    checked={weapon.arc_fore}
                                                    onChange={(e) => { handleWeaponCheckbox(e, "starship", weapon_idx) }}
                                                />
                                                <input
                                                    name="arc_starboard"
                                                    type="checkbox"
                                                    className="sheet-fireArcStarboard"
                                                    title="Starboard"
                                                    checked={weapon.arc_starboard}
                                                    onChange={(e) => { handleWeaponCheckbox(e, "starship", weapon_idx) }}
                                                />
                                                <input
                                                    name="arc_aft"
                                                    type="checkbox"
                                                    className="sheet-fireArcAft"
                                                    title="Aft"
                                                    checked={weapon.arc_aft}
                                                    onChange={(e) => { handleWeaponCheckbox(e, "starship", weapon_idx) }}
                                                />
                                                <input
                                                    name="arc_port"
                                                    type="checkbox"
                                                    className="sheet-fireArcPort"
                                                    title="Port"
                                                    checked={weapon.arc_port}
                                                    onChange={(e) => { handleWeaponCheckbox(e, "starship", weapon_idx) }}
                                                />
                                                <span className="sheet-fireArcForeImg"></span>
                                                <span className="sheet-fireArcStarboardImg"></span>
                                                <span className="sheet-fireArcAftImg"></span>
                                                <span className="sheet-fireArcPortImg"></span>
                                            </td>
                                            <td style={{width: "50px"}}>
                                                <input
                                                    name="critical"
                                                    type="number"
                                                    max="99"
                                                    min="0"
                                                    value={weapon.critical}
                                                    onChange={(e) => { handleWeapon(e, "starship", weapon_idx) }}
                                                />
                                            </td>
                                            <td style={{width: "50px"}}>
                                                <input
                                                    name="damage"
                                                    type="number"
                                                    max="99"
                                                    min="0"
                                                    value={weapon.damage}
                                                    onChange={(e) => { handleWeapon(e, "starship", weapon_idx) }}
                                                />
                                            </td>
                                            <td style={{width: "150px"}}>
                                                <select
                                                    name="range"
                                                    value={weapon.range}
                                                    onChange={(e) => { handleWeapon(e, "starship", weapon_idx) }}
                                                >
                                                    <option value="Close">Close</option>
                                                    <option value="Short">Short</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="Long">Long</option>
                                                    <option value="Extreme">Extreme</option>
                                                </select>
                                            </td>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label style={{display: "inline-block", width: "25%"}}>Dice:</label>
                                                <input
                                                    style={{display: "inline-block", width: "74%"}}
                                                    name="dice"
                                                    type="text"
                                                    value={weapon.dice}
                                                    onChange={(e) => { handleWeapon(e, "starship", weapon_idx) }}
                                                />
                                            </td>
                                            <td colSpan="4">
                                                <label style={{display: "inline-block", width: "25%"}}>Special:</label>
                                                <input
                                                    style={{display: "inline-block", width: "74%"}}
                                                    name="special"
                                                    type="text"
                                                    value={weapon.special}
                                                    onChange={(e) => { handleWeapon(e, "starship", weapon_idx) }}
                                                />
                                            </td>
                                            <td>
                                                <select
                                                    name="skill"
                                                    value={weapon.skill}
                                                    onChange={(e) => { handleWeapon(e, "starship", weapon_idx) }}
                                                >
                                                    <option value="Gunnery">Gunnery</option>
                                                    <option value="RangedHeavy">Ranged - Heavy</option>
                                                </select>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleClickOpen(
                                                        {
                                                            dicePool: getDerivedDicePool(weapon.skill),
                                                            roll_type: "weaponroll",
                                                            roll_source: weapon.weapon_name,
                                                            roll_user: weapon.character_name || "anonymous",
                                                            roll_message: {
                                                                Damage: weapon.damage,
                                                                Critical: weapon.critical,
                                                                Range: weapon.range,
                                                                Qualities: weapon.special,
                                                            },
                                                        }
                                                    )}
                                                >Check</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><label>Book &amp; Page:</label></td>
                                            <td>
                                                <input
                                                    name="book_page"
                                                    type="text"
                                                    value={weapon.book_page}
                                                    onChange={(e) => { handleWeapon(e, "starship", weapon_idx) }}
                                                />
                                            </td>
                                            <td><label>Rarity</label></td>
                                            <td>
                                                <input
                                                    name="rarity"
                                                    type="number"
                                                    min="1"
                                                    max="10"
                                                    value={weapon.rarity}
                                                    onChange={(e) => { handleWeapon(e, "starship", weapon_idx) }}
                                                />
                                            </td>
                                            <td><label>Restricted:</label></td>
                                            <td>
                                                <select
                                                    name="restricted"
                                                    value={weapon.restricted}
                                                    onChange={(e) => { handleWeapon(e, "starship", weapon_idx) }}
                                                >
                                                    <option value="no">No</option>
                                                    <option value="yes">Yes</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><label>Value:</label></td>
                                            <td>
                                                <input
                                                    name="value"
                                                    type="text"
                                                    value={weapon.value}
                                                    onChange={(e) => { handleWeapon(e, "starship", weapon_idx) }}
                                                />
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <br/>
                                    <button style={{float: "right"}} onClick={(event) => { removeVehicleWeapon(event, "starship", weapon_idx) }}>Delete Weapon</button>
                                </div>
                            )
                        })}
                        <button onClick={(event) => { addVehicleWeapon(event, "starship") }}>Add Weapon</button>
                    </div>
                    <div className="sheet-clear"></div>
                </div>
                <div className="sheet-row">
                    <div className="sheet-small-12 sheet-column">
                        <h3 className="sheet-section-header">Starship Attachments</h3>
                        {starship_attachments && starship_attachments.map((attachment, attachment_idx) => {
                            return (
                                <div key={attachment_idx} className="sheet-attachments-section">
                                    <table cellSpacing="0" cellPadding="0" border="0">
                                        <tbody>
                                        <tr>
                                            <th style={{width: "25%"}}>Name</th>
                                            <th style={{width: "25%"}}>Hard points</th>
                                            <th style={{width: "25%"}}>Base Modifiers</th>
                                            <th style={{width: "25%"}}>Modifications</th>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <fieldset className="repeating_space-attachments">
                                        <table cellSpacing="0" cellPadding="0" border="0">
                                            <tbody>
                                            <tr>
                                                <td style={{width: "25%"}}>
                                                    <input
                                                        name="name"
                                                        type="text"
                                                        value={attachment.name}
                                                        onChange={(e) => { handleAttachment(e, "starship", attachment_idx) }}
                                                    />
                                                </td>
                                                <td style={{width: "25%"}}>
                                                    <input
                                                        name="hard_points"
                                                        type="text"
                                                        value={attachment.hard_points}
                                                        onChange={(e) => { handleAttachment(e, "starship", attachment_idx) }}
                                                    />
                                                </td>
                                                <td style={{width: "25%"}}>
                                                    <input
                                                        name="base_modifiers"
                                                        type="text"
                                                        value={attachment.base_modifiers}
                                                        onChange={(e) => { handleAttachment(e, "starship", attachment_idx) }}
                                                    />
                                                </td>
                                                <td style={{width: "25%"}}>
                                                    <input
                                                        name="modifications"
                                                        type="text"
                                                        value={attachment.modifications}
                                                        onChange={(e) => { handleAttachment(e, "starship", attachment_idx) }}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><label>Book &amp; Page:</label></td>
                                                <td>
                                                    <input
                                                        name="book_page"
                                                        type="text"
                                                        value={attachment.book_page}
                                                        onChange={(e) => { handleAttachment(e, "starship", attachment_idx) }}
                                                    />
                                                </td>
                                                <td><label>Rarity</label></td>
                                                <td>
                                                    <input
                                                        name="rarity"
                                                        type="number"
                                                        min="1"
                                                        max="10"
                                                        value={attachment.rarity}
                                                        onChange={(e) => { handleAttachment(e, "starship", attachment_idx) }}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><label>Restricted:</label></td>
                                                <td>
                                                    <select
                                                        name="restricted"
                                                        value={attachment.restricted}
                                                        onChange={(e) => { handleAttachment(e, "starship", attachment_idx) }}
                                                    >
                                                        <option value="no">No</option>
                                                        <option value="yes">Yes</option>
                                                    </select>
                                                </td>
                                                <td><label>Value:</label></td>
                                                <td>
                                                    <input
                                                        name="value"
                                                        type="text"
                                                        value={attachment.value}
                                                        onChange={(e) => { handleAttachment(e, "starship", attachment_idx) }}
                                                    />
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <button style={{float: "right"}} onClick={(event) => { removeVehicleAttachment(event, "starship", attachment_idx) }}>Delete Attachment</button>
                                        <br/>
                                    </fieldset>
                                </div>
                            )
                        })}
                        <button onClick={(event) => { addVehicleAttachment(event, "starship") }}>Add Attachment</button>
                    </div>
                    <div className="sheet-clear"></div>
                </div>
            </div>
        </div>
    )
}

export default Vehicles;