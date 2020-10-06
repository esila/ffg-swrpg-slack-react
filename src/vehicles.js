import React from "react";

function Vehicles({ vehicles, setState }){
    console.log("VEHICLES");
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
                                    <input name='attr_space-silhouette' type="number" max="10" min="0" value="0"/>
                                </td>
                                <td className="sheet-ship-char-thre-bg-speed">
                                    <label className="sheet-label-title">Speed</label>
                                    <br/>
                                    <input name="attr_space-speed" type="number" max="10" min="0" value="0"/>
                                    <input name="attr_space-speed_current" type="number" max="10" min="0"
                                           value="0"/><br/>
                                    <label className="sheet-label-threshold-speed">Max</label>
                                    <label className="sheet-label-current-speed">Current</label>
                                </td>
                                <td className="sheet-ship-char-bg">
                                    <label>Handling</label>
                                    <input name='attr_space-handling' type="number" max="99" min="-9" value="0"/>
                                </td>
                                <td rowSpan="2" className="sheet-ship-defense">
                                    <div style={{width: "302px", height: "1px"}}></div>
                                    <label className="sheet-def-label">Defense</label>
                                    <div className="sheet-fore">
                                        <label>Fore</label>
                                        <input name='attr_space-deffore' type="number" max="4" min="0" value="0"/>
                                    </div>
                                    <div className="sheet-starboard">
                                        <label>Starboard</label>
                                        <input name='attr_space-defstarboard' type="number" max="4" min="0" value="0"/>
                                    </div>
                                    <div className="sheet-aft">
                                        <label>Aft</label>
                                        <input name='attr_space-defaft' type="number" max="4" min="0" value="0"/>
                                    </div>
                                    <div className="sheet-port">
                                        <label>Port</label>
                                        <input name='attr_space-defport' type="number" max="4" min="0" value="0"/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="sheet-ship-char-bg sheet-armor">
                                    <label className="sheet-label-title">Armor</label>
                                    <input name="attr_space-ship_armor" type="number" max="99" min="0" value="0"/>
                                </td>
                                <td className="sheet-ship-char-thre-bg">
                                    <label className="sheet-label-title">Hull Trauma</label>
                                    <br/>
                                    <input name="attr_space-hull_trauma_max" type="number" min="0" value="0"/>
                                    <input name="attr_space-hull_trauma" type="number" min="0" value="0"/><br/>
                                    <label className="sheet-label-threshold">Threshold</label>
                                    <label className="sheet-label-current">Current</label>
                                </td>
                                <td className="sheet-ship-char-thre-bg">
                                    <label className="sheet-label-title">Sys Strain</label>
                                    <br/>
                                    <input name="attr_space-system_strain_max" type="number" min="0" value="0"/>
                                    <input name="attr_space-system_strain" type="number" min="0" value="0"/><br/>
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