import React from 'react';

const critTable = [
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

function Critical({ critical_injuries, setState }) {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const getCritical = (e) => {
        e.preventDefault();
        const offset = (critical_injuries && 10 * critical_injuries.length) || 0;
        const roll = getRandomInt(1,100);
        const fullRoll = roll + offset;
        const criticalInjury = critTable.find(elem => fullRoll >= elem.percent[0] && fullRoll <= elem.percent[1]);
        if (!critical_injuries) {
            setState(prev => ({
                ...prev,
                critical_injuries: [criticalInjury]
            }));
            return;
        }
        setState(prev => ({
            ...prev,
            critical_injuries: [
                ...prev.critical_injuries,
                criticalInjury
            ]
        }));
    };

    function healCritical(event, idx) {
        event.preventDefault();
        critical_injuries.splice(idx, 1);
        setState(prev => ({
            ...prev,
            critical_injuries: critical_injuries
        }));
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
                            <button type='roll' className="sheet-btn-add-crit">
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
                                            defaultValue={crit.name}
                                        />
                                    </td>
                                    <td width="30%">
                                        <input
                                            type="text"
                                            name="attr_character-critRange1"
                                            readOnly="readonly"
                                            defaultValue={JSON.stringify(crit.percent)}
                                        />
                                    </td>
                                    <td className="sheet-crit-dice-bg">
                                        <input type="hidden" name="attr_character-critDice1"/>
                                        <input className="sheet-pd" defaultValue={crit.severity} type="hidden"
                                               name="attr_character-critSeverity1" readOnly="readOnly"/><span></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" rowSpan="2">
                            <textarea rows="3" name="attr_character-critSummary1" readOnly="readonly" defaultValue={crit.result}>
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