import React from 'react';
import {
    Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField, DialogActions, Grid,
} from "@material-ui/core";
import Vehicles from '../vehicles';
import '../sheet-style.css';

function VehiclesModal({open, handleClose, handleClickDiceModalOpen, currentCS}) {

    const setDummy = () => {};
    const { character, characteristics, generalSkills, combatSkills, knowledgeSkills, vehicles } = currentCS;

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
                <DialogTitle id="form-dialog-title">Vehicles</DialogTitle>
                <DialogContent style={{position: "inherit"}}>
                    <div className={"charsheet"}>
                        <input type="radio" name="attr_pcgm" className="sheet-tab-new sheet-tab-ship-sheet sheet-player-sheet"
                   value="2" defaultChecked="checked"/>
                    <Vehicles
                        character={character}
                        characteristics={characteristics}
                        generalSkills={generalSkills}
                        combatSkills={combatSkills}
                        knowledgeSkills={knowledgeSkills}
                        vehicles={vehicles}
                        setState={setDummy}
                        handleClickOpen={handleClickDiceModalOpen}
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

export default VehiclesModal
