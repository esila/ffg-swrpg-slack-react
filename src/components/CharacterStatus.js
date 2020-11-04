import React, {useContext, useEffect, useRef, useState} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import {
    createCharacterStatus as createCharacterStatusMutation,
    updateCharacterStatus as updateCharacterStatusMutation
} from "../graphql/mutations";
import {onUpdateCharacterStatus} from "../graphql/subscriptions";
import {listCharacterStatuss, listCharacterSheets} from "../graphql/queries";
import { UserContext} from "../App";
import {Grid} from "@material-ui/core";
import CharacterStatusModal from "./CharacterStatusModal";
import StatusCard from "./StatusCard";
import { useSnackbar } from 'notistack';

function CharacterStatus({ currentCharacterSheet }) {
    const user = useContext(UserContext);
    const [characterStatus, setCharacterStatus] = useState({});
    const [prevCharacterStatus, setPrevCharacterStatus] = useState({});
    const currentCharacterSoakWounds = currentCharacterSheet && currentCharacterSheet.soakWounds;

    // useRef to get at previous status state
    const prevStatus = useRef({});
    prevStatus.current = prevCharacterStatus;

    // Snackbar
    const { enqueueSnackbar } = useSnackbar();
    const handleOpenSnackBar = (status) => {
        const [message, severity] = status;
        enqueueSnackbar( message, {variant: severity})
    };

    // Player Status Modal State
    const [playerStatusModalOpen, setPlayerStatusModalOpen] = useState(false);
    const handleOpenPlayerStatusModalModal = () => {
        setPlayerStatusModalOpen(true);
    };
    const handleClosePlayerStatusModal = () => { setPlayerStatusModalOpen(false) };

    useEffect(() => {
        fetchCharacterStatus();
        subscribeCharacterStatus();
    }, []);

    async function fetchCharacterStatus() {
        const apiStatusData = await API.graphql({query: listCharacterStatuss });
        const apiCSData = await API.graphql({query: listCharacterSheets });

        const partyStatus = apiStatusData.data.listCharacterStatuss.items;
        const currentCharacterStatus = partyStatus.find((status) => status.player_name === user);
        const restPartyStatus = partyStatus.filter((status) => status.player_name !== user && status.player_name !== "esila");

        const partySheets = apiCSData.data.listCharacterSheets.items.filter((sheet) => sheet.character.player_name !== user);
        setCharacterStatus({
            fullPartyStatus: partyStatus,
            partyStatus: restPartyStatus,
            partySheets: partySheets,
            currentCharacterStatus: currentCharacterStatus,
        });
        setPrevCharacterStatus({
            fullPartyStatus: partyStatus,
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
                const {name, player_name, wounds, strain, critical_injuries} = subonUpdateCharacterStatus.value.data.onUpdateCharacterStatus;
                const prevCharacter = prevStatus.current.fullPartyStatus.find((status) => status.player_name === player_name);
                const prevWounds = prevCharacter.wounds;
                const prevStrain = prevCharacter.strain;
                console.log(prevWounds, prevStrain);
                let woundStatus = "";
                let strainStatus = "";
                if (wounds > prevWounds) {
                    woundStatus = [`${name} suffered ${wounds - prevWounds} wound${wounds - prevWounds > 1 && "s"}!`, "error"];
                } else if (wounds < prevWounds) {
                    woundStatus = [`${name} healed ${prevWounds - wounds} wound${prevWounds - wounds > 1 && "s"}!`, "success"];
                }
                if (strain > prevStrain) {
                    strainStatus = [`${name} suffered ${strain - prevStrain} strain!`, "warning"];
                } else if (strain < prevStrain) {
                    strainStatus = [`${name} recovered ${prevStrain - strain} strain!`, "info"];
                }
                woundStatus && handleOpenSnackBar(woundStatus);
                strainStatus && handleOpenSnackBar(strainStatus);
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

    async function updateCharacterStatus(status_id, wounds, strain) {
        //console.log("GOT HERE");
        //console.log(`UPDATE INPUT: ${wounds} / ${strain}`);

        if (!status_id) return;
        console.log("GOT PAST DATA TYPE");
        await API.graphql({query: updateCharacterStatusMutation, variables: {
            input: { id: status_id, wounds: wounds, strain: strain
            }}})
            .then(success => {
                //woundStatus && handleOpenSnackBar(woundStatus);
                //strainStatus && handleOpenSnackBar(strainStatus);
                //enqueueSnackbar('This is a success message!', { variant: "success" });
                //setPrevCharacterStatus(characterStatus);
                console.log(`SUCCESS: ${JSON.stringify(success)}`);
            },
                error => {
                console.log(`ERROR: ${JSON.stringify(error)}`);
            })
    }

    return characterStatus.partyStatus ? (
        <div className="party_status" style={{fontSize: "12px"}}>
            <Grid container spacing={3}>
                <Grid item xs={4} direction="row" style={{textAlign: "left", display: "flex"}}>
                    {characterStatus.currentCharacterStatus &&
                    <div
                        style={{cursor: "pointer"}}
                        onClick={() => { handleOpenPlayerStatusModalModal()}}
                    >
                        <StatusCard
                            name={characterStatus.currentCharacterStatus.name}
                            currentWounds={characterStatus.currentCharacterStatus.wounds}
                            currentStrain={characterStatus.currentCharacterStatus.strain}
                            thresholdWounds={currentCharacterSoakWounds.wounds.threshold}
                            thresholdStrain={currentCharacterSoakWounds.strain.threshold}
                        />
                    </div>
                    }
                </Grid>
                <Grid item xs={8} direction="row" style={{textAlign: "left", display: "flex"}}>
                    {characterStatus.partyStatus
                        .map((status, status_idx) => {
                            const characterSoakWounds = characterStatus.partySheets.find((sheet) => sheet.character.player_name === status.player_name).soakWounds;
                            return (
                                <div key={status_idx}>
                                    <StatusCard
                                        name={status.name}
                                        currentWounds={status.wounds}
                                        currentStrain={status.strain}
                                        thresholdWounds={characterSoakWounds.wounds.threshold}
                                        thresholdStrain={characterSoakWounds.strain.threshold}
                                    />
                                </div>
                            )
                        })}
                </Grid>
            </Grid>
            <CharacterStatusModal
                open={playerStatusModalOpen}
                handleClose={handleClosePlayerStatusModal}
                status={characterStatus.currentCharacterStatus}
                threshold={currentCharacterSoakWounds}
                updateCharacterStatus={updateCharacterStatus}
            />
        </div>
    ):
        <div className="party_status">
            LOADING STATUS
        </div>
}

export default CharacterStatus