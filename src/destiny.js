import React, {useContext, useEffect, useState} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import {
    createDestinyPool as createDestinyPoolMutation,
    updateDestinyPool as updateDestinyPoolMutation
} from "./graphql/mutations";
import {onUpdateDestinyPool} from "./graphql/subscriptions";
import {listDestinyPools} from "./graphql/queries";
import { UserContext} from "./App";

function DestinyPool() {
    const user = useContext(UserContext);
    const [destinyPool, setDestinyPool] = useState({});

    useEffect(() => {
        fetchDestinyPool();
        subscribeDestinyPool();
    }, []);

    async function fetchDestinyPool() {
        const apiData = await API.graphql({query: listDestinyPools });
        const destinyPool = apiData.data.listDestinyPools.items && apiData.data.listDestinyPools.items[0];
        setDestinyPool(destinyPool);
    }

    async function subscribeDestinyPool() {
        await API.graphql(graphqlOperation(onUpdateDestinyPool)).subscribe({
            next: subonUpdateDestinyPool => {
                console.log(`subscribed message: ${JSON.stringify(subonUpdateDestinyPool.value.data.onUpdateDestinyPool)}`);
                //setDestinyPool([subonUpdateDestinyPool.value.data.onUpdateDestinyPool]);
                fetchDestinyPool();
            }
        })
    }

    async function createDestinyPool() {
        //console.log("GOT HERE");
        console.log(`CREATE INPUT: ${JSON.stringify(destinyPool)}`);
        if (!destinyPool) return;
        console.log("GOT PAST DATA TYPE");
        await API.graphql({query: createDestinyPoolMutation, variables: {
            input: { ...destinyPool
            }}})
            .then(success => {
                console.log(`SUCCESS: ${JSON.stringify(success)}`);
            },
                error => {
                console.log(`ERROR: ${JSON.stringify(error)}`);
            })
    }

    async function updateDestinyPool() {
        //console.log("GOT HERE");
        //console.log(`UPDATE INPUT: ${JSON.stringify(fabricData)} / ${graphId}`);
        if (!destinyPool.id) return;
        //console.log("GOT PAST DATA TYPE");
        const { id, light, dark } = destinyPool;
        await API.graphql({query: updateDestinyPoolMutation, variables: {
            input: { id: id, light: light, dark: dark
            }}})
            .then(success => {
                console.log(`SUCCESS: ${JSON.stringify(success)}`);
            },
                error => {
                console.log(`ERROR: ${JSON.stringify(error)}`);
            })
    }
    return destinyPool && Object.keys(destinyPool).includes("light") ? (
        <div>
            <p>{JSON.stringify(destinyPool)}</p>
            {user === "esila" &&
                <>
                    <label>Light Side Points</label>
                    <input
                        type="number"
                        value={destinyPool.light}
                        onChange={(event) => {
                            event.preventDefault();
                            const {target: {value}} = event;
                            setDestinyPool(prev => ({
                                ...prev,
                                light: value
                            }))
                        }}
                    />
                    <label>Dark Side Points</label>
                    <input
                        type="number"
                        value={destinyPool.dark}
                        onChange={(event) => {
                            event.preventDefault();
                            const {target: {value}} = event;
                            setDestinyPool(prev => ({
                                ...prev,
                                dark: value
                            }))
                        }}
                    />
                    <button
                        onClick={() => updateDestinyPool()}
                    >Save Destiny</button>
                </>
            }
        </div>
    ):
        <div>
        </div>
}

export default DestinyPool