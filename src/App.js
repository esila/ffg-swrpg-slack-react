import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import CharacterSheet from './characterSheet';
import Visuals from "./Visuals";
import './App.css';
import {AppBar, Tab, Tabs} from "@material-ui/core";

const UserContext = React.createContext("");

function InitApp() {
    let history = useHistory();
    const [user, setUser] = useState("");
    const [activeTab, setActiveTab] = useState("charactersheet");

    useEffect(() => {
        Auth.currentAuthenticatedUser({
            bypassCache: false
        }).then(user => {
            console.log(`USER: ${user.username}`);
            setUser(user.username);
        });
    }, []);

    function handleTabChange(e, v) {
        e.preventDefault();
        setActiveTab(v);
        history.push(`/${v}`);
    }

    return user ? (
        <UserContext.Provider value={user}>
            <div className="App">
                <div className="top__nav">
                    <AppBar position="static">
                        <Tabs
                            value={activeTab}
                            onChange={handleTabChange}
                            aria-label="simple tabs example"
                        >
                            <Tab value={"charactersheet"} label="Character Sheet"/>
                            <Tab value={"visuals"} label="Visuals"/>
                            <AmplifySignOut />
                        </Tabs>
                    </AppBar>
                </div>
                <Switch>
                    <Route path={`/charactersheet`}>
                        <CharacterSheet/>
                    </Route>
                    <Route path={`/visuals`}>
                        <Visuals/>
                    </Route>
                    <Route>
                        <Redirect to="/charactersheet"/>
                    </Route>
                </Switch>
            </div>
        </UserContext.Provider>
    )
        :
        <div></div>

}

const App = withAuthenticator(InitApp);
export {
    UserContext,
    App
}
