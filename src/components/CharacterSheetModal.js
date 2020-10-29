import React, {useState} from 'react';
import CharacterSheet from './characterSheet';
import {
    Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField, DialogActions, Grid,
} from "@material-ui/core";

function CharacterSheetModal({open, handleClose, fetchUserCharacterSheets}) {

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
                <DialogTitle id="form-dialog-title">Character Sheet</DialogTitle>
                <DialogContent style={{position: "inherit"}}>
                        <CharacterSheet fetchUserCharacterSheets={fetchUserCharacterSheets}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => handleClose()} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CharacterSheetModal
