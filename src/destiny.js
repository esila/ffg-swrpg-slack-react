import React, {useContext, useEffect, useState} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import {
    createDestinyPool as createDestinyPoolMutation,
    updateDestinyPool as updateDestinyPoolMutation
} from "./graphql/mutations";
import {onUpdateDestinyPool} from "./graphql/subscriptions";
import {listDestinyPools} from "./graphql/queries";
import { UserContext} from "./App";
import './destiny.css';
import DiceRoller from "./diceRoller";

function DestinyPool({ characterName }) {
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

    async function updateDestinyPool(light, dark) {
        //console.log("GOT HERE");
        //console.log(`UPDATE INPUT: ${JSON.stringify(fabricData)} / ${graphId}`);
        if (!destinyPool.id) return;
        //console.log("GOT PAST DATA TYPE");
        await API.graphql({query: updateDestinyPoolMutation, variables: {
            input: { id: destinyPool.id, light: light, dark: dark
            }}})
            .then(success => {
                console.log(`SUCCESS: ${JSON.stringify(success)}`);
            },
                error => {
                console.log(`ERROR: ${JSON.stringify(error)}`);
            })
    }
    return destinyPool && Object.keys(destinyPool).includes("light") ? (
        <div className="destiny">
            <div className="token_display">
                <h3>Destiny Points</h3>
                {[...Array(destinyPool.light).keys()].map((elem) => {
                    return (
                        <img
                            key={elem}
                            src="https://cdn.shopify.com/s/files/1/0013/7332/t/8/assets/product.star-wars.lightside-emblem.png"
                            width="4%"
                            style={{cursor: "pointer"}}
                            onClick={() => {
                                const newLight = destinyPool.light - 1;
                                const newDark = destinyPool.dark + 1;
                                updateDestinyPool(newLight, newDark);
                            }}
                        />
                    )
                })}
                {[...Array(destinyPool.dark).keys()].map((elem) => {
                    return (
                        <img
                            key={elem}
                            src="https://cdn.shopify.com/s/files/1/0013/7332/t/8/assets/product.star-wars.darkside-emblem.png"
                            width="3%"
                            style={user === "esila" ? {cursor: "pointer"} : {}}
                            onClick={() => {
                                if (user === "esila") {
                                    const newLight = destinyPool.light + 1;
                                    const newDark = destinyPool.dark - 1;
                                    updateDestinyPool(newLight, newDark);
                                }
                            }}
                        />
                    )
                })}
                <div>
                    <DiceRoller
                        rollType={"skillroll"}
                        diceString="1f"
                        diceSource={`Destiny Point Roll`}
                        diceUser={characterName || "anonymous"}
                    />
                </div>
            </div>
            {user === "esila" &&
                <div className="admin_settings">
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
                        type="button"
                        onClick={() => updateDestinyPool(destinyPool.light, destinyPool.dark)}
                    >Save Destiny</button>
                </div>
            }
        </div>
    ):
        <div>
        </div>
}

export default DestinyPool