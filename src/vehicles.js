import React from "react";

function Vehicles({ vehicles, setState }){
    const starship_defense = vehicles.starship.defense;
    const starship_weapons = vehicles.starship.weapons;
    const starship_attachments = vehicles.starship.attachments;

    function handleDefenseKeys(e, vehicle_type) {
        e.preventDefault();
        const { target: {value, name} } = e;
        setState(prev => ({
            ...prev,
            vehicles: {
                ...prev.vehicles,
                [vehicle_type]: {
                    ...prev.vehicles[vehicle_type],
                    defense: {
                        ...prev.vehicles[vehicle_type].defense,
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
                    defense: {
                        ...prev.vehicles[vehicle_type].defense,
                        [attr]: {
                            ...prev.vehicles[vehicle_type].defense[attr],
                            [thresh_curr]: parseInt(value)
                        }
                    }
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
                    weapons: [
                        ...prev.vehicles[vehicle_type].weapons,
                        vehicleWeaponStub
                    ]
                }
            }
        }))
    }

    function removeVehicleWeapon(event, vehicle_type, idx) {
        event.preventDefault();
        vehicles[vehicle_type].weapons.splice(idx, 1);
        setState(prev => ({
            ...prev,
            vehicles: {
                ...prev.vehicles,
                [vehicle_type]: {
                    ...prev.vehicles[vehicle_type],
                    weapons: vehicles[vehicle_type].weapons
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
                    attachments: [
                        ...prev.vehicles[vehicle_type].attachments,
                        vehicleAttachmentStub
                    ]
                }
            }
        }))
    }

    function removeVehicleAttachment(event, vehicle_type, idx) {
        event.preventDefault();
        vehicles[vehicle_type].attachments.splice(idx, 1);
        setState(prev => ({
            ...prev,
            vehicles: {
                ...prev.vehicles,
                [vehicle_type]: {
                    ...prev.vehicles[vehicle_type],
                    attachments: vehicles[vehicle_type].attachments
                }
            }
        }));
    }
    console.log("VEHICLES");
    console.log(vehicles);
    return (
        <div className="sheet-tab-content sheet-tab-ship-sheet">
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
                        <h3 className="sheet-section-header">Starship Weapons</h3>
                        {starship_weapons && starship_weapons.map((weapon, weapon_idx) => {
                            return (
                                <div className="sheet-weapon-section">
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
                                            <td><input name='attr_spaceWeaponCharacterName' type="text"/></td>
                                            <td><input name='attr_spaceWeaponName' type="text"/></td>
                                            <td className="sheet-firearc-field">
                                                <input name='attr_space-fireArcFore' type="checkbox"
                                                       className="sheet-fireArcFore" title="Fore"/>
                                                <input name='attr_space-fireArcStarboard' type="checkbox"
                                                       className="sheet-fireArcStarboard" title="Starboard"/>
                                                <input name='attr_space-fireArcAft' type="checkbox"
                                                       className="sheet-fireArcAft" title="Aft"/>
                                                <input name='attr_space-fireArcPort' type="checkbox"
                                                       className="sheet-fireArcPort" title="Port"/>
                                                <span className="sheet-fireArcForeImg"></span>
                                                <span className="sheet-fireArcStarboardImg"></span>
                                                <span className="sheet-fireArcAftImg"></span>
                                                <span className="sheet-fireArcPortImg"></span>
                                            </td>
                                            <td style={{width: "50px"}}><input name='attr_spaceWeaponCrit' type="number" max="99"
                                                                          min="0" value="0"/></td>
                                            <td style={{width: "50px"}}><input name='attr_spaceWeaponDmg' type="number" max="99"
                                                                          min="0" value="0"/></td>
                                            <td style={{width: "150px"}}>
                                                <select name='attr_spaceWeaponRange'>
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
                                            <td><label style={{display: "inline-block", width: "25%"}}>Dice:</label><input
                                                style={{display: "inline-block", width: "74%"}} name='attr_spaceWeaponDice'
                                                type="text"/></td>
                                            <td colSpan="4"><label style={{display: "inline-block", width: "25%"}}>Special:</label><input
                                                style={{display: "inline-block", width: "74%"}} name='attr_spaceWeaponSpecial'
                                                type="text"/></td>
                                            <td>
                                                <select name='attr_spaceWeaponSkill'>
                                                    <option value="skill:agility,rankGunnery">Gunnery</option>
                                                    <option value="skill:agility,rankHeavy">Ranged - Heavy</option>
                                                </select>
                                            </td>
                                            <td>
                                                <button type='roll' name='roll_space-shipWeapon'
                                                        value='!eed rollPlayer(character:@{spaceWeaponCharacterName}|encum|@{spaceWeaponSkill}) label(Weapon:@{spaceWeaponName}|Vehicle:@{transport-space-name}|Damage:@{spaceWeaponDmg}|Critical:@{spaceWeaponCrit}|Range:@{spaceweaponrange}|Qualities:@{spaceWeaponSpecial}) combat(vehicle) @{spaceWeaponDice} @{dicePool} (gmdice)'></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><label>Book &amp; Page:</label></td>
                                            <td><input name='attr_space-weapon_bookpage' type="text"/></td>
                                            <td><label>Rarity</label></td>
                                            <td><input name='attr_space-weapon_rarity' type="number" min="1" max="10"/></td>
                                            <td><label>Restricted:</label></td>
                                            <td>
                                                <select name='attr_space-weapon_restrict'>
                                                    <option value="no">No</option>
                                                    <option value="yes">Yes</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><label>Value:</label></td>
                                            <td><input name='attr_space-weapon_value' type="text"/></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <br/>
                                    <button onClick={(event) => { removeVehicleWeapon(event, "starship", weapon_idx) }}>Delete Weapon</button>
                                </div>
                            )
                        })}
                        <button onClick={(event) => { addVehicleWeapon(event, "starship") }}>Add</button>
                    </div>
                    <div className="sheet-clear"></div>
                </div>
                <div className="sheet-row">
                    <div className="sheet-small-12 sheet-column">
                        <h3 className="sheet-section-header">Starship Attachments</h3>
                        {starship_attachments && starship_attachments.map((attachment, attachment_idx) => {
                            return (
                                <div className="sheet-attachments-section">
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
                                                <td style={{width: "25%"}}><input name='attr_SpaceAttachName' type="text"/></td>
                                                <td style={{width: "25%"}}><input name='attr_SpaceAttachHP' type="text"/></td>
                                                <td style={{width: "25%"}}><input name='attr_SpaceAttachBaseMod' type="text"/></td>
                                                <td style={{width: "25%"}}><input name='attr_SpaceAttachMod' type="text"/></td>
                                            </tr>
                                            <tr>
                                                <td><label>Book &amp; Page:</label></td>
                                                <td><input name='attr_space-attach_bookpage' type="text"/></td>
                                                <td><label>Rarity</label></td>
                                                <td><input name='attr_space-attach_rarity' type="number" min="1" max="10"/></td>
                                            </tr>
                                            <tr>
                                                <td><label>Restricted:</label></td>
                                                <td>
                                                    <select name='attr_space-attach_restrict'>
                                                        <option value="no">No</option>
                                                        <option value="yes">Yes</option>
                                                    </select>
                                                </td>
                                                <td><label>Value:</label></td>
                                                <td><input name='attr_space-attach_value' type="text"/></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <button onClick={(event) => { removeVehicleAttachment(event, "starship", attachment_idx) }}>Delete Attachment</button>
                                        <br/>
                                    </fieldset>
                                </div>
                            )
                        })}
                        <button onClick={(event) => { addVehicleAttachment(event, "starship") }}>Add</button>
                    </div>
                    <div className="sheet-clear"></div>
                </div>
            </div>
        </div>
    )
}

export default Vehicles;