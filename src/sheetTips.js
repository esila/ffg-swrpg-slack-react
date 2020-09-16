import React from "react";

function SheetTips({ tooltip }){
    const {overview_page, overview_text, per_additional_success, per_advantage, per_triumph, per_threat, per_despair } = tooltip;
    const sheetHelpContent = [
        ["success", "Per Additional Success", "sheet-icon-S", per_additional_success],
        ["advantage", "Per Advantage", "sheet-icon-A", per_advantage],
        ["triumph", "Per Triumph", "sheet-icon-Tri", per_triumph],
        ["threat", "Per Threat", "sheet-icon-T", per_threat],
        ["despair", "Per Despair", "sheet-icon-Des", per_despair],
    ];
    return (
        <div className="sheet-tips">
            <div className="sheet-help-def sheet-help">
                <div className="sheet-icon">
                    <span className="sheet-icon-question">?</span>
                </div>
                <div className="sheet-help-content">
                    <h5>Overview ({`${overview_page}`})</h5>
                    <ul>
                        {overview_text && overview_text.map((elem, idx) => { return ( <li key={idx}>{elem}</li> )})}
                    </ul>
                </div>
            </div>
            {sheetHelpContent.map((elem, idx) => {
                const [ classType, h5String, sheetIcon, sheetContent ] = elem;
                const divClass = `sheet-help-${classType} sheet-help`;
                return (
                    <div key={idx} className={divClass}>
                        <div className="sheet-icon">
                            <span className={sheetIcon}></span>
                        </div>
                        <div className="sheet-help-content">
                            <h5>{h5String}</h5>
                            <ul>
                                {sheetContent && sheetContent.map((elem, idx) => { return (
                                    <li key={idx} dangerouslySetInnerHTML={{__html: elem}}/>
                                )})}
                            </ul>
                        </div>
                    </div>
            )})}
        </div>
    )
}

export default SheetTips;