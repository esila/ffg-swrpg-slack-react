import React, { useState } from 'react';
import {
    Button, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText, Grid, TextField
} from "@material-ui/core";

function CharacterStatusModal({open, handleClose, status, threshold, updateCharacterStatus}) {
    const status_id = status && status.id;
    const initWounds = status && status.wounds;
    const initStrain = status && status.strain;
    const [wounds, setWounds] = useState(initWounds);
    const [strain, setStrain] = useState(initStrain);

    const woundsThreshold = threshold && threshold.wounds.threshold;
    const strainThreshold = threshold && threshold.strain.threshold;

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
                <DialogTitle id="form-dialog-title">Status</DialogTitle>
                <DialogContent style={{position: "inherit"}}>
                    <DialogContentText>
                        Update your character's wounds, strain, and criticals here.
                    </DialogContentText>
                    <Grid container spacing={3}>
                        <TextField
                            margin="dense"
                            label="Current Wounds"
                            name="wounds"
                            type="number"
                            inputProps={{ min: 0}}
                            variant="outlined"
                            value={wounds}
                            onChange={(e) => {
                                e.preventDefault();
                                const {target: {value}} = e;
                                setWounds(value);
                            }}
                        /> / {woundsThreshold}
                        <TextField
                            margin="dense"
                            label="Current Strain"
                            name="strain"
                            type="number"
                            inputProps={{ min: 0}}
                            variant="outlined"
                            value={strain}
                            onChange={(e) => {
                                e.preventDefault();
                                const {target: {value}} = e;
                                setStrain(value);
                            }}
                        /> / {strainThreshold}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={() => handleClose()} color="primary">Cancel</Button>
                    <Button type="button"
                            onClick={() => {
                                updateCharacterStatus(status_id, wounds, strain);
                                handleClose()
                            }}
                            color="primary"
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CharacterStatusModal
