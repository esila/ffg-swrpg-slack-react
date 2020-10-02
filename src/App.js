import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import CharacterSheet from './characterSheet';
import Visuals from "./Visuals";
import './App.css';

const UserContext = React.createContext("");

function InitApp() {
    const [user, setUser] = useState("");

    useEffect(() => {
        Auth.currentAuthenticatedUser({
            bypassCache: false
        }).then(user => {
            console.log(`USER: ${user.username}`);
            setUser(user.username);
        });
    }, []);

    return user ? (
        <UserContext.Provider value={user}>
            <div className="App">
                <div className="top__nav">
                    <NavLink className="topnav_item" to="/charactersheet">Character Sheet</NavLink>
                    <NavLink className="topnav_item" to="/visuals">Visuals</NavLink>
                    <div className="float-right">
                        <AmplifySignOut />
                    </div>
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
