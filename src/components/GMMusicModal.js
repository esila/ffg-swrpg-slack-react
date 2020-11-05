import React, { useState } from 'react';
import {
    Button, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText, Grid, TextField
} from "@material-ui/core";

function GMMusicModal({open, handleClose, updateMusicPlayer}) {
    const [track, setTrack] = useState("http://users.du.se/~dbe/mp3/Star%20Wars%20Soundtrack/Star%20Wars%20VI%20-%20Twentieth%20Century%20Fox%20Theme.mp3");

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
                <DialogTitle id="form-dialog-title">Music Player Admin</DialogTitle>
                <DialogContent style={{position: "inherit"}}>
                    <DialogContentText>
                        GM Stuff
                    </DialogContentText>
                    <Grid container spacing={3}>
                        <Grid item xs style={{textAlign: "center"}}>
                            <select
                                name="track"
                                value={track}
                                onChange={(e) => {
                                    e.preventDefault();
                                    const {target: {value}} = e;
                                    setTrack(value);
                                }}
                            >
                                <option value="http://users.du.se/~dbe/mp3/Star%20Wars%20Soundtrack/Star%20Wars%20VI%20-%20Twentieth%20Century%20Fox%20Theme.mp3">21st Century Fox</option>
                                <option value="https://vgmdownloads.com/soundtracks/lego-star-wars-the-complete-saga/gqqgromtht/01.%20Star%20Wars%20Main%20Title%20and%20Ambush%20on%20Coruscant.mp3">Main Theme</option>
                                <option value="http://users.du.se/~dbe/mp3/Star%20Wars%20Soundtrack/Star%20Wars%20I%20-%20Duel%20Of%20The%20Fates.mp3">Duel of the Fates</option>
                            </select>
                            <button
                                type="button"
                                onClick={() => updateMusicPlayer({
                                    play: true,
                                    track: track
                                })}
                            >Play Selected Track</button>
                            <button
                                type="button"
                                onClick={() => updateMusicPlayer({play: false, track: ""})}
                            >Stop Track</button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={() => handleClose()} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default GMMusicModal
