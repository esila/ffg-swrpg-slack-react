import React from "react";

function Vehicles({ vehicles, setState }){
    const starship_defense = vehicles.starship.defense;

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
            </div>
        </div>
    )
}

export default Vehicles;