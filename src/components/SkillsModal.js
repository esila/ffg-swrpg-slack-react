import React from 'react';
import {
    Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField, DialogActions, Grid,
} from "@material-ui/core";
import Skills from '../skills';
import '../sheet-style.css';

function SkillsModal({open, handleClose, handleClickDiceModalOpen, currentCS}) {

    const setDummy = () => {};
    const { character, characteristics, generalSkills, combatSkills, knowledgeSkills } = currentCS;

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
                <DialogTitle id="form-dialog-title">Skills</DialogTitle>
                <DialogContent style={{position: "inherit"}}>
                    <div className={"charsheet"}>
                    <Skills
                        character={character}
                        characteristics={characteristics}
                        generalSkills={generalSkills}
                        combatSkills={combatSkills}
                        knowledgeSkills={knowledgeSkills}
                        setState={setDummy}
                        handleClickOpen={handleClickDiceModalOpen}
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

export default SkillsModal
