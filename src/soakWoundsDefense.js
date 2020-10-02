import React from "react";

function SoakWoundsDefense({ soakWoundsDefense, setState }){
    const swdfArray = [
        ["Soak", "soak", "Threshold", "Current", soakWoundsDefense.soak],
        ["Wounds", "wounds", "Threshold", "Current", soakWoundsDefense.wounds],
        ["Strain", "strain", "Threshold", "Current", soakWoundsDefense.strain],
        ["Defense", "defense", "Range", "Melee", soakWoundsDefense.defense],
        ["Encum", "encumberance", "Threshold", "Current", soakWoundsDefense.encumberance],
        ["Force Rating", "force_rating", "Threshold", "Committed", soakWoundsDefense.force_rating],
    ];
    return (
        <div className="sheet-row sheet-section-1">
            <div className="sheet-small-12 sheet-column sheet-swsd">
                <table className="sheet-swsd" cellSpacing="0" cellPadding="0" border="0">
                    <tbody>
                    <tr>
                            {swdfArray.map((elem, idx) => {
                                const [title, swdfKey, leftLabel, rightLabel, attr] = elem;
                                return (
                                    <td key={idx} rowSpan={["Defense", "Encum", "Force Rating"].includes(title) ? 2 : 1}>
                                        <label className="sheet-label-title" data-i18n={swdfKey}>{title}</label><br/>
                                        {title !== "Soak" && <>
                                        <input
                                            type="number"
                                            step="1"
                                            name={`${swdfKey}_${leftLabel.toLowerCase()}`}
                                            value={attr[leftLabel.toLowerCase()]}
                                            onChange={event => {
                                                const { target: {value} } = event;
                                                setState(prev => ({
                                                    ...prev,
                                                    soakWounds: {
                                                        ...prev.soakWounds,
                                                        [swdfKey]: {
                                                            ...prev.soakWounds[swdfKey],
                                                            [leftLabel.toLowerCase()]: value
                                                        }
                                                    }
                                            }))}}
                                        />
                                        <input
                                            type="number"
                                            step="1"
                                            name={`${swdfKey}_${rightLabel.toLowerCase()}`}
                                            value={attr[rightLabel.toLowerCase()]}
                                            onChange={event => {
                                                const { target: {value} } = event;
                                                setState(prev => ({
                                                    ...prev,
                                                    soakWounds: {
                                                        ...prev.soakWounds,
                                                        [swdfKey]: {
                                                            ...prev.soakWounds[swdfKey],
                                                            [rightLabel.toLowerCase()]: value
                                                        }
                                                    }
                                            }))}}
                                        /><br/>
                                        <label className={`sheet-label-${leftLabel.toLowerCase()}`}
                                               data-i18n={leftLabel.toLowerCase()}>{leftLabel}</label>
                                        <label className={`sheet-label-${rightLabel.toLowerCase()}`} data-i18n={rightLabel.toLowerCase()}>{rightLabel}</label>
                                        </>
                                        }
                                        {title === "Soak" &&
                                        <input
                                            name={swdfKey}
                                            type="number"
                                            step="1"
                                            min="1"
                                            value={attr}
                                            onChange={event => {
                                                const { target: {value} } = event;
                                                setState(prev => ({
                                                    ...prev,
                                                    soakWounds: {
                                                        ...prev.soakWounds,
                                                        soak: value
                                                    }
                                                }))}}
                                        />}
                                    </td>
                                )
                            })}
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SoakWoundsDefense;
