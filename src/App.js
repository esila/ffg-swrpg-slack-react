import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import CharacterSheet from './characterSheet';
import Visuals from "./Visuals";

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
                <AmplifySignOut />
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
