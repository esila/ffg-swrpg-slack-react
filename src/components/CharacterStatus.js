import React, {useContext, useEffect, useState} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import {
    createCharacterStatus as createCharacterStatusMutation,
    updateCharacterStatus as updateCharacterStatusMutation
} from "../graphql/mutations";
import {onUpdateCharacterStatus} from "../graphql/subscriptions";
import {listCharacterStatuss, listCharacterSheets} from "../graphql/queries";
import { UserContext} from "../App";
import {Grid} from "@material-ui/core";

function CharacterStatus({ currentCharacterSheet }) {
    const user = useContext(UserContext);
    const [characterStatus, setCharacterStatus] = useState({});
    const currentCharacterSoakWounds = currentCharacterSheet && currentCharacterSheet.soakWounds;

    useEffect(() => {
        fetchCharacterStatus();
        subscribeCharacterStatus();
    }, []);

    async function fetchCharacterStatus() {
        const apiStatusData = await API.graphql({query: listCharacterStatuss });
        const apiCSData = await API.graphql({query: listCharacterSheets });

        const partyStatus = apiStatusData.data.listCharacterStatuss.items;
        const currentCharacterStatus = partyStatus.find((status) => status.player_name === user);
        const restPartyStatus = partyStatus.filter((status) => status.player_name !== user);

        const partySheets = apiCSData.data.listCharacterSheets.items.filter((sheet) => sheet.character.player_name !== user);
        setCharacterStatus({
            partyStatus: restPartyStatus,
            partySheets: partySheets,
            currentCharacterStatus: currentCharacterStatus,
        });
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
        <div className="party_status" style={{fontSize: "12px"}}>
            <Grid container spacing={3}>
                <Grid item xs={6} direction="row" style={{textAlign: "left", display: "flex"}}>
                    {characterStatus.currentCharacterStatus &&
                    <div style={{cursor: "pointer"}}>
                        <p>{characterStatus.currentCharacterStatus.name}</p>
                        <p>Wounds: {characterStatus.currentCharacterStatus.wounds} | {currentCharacterSoakWounds.wounds.threshold}</p>
                        <p>Strain: {characterStatus.currentCharacterStatus.strain} | {currentCharacterSoakWounds.strain.threshold}</p>
                    </div>
                    }
                </Grid>
                <Grid item xs={6} direction="row" style={{textAlign: "left", display: "flex"}}>
                    {characterStatus.partyStatus
                        .map((status, status_idx) => {
                            const characterSoakWounds = characterStatus.partySheets.find((sheet) => sheet.character.player_name === status.player_name).soakWounds;
                            return (
                                <div key={status_idx}>
                                    <p>{status.name}</p>
                                    <p>Wounds: {status.wounds} | {characterSoakWounds.wounds.threshold}</p>
                                    <p>Strain: {status.strain} | {characterSoakWounds.strain.threshold}</p>
                                </div>
                            )
                        })}
                </Grid>
            </Grid>
        </div>
    ):
        <div className="party_status">
            LOADING STATUS
        </div>
}

export default CharacterStatus