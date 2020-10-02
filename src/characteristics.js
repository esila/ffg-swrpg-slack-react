import React from "react";

function Characteristics({ characteristics, setState }){
    return (
        <div className="sheet-row">
            <div className="sheet-small-12 sheet-column">
                <h3>Characteristics</h3>
                <div className="sheet-characteristic-section">
                    <table className="sheet-characteristics" cellSpacing="0" cellPadding="0" border="0">
                        <tbody>
                            <tr>
                            {Object.keys(characteristics).map((elem, idx) => {
                                return (
                                    <React.Fragment key={idx}>
                                    <td>
                                        <label>{elem}</label>
                                        <input
                                            name={elem}
                                            type="number"
                                            step="1"
                                            max="7"
                                            min="1"
                                            value={characteristics[elem]}
                                            onChange={event => {
                                                const { target: {value, name } } = event;
                                                setState(prev => ({
                                                    ...prev,
                                                    characteristics: {
                                                        ...prev.characteristics,
                                                        [name]: value
                                                    }
                                                }))}}
                                        />
                                    </td>
                                    <td></td>
                                    </React.Fragment>
                                )
                            })}
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                </div>
            </div>
        </div>
    )
}

export default Characteristics;
