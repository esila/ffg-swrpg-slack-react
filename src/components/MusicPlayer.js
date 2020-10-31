import React, {useContext, useEffect, useRef, useState} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updateMusicPlayer as updateMusicPlayerMutation } from "../graphql/mutations";
import {onUpdateMusicPlayer} from "../graphql/subscriptions";
import {listMusicPlayers} from "../graphql/queries";
import { UserContext} from "../App";
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';

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
                    <button
                        type="button"
                        onClick={() => updateMusicPlayer({
                            play: true,
                            track: "https://vgmdownloads.com/soundtracks/lego-star-wars-the-complete-saga/gqqgromtht/01.%20Star%20Wars%20Main%20Title%20and%20Ambush%20on%20Coruscant.mp3"
                        })}
                    >Play Track 1</button>
                    <button
                        type="button"
                        onClick={() => updateMusicPlayer({
                            play: true,
                            track: "http://users.du.se/~dbe/mp3/Star%20Wars%20Soundtrack/Star%20Wars%20I%20-%20Duel%20Of%20The%20Fates.mp3"
                        })}
                    >Play Track 2</button>
                    <button
                        type="button"
                        onClick={() => updateMusicPlayer({
                            play: true,
                            track: "http://users.du.se/~dbe/mp3/Star%20Wars%20Soundtrack/Star%20Wars%20VI%20-%20Twentieth%20Century%20Fox%20Theme.mp3"
                        })}
                    >Play Track 3</button>
                    <button
                        type="button"
                        onClick={() => updateMusicPlayer({play: false, track: ""})}
                    >Stop Track</button>
                </>
                }
            </div>
        ):
        <div>
        </div>
}

export default MusicPlayer