import React, { useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { UserContext } from '../App';
import CharacterStatus from './CharacterStatus';
import Visuals from './Visuals';
import {Grid} from "@material-ui/core";
import CustomizedSnackbars from './CustomizedSnackBar';
import './MainContent.css';
import CharacterSheetModal from "./CharacterSheetModal";

function MainContent({ userCharacterSheets, activeIndex, setActiveIndex }) {
    const { characterSheets } = userCharacterSheets;
    const location = useLocation().pathname.split('/')[1];
    const user = useContext(UserContext);

    const MainComponent = {
        visuals: Visuals,
    }[location];

    // Save Snackbar State
    const [snackbarOpen, setSnackbarOpen] = useState({open: false, message: "", severity: ""});
    const handleOpenSnackbar = (status) => {
        const [message, severity] = status;
        setSnackbarOpen({open: true, message: message, severity: severity})
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setSnackbarOpen({open: false, message: "", severity: ""});
    };

    useEffect(() => {
    }, []);

    return user ? (
            <div className="maincontent">
                <div className="maincontent__header">
                    <Grid container spacing={3}>
                        <Grid item xs={8} direction="row" style={{textAlign: "left"}}>
                            <CharacterStatus
                                currentCharacterSheet={characterSheets[activeIndex]}
                                handleOpenSnackBar={handleOpenSnackbar}
                            />
                        </Grid>
                        <Grid item xs={4} style={{textAlign: "left"}}>
                            <h3>Session 0<br/>Character Creation</h3>
                        </Grid>
                    </Grid>
                </div>
                <MainComponent characterSheet={characterSheets[activeIndex]}/>
                <CustomizedSnackbars
                    open={snackbarOpen}
                    handleClose={handleCloseSnackbar}
                />
            </div>
    )
        :
        <div className="maincontent">
            <h1>LOADING</h1>
        </div>
}

export default MainContent;
