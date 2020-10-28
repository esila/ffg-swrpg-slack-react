import React, {useContext, useEffect, useState} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import {
    createCharacterStatus as createCharacterStatusMutation,
    updateCharacterStatus as updateCharacterStatusMutation
} from "../graphql/mutations";
import {onUpdateCharacterStatus} from "../graphql/subscriptions";
import {listCharacterStatuss, listCharacterSheets} from "../graphql/queries";
import { UserContext} from "../App";

function CharacterStatus({ characterName }) {
    const user = useContext(UserContext);
    const [characterStatus, setCharacterStatus] = useState({});

    useEffect(() => {
        fetchCharacterStatus();
        subscribeCharacterStatus();
    }, []);

    async function fetchCharacterStatus() {
        const apiData = await API.graphql({query: listCharacterStatuss });
        const characterStatus = apiData.data.listCharacterStatuss.items;
        const apiCharacterSheets = await API.graphql({query: listCharacterSheets});
        const characterSheetData = apiCharacterSheets.data.listCharacterSheets.items;
        setCharacterStatus({partyStatus: characterStatus, characterSheets: characterSheetData});
    }

    async function subscribeCharacterStatus() {
        await API.graphql(graphqlOperation(onUpdateCharacterStatus)).subscribe({
            next: subonUpdateCharacterStatus => {
                console.log(`subscribed message: ${JSON.stringify(subonUpdateCharacterStatus.value.data.onUpdateCharacterStatus)}`);
                //setCharacterStatus([subonUpdateCharacterStatus.value.data.onUpdateCharacterStatus]);
                fetchCharacterStatus();
            }
        })
    }

    async function createCharacterStatus(status) {
        //console.log("GOT HERE");
        console.log(`CREATE INPUT: ${JSON.stringify(status)}`);
        if (!status) return;
        console.log("GOT PAST DATA TYPE");
        await API.graphql({query: createCharacterStatusMutation, variables: {
            input: { ...status
            }}})
            .then(success => {
                console.log(`SUCCESS: ${JSON.stringify(success)}`);
            },
                error => {
                console.log(`ERROR: ${JSON.stringify(error)}`);
            })
    }

    async function updateCharacterStatus(light, dark) {
        //console.log("GOT HERE");
        //console.log(`UPDATE INPUT: ${JSON.stringify(fabricData)} / ${graphId}`);
        if (!characterStatus.id) return;
        //console.log("GOT PAST DATA TYPE");
        await API.graphql({query: updateCharacterStatusMutation, variables: {
            input: { id: characterStatus.id, light: light, dark: dark
            }}})
            .then(success => {
                console.log(`SUCCESS: ${JSON.stringify(success)}`);
            },
                error => {
                console.log(`ERROR: ${JSON.stringify(error)}`);
            })
    }
    return characterStatus.partyStatus ? (
        <div className="party_status">
            <p>{JSON.stringify(characterStatus.partyStatus)}</p>
        </div>
    ):
        <div className="party_status">
            <button
                onClick={() => {console.log(characterStatus.characterSheets)}}
            >State2</button>
        </div>
}

export default CharacterStatus