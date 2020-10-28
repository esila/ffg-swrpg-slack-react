import React from 'react';
import {
    Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField, DialogActions, Grid,
} from "@material-ui/core";
import Weapons from '../weapons';
import '../sheet-style.css';
import Talents from "../talents";

function CombatModal({open, handleClose, handleClickDiceModalOpen, currentCS}) {

    const setDummy = () => {};
    const { character, characteristics, generalSkills, combatSkills, weapons, talents } = currentCS;

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
                        <Talents
                            talents={talents}
                            setState={setDummy}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose()} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CombatModal
