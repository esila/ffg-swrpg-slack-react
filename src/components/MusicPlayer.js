import React, {useContext, useEffect, useRef, useState} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updateMusicPlayer as updateMusicPlayerMutation } from "../graphql/mutations";
import {onUpdateMusicPlayer} from "../graphql/subscriptions";
import {listMusicPlayers} from "../graphql/queries";
import { UserContext} from "../App";
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';
import GMMusicModal from "./GMMusicModal";
import {Grid} from "@material-ui/core";

/*
http://users.du.se/~dbe/mp3/Star%20Wars%20Soundtrack/
https://downloads.khinsider.com/game-soundtracks/album/lego-star-wars-the-complete-saga
 */

function MusicPlayer() {
    const user = useContext(UserContext);
    const [musicPlayer, setMusicPlayer] = useState({});
    const [player, setPlayer] = useState();
    const playerRef = useRef();
    playerRef.current = player;

    const [options, setOptions] = useState({
        audioLists: [
            {
                musicSrc: "",
            },
        ],
        autoPlay: false,
        autoPlayInitLoadPlayList: false,
        mode: "mini",
        clearPriorAudioLists: true,
        defaultPosition: {bottom: 0, left: 0},
        defaultVolume: .1,
    });

    useEffect(() => {
        fetchMusicPlayer();
        subscribeMusicPlayer();
    }, []);

    // GM Music Modal State
    const [gmMusicModalOpen, setGMMusicModalOpen] = useState(false);
    const handleOpenGMMusicModal = () => {
        setGMMusicModalOpen(true);
    };
    const handleCloseGMMusicModal = () => { setGMMusicModalOpen(false) };

    async function fetchMusicPlayer() {
        const apiData = await API.graphql({query: listMusicPlayers});
        const musicPlayer = apiData.data.listMusicPlayers.items && apiData.data.listMusicPlayers.items[0];
        const {track, play} = musicPlayer;
        setMusicPlayer(musicPlayer);

        setOptions(prev => ({
            ...prev,
            audioLists: [{musicSrc: track}],
            autoPlay: play,
            autoPlayInitLoadPlayList: play,
            mode: play ? "full" : "mini",
        }));

        !play && playerRef.current && playerRef.current.pause();
        play && playerRef.current && playerRef.current.play();
    }
    async function subscribeMusicPlayer() {
        await API.graphql(graphqlOperation(onUpdateMusicPlayer)).subscribe({
            next: subonUpdateMusicPlayer => {
                console.log(`subscribed message: ${JSON.stringify(subonUpdateMusicPlayer.value.data.onUpdateMusicPlayer)}`);
                //setMusicPlayer([subonUpdateMusicPlayer.value.data.onUpdateMusicPlayer]);
                fetchMusicPlayer();
            }
        })
    }

    async function updateMusicPlayer(params) {
        if (!musicPlayer.id) return;
        await API.graphql({query: updateMusicPlayerMutation, variables: {
                input: { id: musicPlayer.id, ...params }}})
            .then(success => {
                    console.log(`SUCCESS: ${JSON.stringify(success)}`);
                },
                error => {
                    console.log(`ERROR: ${JSON.stringify(error)}`);
                })
    }

    return options ? (
            <div className="MusicPlayer">
                <ReactJkMusicPlayer
                    {...options}
                    getAudioInstance={(instance) => {
                        setPlayer(instance);
                    }}
                />
                {user === "esila" &&
                <>
                    <GMMusicModal
                        open={gmMusicModalOpen}
                        handleClose={handleCloseGMMusicModal}
                        updateMusicPlayer={updateMusicPlayer}
                    />
                    <button
                        type="button"
                        onClick={() => handleOpenGMMusicModal()}
                    >GM Music</button>
                </>
                }
            </div>
        ):
        <div>
        </div>
}

export default MusicPlayer