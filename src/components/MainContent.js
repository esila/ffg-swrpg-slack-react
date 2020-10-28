import React, { useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { UserContext } from '../App';
import Visuals from './Visuals';
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
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
                <div className="maincontent__headerLeft">
                    {false && <input
                        name="test"
                        value={test}
                        type="number"
                        step="1"
                        onChange={(e) => {
                            e.preventDefault();
                            const { target: {value} } = e;
                            setTest(value);
                        }}
                    />}
                </div>
                <div className="maincontent__headerMid">

                    <p>Wound Threshold: 0 | 12</p>
                    <p>Strain Threshold: 0 | 15</p>
                </div>
                <div className="maincontent__headerRight">
                    <p>
                        <InfoOutlinedIcon /> Details
                    </p>
                </div>
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
