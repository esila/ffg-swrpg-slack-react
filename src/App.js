import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { API, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { listCharacterSheets } from './graphql/queries';
import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';
import './App.css';

const UserContext = React.createContext("");

function InitApp() {
    const contentSourceNames = ["character", "skills", "weapons", "talents", "visuals"];
    const [userCharacterSheets, setUserCharacterSheets] = useState({user: null, characterSheets: []});
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        fetchUserCharacterSheets();
    }, []);

    async function fetchUserCharacterSheets() {
        //const { username } = await Auth.currentAuthenticatedUser({bypassCache: false});
        const username = "morgan";
        const apiData = username && await API.graphql({
            query: listCharacterSheets,
            variables: {
                filter: {
                    user: {
                        eq: username
                    }
                }
            }
        });
        setUserCharacterSheets({user: username, characterSheets: apiData.data.listCharacterSheets.items});
    }

    return (
        <UserContext.Provider value={userCharacterSheets.user}>
            <div className="App">
                <div className="app__body">
                    <Sidebar
                        contentSourceNames={contentSourceNames}
                        userCharacterSheets={userCharacterSheets.characterSheets}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        fetchUserCharacterSheets={fetchUserCharacterSheets}
                    />
                    <Switch>
                        {contentSourceNames.map((name, idx) => {
                            return (
                                <Route key={idx} path={`/${name}`}>
                                    <MainContent
                                        userCharacterSheets={userCharacterSheets}
                                        activeIndex={activeIndex}
                                        setActiveIndex={setActiveIndex}
                                    />
                                </Route>
                            )
                        })}
                        <Route>
                            <Redirect to="/visuals" />
                        </Route>
                    </Switch>
                </div>
            </div>
        </UserContext.Provider>
    )

}

const App = withAuthenticator(InitApp);
export {
    UserContext,
    App
}
