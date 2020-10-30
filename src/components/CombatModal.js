import React, { useState } from 'react';
import {
    Button, Dialog, DialogContent, DialogTitle, DialogActions,
} from "@material-ui/core";
import Weapons from '../weapons';
import '../sheet-style.css';
import Talents from "../talents";

function CombatSkills({ character, characteristics, generalSkills, combatSkills, knowledgeSkills, handleClickOpen }) {
    const [skill, setSkill] = useState("Astrogation");

    function getDerivedDicePool(skill) {
        let generalSkillsMap = {};
        let combatSkillsMap = {};
        let knowledgeSkillsMap = {};
        Object.keys(generalSkills).forEach((skill) => {
            generalSkillsMap[generalSkills[skill].name] = [generalSkills[skill].characteristic, generalSkills];
        });
        Object.keys(combatSkills).forEach((skill) => {
            combatSkillsMap[combatSkills[skill].name] = [combatSkills[skill].characteristic, combatSkills];
        });
        Object.keys(knowledgeSkills).forEach((skill) => {
            knowledgeSkillsMap[knowledgeSkills[skill].name] = [knowledgeSkills[skill].characteristic, knowledgeSkills];
        });
        const derivedMap = {
            ...generalSkillsMap,
            ...combatSkillsMap,
            ...knowledgeSkillsMap
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

    return (
        <div className="sheet-row">
            <div className="sheet-small-12 sheet-column">
                <h3 className="sheet-section-header">Combat Skills</h3>
                <div className="sheet-role-section">
                    <table cellSpacing="0" cellPadding="0" border="0">
                        <thead>
                        <tr>
                            <th>Skill Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <select
                                    name="skill"
                                    value={skill}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        const { target: {value} } = e;
                                        setSkill(value);
                                    }}
                                >
                                    <optgroup label="General Skills">
                                        <option value="Astrogation">Astrogation</option>
                                        <option value="Athletics">Athletics</option>
                                        <option value="Charm">Charm</option>
                                        <option value="Coercion">Coercion</option>
                                        <option value="Computers">Computers</option>
                                        <option value="Cool">Cool</option>
                                        <option value="Coordination">Coordination</option>
                                        <option value="Deception">Deception</option>
                                        <option value="Discipline">Discipline</option>
                                        <option value="Leadership">Leadership</option>
                                        <option value="Mechanics">Mechanics</option>
                                        <option value="Medicine">Medicine</option>
                                        <option value="Negotiation">Negotiation</option>
                                        <option value="Perception">Perception</option>
                                        <option value="PilotingPlanetary">Piloting (Planetary)</option>
                                        <option value="PilotingSpace">Piloting (Space)</option>
                                        <option value="Resilience">Resilience</option>
                                        <option value="Skulduggery">Skulduggery</option>
                                        <option value="Stealth">Stealth</option>
                                        <option value="Streetwise">Streetwise</option>
                                        <option value="Survival">Survival</option>
                                        <option value="Vigilance">Vigilance</option>
                                    </optgroup>
                                    <optgroup label="Combat Skills">
                                        <option value="Brawl">Brawl</option>
                                        <option value="Gunnery">Gunnery</option>
                                        <option value="Melee">Melee</option>
                                        <option value="Lightsaber">Lightsaber</option>
                                        <option value="RangedLight">Ranged (Light)</option>
                                        <option value="RangedHeavy">Ranged (Heavy)</option>
                                    </optgroup>
                                    <optgroup label="Knowledge Skills">
                                        <option value="CoreWorlds">Core Worlds</option>
                                        <option value="Education">Education</option>
                                        <option value="Lore">Lore</option>
                                        <option value="OuterRim">Outer Rim</option>
                                        <option value="Underworld">Underworld</option>
                                        <option value="Xenology">Xenology</option>
                                    </optgroup>
                                </select>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => handleClickOpen(
                                        {
                                            dicePool: getDerivedDicePool(skill),
                                            roll_type: "skillroll",
                                            roll_source: `Skill - ${skill}`,
                                            roll_user: character.name || "anonymous",
                                        }
                                    )}
                                >Check</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="sheet-clear"></div>
        </div>
    )
}

function CombatModal({open, handleClose, handleClickDiceModalOpen, currentCS}) {

    const setDummy = () => {};
    const { character, characteristics, generalSkills, combatSkills, knowledgeSkills, weapons, talents } = currentCS;

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth={'md'}
                PaperProps={{
                    style: {
                        maxHeight: "700px"
                    },
                }}
            >
                <DialogTitle id="form-dialog-title">Combat</DialogTitle>
                <DialogContent style={{position: "inherit"}}>
                    <div className={"charsheet"}>
                        <Weapons
                            character={character}
                            weapons={weapons}
                            characteristics={characteristics}
                            generalSkills={generalSkills}
                            combatSkills={combatSkills}
                            setState={setDummy}
                            handleClickOpen={handleClickDiceModalOpen}
                        />
                        <CombatSkills
                            character={character}
                            characteristics={characteristics}
                            generalSkills={generalSkills}
                            combatSkills={combatSkills}
                            knowledgeSkills={knowledgeSkills}
                            setState={setDummy}
                            handleClickOpen={handleClickDiceModalOpen}
                        />
                        <Talents
                            talents={talents}
                            setState={setDummy}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={() => handleClose()} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CombatModal
