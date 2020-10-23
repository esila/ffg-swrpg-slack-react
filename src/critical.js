import React from 'react';

const critCharacterTable = [
    {
        percent: [1, 5],
        severity: 1,
        name: 'Minor Nick',
        result: 'Suffer 1 strain.'
    },
    {
        percent: [6, 10],
        severity: 1,
        name: 'Slowed Down',
        result: 'May only act during last allied Initiative slot on next turn.'
    },
    {
        percent: [11, 15],
        severity: 1,
        name: 'Sudden Jolt',
        result: 'May only act during last hero Initiative slot on next turn.'
    },
    {
        percent: [16, 20],
        severity: 1,
        name: 'Distracted',
        result: 'Cannot perform free maneuver on next turn.'
    },
    {
        percent: [21, 25],
        severity: 1,
        name: 'Off-Balance',
        result: 'Add 1 Setback die, next skill check.'
    },
    {
        percent: [26, 30],
        severity: 1,
        name: 'Discouraging Wound',
        result: 'Flip one light destiny, dark.'
    },
    {
        percent: [31, 35],
        severity: 1,
        name: 'Stunned',
        result: 'Staggered, cannot perform action on next turn.'
    },
    {
        percent: [36, 40],
        severity: 1,
        name: 'Stinger',
        result: 'Increase difficulty of next check by 1 Difficulty die.'
    },
    //----------------------------- Severity 2
    {
        percent: [41, 45],
        severity: 2,
        name: 'Bowled Over',
        result: 'Knocked prone and suffer 1 strain.'
    },
    {
        percent: [46, 50],
        severity: 2,
        name: 'Head Ringer',
        result: 'Increase difficulty of all Intellect and Cunning checks by 1 Difficulty die until end of encounter.'
    },
    {
        percent: [51, 55],
        severity: 2,
        name: 'Fearsome Wound',
        result: 'Increase difficulty of all Presence and Willpower checks by 1 Difficulty die until end of encounter.'
    },
    {
        percent: [56, 60],
        severity: 2,
        name: 'Agonizing Wound',
        result: 'Increase difficulty of all Brawn and Agility checks by 1 Difficulty die until end of encounter.'
    },
    {
        percent: [61, 65],
        severity: 2,
        name: 'Slightly Dazed',
        result: 'Add 1 Setback die, all skill checks until end of encounter.'
    },
    {
        percent: [66, 70],
        severity: 2,
        name: 'Scattered Senses',
        result: 'Remove all Boost dice from all skill checks until end of encounter.'
    },
    {
        percent: [71, 75],
        severity: 2,
        name: 'Hamstrung',
        result: 'Lose free maneuver until end of encounter.'
    },
    {
        percent: [76, 80],
        severity: 2,
        name: 'Staggered',
        result: 'Attacker may immediately attempt another free attack against you using same dice pool as original attack.'
    },
    {
        percent: [81, 85],
        severity: 2,
        name: 'Winded',
        result: 'Cannot voluntarily suffer strain, activate abilities or gain additional maneuvers until end of encounter.'
    },
    {
        percent: [86, 90],
        severity: 2,
        name: 'Compromised',
        result: 'Increase difficulty of all skill checks by 1 Difficulty die until end of encounter.'
    },
    //---------------------------------------- Severity 3
    {
        percent: [91, 95],
        severity: 3,
        name: 'At the Brink',
        result: 'Suffer 1 strain each time you perform an action.'
    },
    {
        percent: [96, 100],
        severity: 3,
        name: 'Crippled',
        result: 'Limb crippled until healed or replaced. Increase difficulty of all checks that use that limb by 1 Difficulty die.'
    },
    {
        percent: [101, 105],
        severity: 3,
        name: 'Maimed',
        result: 'Limb permanently lost. Unless you have a cybernetic replacement, cannot perform actions that use that limb. Add 1 Setback, all other actions.'
    },
    {
        percent: [106, 110],
        severity: 3,
        name: 'Horrific Injury',
        result: 'Roll 1d10, determine one wounded characteristic -- roll results(1-3 = Brawn, 4-6 = Agility, 7 = Intellect, 8 = Cunning, 9 = Presence, 10 = Willpower. Until Healed, treat characteristic as one point lower.'
    },
    {
        percent: [111, 115],
        severity: 3,
        name: 'Temporarily Lame',
        result: 'Until healed, may not perform more than one maneuver each turn.'
    },
    {
        percent: [116, 120],
        severity: 3,
        name: 'Blinded',
        result: 'Can no longer see. Upgrade the difficulty of Perception and Vigilance checks three times, and all other checks twice.'
    },
    {
        percent: [121, 125],
        severity: 3,
        name: 'Knocked Senseless',
        result: 'You can no longer upgrade dice for checks.'
    },
    //---------------------------------------- Severity 4
    {
        percent: [126, 130],
        severity: 4,
        name: 'Gruesome Injury',
        result: 'Roll 1d10, determine one wounded characteristic -- roll results(1-3 = Brawn, 4-6 = Agility, 7 = Intellect, 8 = Cunning, 9 = Presence, 10 = Willpower. Characteristic is permanently one point lower.'
    },
    {
        percent: [131, 140],
        severity: 4,
        name: 'Bleeding Out',
        result: 'Suffer 1 wound and 1 strain every round at the beginning of turn. For every 5 wounds suffered beyond wound threshold, suffer one additional Critical Injury (ignore the details for any result below this result).'
    },
    {
        percent: [141, 150],
        severity: 4,
        name: 'The End is Nigh',
        result: 'Die after the last Initiative slot during the next round.'
    },
    {
        percent: [151,300],
        severity: 4,
        name: 'Dead',
        result: 'Complete, absolute death.'
    }
];

const critVehicleTable = [
    {
        percent: [1, 9],
        severity: 1,
        name: 'Mechanical Stress',
        result: 'Ship or vehicle suffers 1 system strain.'
    },
    {
        percent: [10, 18],
        severity: 1,
        name: 'Jostled',
        result: 'All crew members suffer 1 strain.'
    },
    {
        percent: [19, 27],
        severity: 1,
        name: 'Losing Power, Shields',
        result: 'Decrease defense in affected defense zone by 1 until repaired. If ship or vehicle has no defense, suffer 1 system strain.'
    },
    {
        percent: [28, 36],
        severity: 1,
        name: 'Knocked Off Course',
        result: 'On next turn, pilot cannot execute any maneuvers. Instead, must make a Piloting check, regain bearings and resume course. Difficulty depends on current speed.'
    },
    {
        percent: [37, 45],
        severity: 1,
        name: 'Tailspin',
        result: 'All firing from ship or vehicle suffers 2 setback dice until end of pilot\'s next turn.'
    },
    {
        percent: [46, 54],
        severity: 1,
        name: 'Component Hit',
        result: 'One component of the attacker\'s choice is knocked offline, and is rendered inoperable until the end of the following round. See page 245 CRB for Small/Large Vehicle and Ship Component tables. '
    },
    // --------------- severity : 2
    {
        percent: [55, 63],
        severity: 2,
        name: 'Shields Failing',
        result: 'Decrease defense in all defense zones by 1 until repaired. If ship or vehicle has no defense, suffer 2 system strain.'
    },
    {
        percent: [64, 72],
        severity: 2,
        name: 'Hyperdrive or Navicomputer Failure',
        result: 'Cannot make any jump, hyperspace until repaired. If ship or vehicle has no hyperdrive, navigation systems fail leaving it unable, tell where it is or is going.'
    },
    {
        percent: [73, 81],
        severity: 2,
        name: 'Power Fluctuations',
        result: 'Pilot cannot voluntarily inflict system strain on the ship until repaired.'
    },
    // --------------- severity : 3
    {
        percent: [82, 90],
        severity: 3,
        name: 'Shields Down',
        result: 'Decrease defense in affected defense zone, 0 and all other defense zones by 1 point until repaired. If ship or vehicle has no defense, suffer 4 system strain.'
    },
    {
        percent: [91, 99],
        severity: 3,
        name: 'Engine Damaged',
        result: 'Ship or vehicle\'s maximum speed reduced by 1,, a minimum of 1, until repaired.'
    },
    {
        percent: [100, 108],
        severity: 3,
        name: 'Shield Overload',
        result: 'Decrease defense in all defense zones, 0 until repaired. In addition, suffer 2 system strain. Cannot be repaired until end of encounter. If ship or vehicle has no defense, reduce armor by 1 until repaired.'
    },
    {
        percent: [109, 117],
        severity: 3,
        name: 'Engines Down',
        result: 'Ship or vehicle\'s maximum speed reduced, 0. In addition, ship or vehicle cannot execute maneuvers until repaired. Ship continues on course at current speed and cannot be stopped or course changed until repaired.'
    },
    {
        percent: [118, 126],
        severity: 3,
        name: 'Major System Failure',
        result: 'One component of the attacker\'s choice is heavily damages, and is inoperable until the critical hit is repaired. See page 245 CRB for Small/Large Vehicle and Ship Component tables. '
    },
    // --------------- severity : 4
    {
        percent: [127, 133],
        severity: 4,
        name: 'Major Hull Breach',
        result: 'Ships and vehicles of silhouette 4 and smaller depressurize in a number of rounds equal, silhouette. Ships of silhouette 5 and larger don\'t completely depressurize, but parts do (specifics at GM discretion). Ships and vehicles operating in atmosphere instead suffer a Destabilized Critical.'
    },
    {
        percent: [134, 138],
        severity: 4,
        name: 'Destabilised',
        result: 'Reduce ship or vehicle\'s hull integrity threshold and system strain threshold, half original values until repaired.'
    },
    {
        percent: [139, 144],
        severity: 4,
        name: 'Fire!',
        result: 'Fire rages through ship or vehicle and it immediately takes 2 system strain. Fire can be extinguished with appropriate skill, Vigilance or Cool checks at GM\'s discretion. Takes one round per two silhouette, put out.'
    },
    {
        percent: [145, 153],
        severity: 4,
        name: 'Breaking Up',
        result: 'At the end of next round, ship is completely destroyed. Anyone aboard has one round, reach escape pod or bail out before they are lost.'
    },
    {
        percent: [154, 300],
        severity: 4,
        name: 'Vaporized',
        result: 'The ship or Vehicle is completely destroyed.'
    }
];

function Critical({ source_name, critical_injuries, type, setState }) {

    const handleRoll = (roll_source, roll_message) => {
        const API_ADDRESS = `https://3nnmgyv8f7.execute-api.us-east-1.amazonaws.com/dev/criticalroll`;
        //const API_ADDRESS = `http://127.0.0.1:5000/criticalroll`;
        const roll_user = source_name || "anonymous";
        const data = { roll_source, roll_message, roll_user };
        console.log(`Dice roller payload:\n${JSON.stringify(data)}`);
        fetch(API_ADDRESS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                res.json()
                    .then((allResp) => {
                        console.log(allResp);
                    })
            });
    };

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const getCritical = (e) => {
        e.preventDefault();
        const critTable = type === "Character" ? critCharacterTable : critVehicleTable;
        const offset = (critical_injuries && 10 * critical_injuries.length) || 0;
        const roll = getRandomInt(1,100);
        const fullRoll = roll + offset;
        const criticalInjury = critTable.find(elem => fullRoll >= elem.percent[0] && fullRoll <= elem.percent[1]);

        // Populate our roll_message dict
        const roll_message = {
            Previous_Criticals: `${(critical_injuries && critical_injuries.length) || 0} x 10`,
            Dice_Roll: roll,
            Total: fullRoll,
            [criticalInjury.name]: criticalInjury.result
        };
        const roll_source = `${type} Critical`;
        handleRoll(roll_source, roll_message);
        if (!critical_injuries) {
            if (type === "Character") {
                setState(prev => ({
                    ...prev,
                    critical_injuries: [criticalInjury]
                }));
                return;
            }
            else if (type === "Vehicle") {
                setState(prev => ({
                    ...prev,
                    vehicles: {
                        ...prev.vehicles,
                        starship: {
                            ...prev.vehicles.starship,
                            critical_injuries: [criticalInjury]
                        }
                    }
                }));
                return;
            }
        }
        if (type === "Character") {
            setState(prev => ({
                ...prev,
                critical_injuries: [
                    ...prev.critical_injuries,
                    criticalInjury
                ]
            }));
        }
        else if (type === "Vehicle") {
            setState(prev => ({
                ...prev,
                vehicles: {
                    ...prev.vehicles,
                    starship: {
                        ...prev.vehicles.starship,
                        critical_injuries: [
                            ...prev.vehicles.starship.critical_injuries,
                            criticalInjury
                        ]
                    }
                }
            }))
        }
    };

    function healCritical(event, idx) {
        event.preventDefault();
        critical_injuries.splice(idx, 1);
        if (type === "Character") {
            setState(prev => ({
                ...prev,
                critical_injuries: critical_injuries
            }));
        }
        else if (type === "Vehicle") {
            setState(prev => ({
                ...prev,
                vehicles: {
                    ...prev.vehicles,
                    starship: {
                        ...prev.vehicles.starship,
                        critical_injuries: critical_injuries
                    }
                }
            }));
        }
    }

    return (
        <div className="sheet-row sheet-show-critical-table">
            <div className="sheet-small-12 sheet-column">
                <h3 className="sheet-section-header">Critical Injuries</h3>
            </div>
             <div className="sheet-small-3 sheet-column">
                <table className="sheet-roll-critical" cellSpacing="0" cellPadding="0" border="0">
                    <tbody>
                    <tr>
                        <td><label>Critical roll offset:</label></td>
                        <td><input type="text" name="attr_character-critAddOffset" defaultValue=""/></td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button
                                type='roll' className="sheet-btn-roll-crit"
                                onClick={(e) => getCritical(e)}
                            >Roll Critical
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Critical number:</label>
                            <input type="text" name="attr_character-critAddRangeNum" defaultValue=""/>
                        </td>
                        <td valign="bottom">
                            <button type='roll' className="sheet-btn-add-crit" onClick={(e) => {e.preventDefault()}}>
                                Add Critical
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="sheet-small-9 sheet-column">
                {critical_injuries && critical_injuries.map((crit, crit_idx) => {
                    return (
                        <React.Fragment key={crit_idx}>
                            <table key={crit_idx} className="sheet-critical" cellSpacing="0" cellPadding="0" border="0">
                                <tbody>
                                <tr>
                                    <td width="70%">
                                        <input
                                            type="text"
                                            name="attr_character-critName1"
                                            readOnly="readonly"
                                            value={crit.name}
                                        />
                                    </td>
                                    <td width="30%">
                                        <input
                                            type="text"
                                            name="attr_character-critRange1"
                                            readOnly="readonly"
                                            value={JSON.stringify(crit.percent)}
                                        />
                                    </td>
                                    <td className="sheet-crit-dice-bg">
                                        <input type="hidden" name="attr_character-critDice1"/>
                                        <input className="sheet-pd" value={crit.severity} type="hidden"
                                               name="attr_character-critSeverity1" readOnly="readOnly"/><span></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" rowSpan="2">
                            <textarea rows="3" name="attr_character-critSummary1" readOnly="readonly" value={crit.result}>
                            </textarea>
                                    </td>
                                    <td>
                                        <div className="sheet-switch">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button
                                            type='roll'
                                            className="sheet-btn-heal-crit"
                                            onClick={(e) => healCritical(e, crit_idx)}
                                            >Heal
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <br/>
                        </React.Fragment>
                    );
                })}
            </div>
            <div className="sheet-clear"></div>
        </div>
    )
}

export default Critical