import React, { useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { UserContext } from '../App';
import CharacterStatus from './CharacterStatus';
import Visuals from './Visuals';
import {Grid} from "@material-ui/core";
import './MainContent.css';

function MainContent({ userCharacterSheets, activeIndex, setActiveIndex }) {
    const { characterSheets } = userCharacterSheets;
    const [test, setTest] = useState(0);
    const location = useLocation().pathname.split('/')[1];
    const user = useContext(UserContext);

    const MainComponent = {
        visuals: Visuals,
    }[location];

    useEffect(() => {
    }, []);

    return user ? (
            <div className="maincontent">
                <div className="maincontent__header">
                    <Grid container spacing={3}>
                        <Grid item xs={8} direction="row" style={{textAlign: "left"}}>
                            {false &&
                            <>
                                <input
                                    name="test"
                                    value={test}
                                    type="number"
                                    step="1"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        const {target: {value}} = e;
                                        setTest(value);
                                    }}
                                />
                                <CharacterStatus currentCharacterSheet={characterSheets[activeIndex]} />
                            </>
                            }
                            <h1>Edge of The Empire</h1>
                        </Grid>
                        <Grid item xs={4} style={{textAlign: "left"}}>
                            <h3>Session 0<br/>Character Creation</h3>
                        </Grid>
                    </Grid>
                </div>
                <MainComponent characterSheet={characterSheets[activeIndex]}/>
            </div>
    )
        :
        <div className="maincontent">
            <h1>LOADING</h1>
        </div>
}

export default MainContent;
