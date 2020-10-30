import React from 'react';
import CharacterSheet from './characterSheet';
import {
    Button, Dialog, DialogContent, DialogTitle, DialogActions,
} from "@material-ui/core";

function CharacterSheetModal({open, handleClose, fetchUserCharacterSheets, handleOpenSnackBar}) {

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
                        <CharacterSheet
                            fetchUserCharacterSheets={fetchUserCharacterSheets}
                            handleOpenSnackBar={handleOpenSnackBar}
                        />
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={(e) => handleClose()} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CharacterSheetModal
