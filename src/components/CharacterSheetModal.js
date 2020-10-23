import React, {useState} from 'react';
import CharacterSheet from './characterSheet';
import {
    Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField, DialogActions, Grid,
} from "@material-ui/core";

function CharacterSheetModal({open, handleClose}) {

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Character Sheet</DialogTitle>
                <DialogContent>
                    <CharacterSheet/>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            handleClose();
                        }}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button onClick={(e) => handleClose()} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CharacterSheetModal
