import React, {useState} from "react";
import DiceRoller from './diceRoller'
import SheetTips from './sheetTips'
import toolTips from './toolTips'

function Skills({ character, characteristics, generalSkills, combatSkills, knowledgeSkills, setState, open, setOpen, dicePool, setDicePool, handleClickOpen, handleClose }){
    return (
        <div className="sheet-row">
            <div className="sheet-small-12 sheet-column">
                <h3>Skills</h3>
                <SkillsSection
                    character={character}
                    characteristics={characteristics}
                    skills={generalSkills}
                    skillsLegend="General Skills"
                    skillsKey="generalSkills"
                    setState={setState}
                    open={open}
                    setOpen={setOpen}
                    dicePool={dicePool}
                    setDicePool={setDicePool}
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                />
                <SkillsSection
                    character={character}
                    characteristics={characteristics}
                    skills={combatSkills}
                    skillsLegend="Combat Skills"
                    skillsKey="combatSkills"
                    setState={setState}
                    open={open}
                    setOpen={setOpen}
                    dicePool={dicePool}
                    setDicePool={setDicePool}
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                />
                <SkillsSection
                    character={character}
                    characteristics={characteristics}
                    skills={knowledgeSkills}
                    skillsLegend="KnowledgeSkills"
                    skillsKey="knowledgeSkills"
                    setState={setState}
                    open={open}
                    setOpen={setOpen}
                    dicePool={dicePool}
                    setDicePool={setDicePool}
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                />
            </div>
        </div>
    )
}

function SkillsSection({ character, characteristics, skills, skillsLegend, skillsKey, setState, open, setOpen, dicePool, setDicePool, handleClickOpen, handleClose }){

    function getDerivedDiceIcons(characteristic, rank) {
      return characteristic === rank ?
          [{sheetClass: "sheet-yd", sheetAttr: "attr_y", value: rank}]
          : [
              {sheetClass: "sheet-yd", sheetAttr: "attr_y", value: Math.min(characteristic, rank)},
              {sheetClass: "sheet-gd", sheetAttr: "attr_g", value: Math.abs(characteristic - rank)}
            ]
    }

    function getDerivedDiceString(characteristic, rank) {
      return characteristic === rank ?
          `${rank}p`
          : `${Math.min(characteristic, rank)}p ${Math.abs(characteristic - rank)}a`
    }

    function getDerivedDicePool(characteristic, rank) {
      return characteristic === rank ?
          {proficiency: rank}
          :
          {
              proficiency: Math.min(characteristic, rank),
              ability: Math.abs(characteristic - rank)
          }
    }

    return(
        <div className={"sheet-skills-section"}>
            <table className={"sheet-skills"} cellSpacing={0} cellPadding={0} border={0}>
                <thead>
                    <tr>
                        <th>{skillsLegend}</th>
                        <th>Career</th>
                        <th colSpan={2}>Rank</th>
                        <th colSpan={2}>
                            <span style={{float: "left"}} data-i18n="modifiers">Modifiers</span>
                            <div className="sheet-tips">
                                <div className="sheet-help-def sheet-help">
                                    <div className="sheet-icon">
                                        <span className="sheet-icon-question">?</span>
                                    </div>
                                    <div className="sheet-help-content" style={{marginLeft: "-225px"}}>
                                        <h5 data-i18n="addingdice">Adding Dice</h5>
                                        <p data-i18n="addingdicetext">
                                            To add additional dice write the number of
                                            dice and color letter you want to roll.
                                            Additionally you can add some dice symbols
                                            to automatically add to the roll.
                                        </p>
                                        <p data-i18n="example:">Example: <b>1b 1g</b> outputs <span
                                            className="sheet-icon-B"></span><span className="sheet-icon-G"></span></p>
                                        <p data-i18n="exampletext">
                                            b -> Blue = Boost, blk -> BLack = Setback
                                            g -> Green = Ability, y -> Yellow = Proficiency
                                            p -> Purple = Difficulty, r -> Red = Challenge
                                            w -> White = Force
                                            s = Success, f = Failure, a = Advantage, t = Threat
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {Object.keys(skills).sort().map((elem, idx) => {
                    return (
                        <tr key={idx}>
                            <td>
                                <label>{`${elem} (${skills[elem].characteristic})`}</label>
                                <SheetTips tooltip={toolTips[elem]}/>
                            </td>
                            <td>
                                <input
                                  type="checkbox"
                                  name={`${elem}_career`}
                                  value={skills[elem].career}
                                  onChange={event => {
                                      event.persist();
                                      setState(prev => ({
                                          ...prev,
                                          [skillsKey]: {
                                              ...prev[skillsKey],
                                              [elem]: {
                                                  ...prev[skillsKey][elem],
                                                  career: event.target && event.target.checked,
                                              }
                                          }
                                      }))}}
                                />
                            </td>
                            <td>
                                <input
                                  type="number"
                                  step="1"
                                  name={`${elem}_rank`}
                                  value={skills[elem].rank}
                                  onChange={event => {
                                      const { target: {value} } = event;
                                      setState(prev => ({
                                          ...prev,
                                          [skillsKey]: {
                                              ...prev[skillsKey],
                                              [elem]: {
                                                  ...prev[skillsKey][elem],
                                                  rank: value
                                              }
                                          }
                                  }))}}
                                />
                            </td>
                            <td>
                                {getDerivedDiceIcons(characteristics[skills[elem].characteristic], skills[elem].rank).map((d_elem, idx) => {
                                    return (
                                        <React.Fragment key={idx}>
                                        <input
                                            key={idx}
                                            className={d_elem.sheetClass}
                                            type="hidden"
                                            name={`${d_elem.sheetAttr}${elem}`}
                                            value={d_elem.value}
                                            disabled/><span></span>
                                        </React.Fragment>
                                    )
                                })}
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name={`${elem}_extradice`}
                                    defaultValue={""}
                                    onChange={event => {
                                        const { target: {value} } = event;
                                        setState(prev => ({
                                            ...prev,
                                            [skillsKey]: {
                                                ...prev[skillsKey],
                                                [elem]: {
                                                    ...prev[skillsKey][elem],
                                                    extraDice: value
                                                }
                                            }
                                    }))}}
                                  />
                            </td>
                            <td>
                                <button
                                    onClick={() => handleClickOpen(
                                        {
                                            dicePool: getDerivedDicePool(characteristics[skills[elem].characteristic], skills[elem].rank),
                                            roll_type: "skillroll",
                                            roll_source: `Skills: ${elem}`,
                                            roll_user: character.name || "anonymous",
                                            roll_message: {},
                                        }
                                    )}
                                >Check</button>

                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Skills;