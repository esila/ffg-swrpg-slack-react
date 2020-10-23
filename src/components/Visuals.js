import React, {useContext, useEffect, useRef, useState} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { fabric } from 'fabric';
import {
    createFabricObject as createFabricObjectMutation,
    deleteFabricObject as deleteFabricObjectMutation,
    updateFabricObject as updateFabricObjectMutation
} from "../graphql/mutations";
import {onCreateFabricObject, onDeleteFabricObject, onUpdateFabricObject} from "../graphql/subscriptions";
import {listFabricObjects} from "../graphql/queries";
import { UserContext} from "../App";
import backgroundImage from "../backgroundMap";

function Visuals() {
    const [fabricObjects, setFabricObjects] = useState([]);
    const [background, setBackground] = useState("https://triumphdespair.files.wordpress.com/2012/11/range-bands.jpg");

    useEffect(() => {
        fetchFabricObjects();
        subscribeCreateFabricObjects();
        subscribeUpdateFabricObjects();
        subscribeDeleteFabricObjects();
    }, []);

    async function fetchFabricObjects() {
        const apiData = await API.graphql({query: listFabricObjects });
        setFabricObjects(apiData.data.listFabricObjects.items);
    }

    async function subscribeUpdateFabricObjects() {
        await API.graphql(graphqlOperation(onUpdateFabricObject)).subscribe({
            next: subonUpdateFabricObject => {
                console.log(`subscribed message: ${JSON.stringify(subonUpdateFabricObject.value.data.onUpdateFabricObject)}`);
                //setFabricObjects([subonUpdateFabricObject.value.data.onUpdateFabricObject]);
                fetchFabricObjects();
            }
        })
    }

    async function subscribeCreateFabricObjects() {
        await API.graphql(graphqlOperation(onCreateFabricObject)).subscribe({
            next: subonCreateFabricObject => {
                console.log(`subscribed message: ${JSON.stringify(subonCreateFabricObject.value.data.onCreateFabricObject)}`);
                //setFabricObjects([subonCreateFabricObject.value.data.onCreateFabricObject]);
                fetchFabricObjects();
            }
        })
    }

    async function subscribeDeleteFabricObjects() {
        await API.graphql(graphqlOperation(onDeleteFabricObject)).subscribe({
            next: subonDeleteFabricObject => {
                console.log(`subscribed message: ${JSON.stringify(subonDeleteFabricObject.value.data.onDeleteFabricObject)}`);
                //setFabricObjects([subonDeleteFabricObject.value.data.onDeleteFabricObject]);
                fetchFabricObjects();
            }
        })
    }

    return fabricObjects.length > 0 ? (
        <div>
            <MapCanvas
                fabricObjects={fabricObjects}
                background={background}
                setBackground={setBackground}
            />
        </div>
    ):
        <div></div>
}

function MapCanvas({ fabricObjects, background, setBackground }) {
    const tokenList = [
        ["Stormtrooper", "https://kndr.io/ts/swt1/i/StormtrooperMale_4.png"],
        ["Gamorrean Thug", "https://kndr.io/ts/swt1/i/GamorreanMale.png"],
        ["Imperial TIE Pilot", "https://kndr.io/ts/swt1/i/HumanMaleTiepilot_3.png"],
        ["Spaceport Security Droid", "https://kndr.io/ts/swt1/i/DroidHk-47.png"],
        ["Trex Trandoshan Slaver", "https://kndr.io/ts/swt1/i/TrandoshanMale_12.png"],
        ["Lowhrick", "https://kndr.io/ts/swt1/i/WookieeMaleRoar.png"],
        ["Sasha", "https://kndr.io/ts/swt1/i/HumanWomanRebelScout.png"],
        ["Pash", "https://kndr.io/ts/swt1/i/HumanMaleBlasterSmugglerGoggles.png"],
    ];
    const mapList = [
        ["Range Bands", "https://triumphdespair.files.wordpress.com/2012/11/range-bands.jpg"],
        ["Krayt Fang", "https://s3.amazonaws.com/files.d20.io/images/3475756/Nfgcn3lIJFm3InNj5YLGXQ/original.png"],
        ["Mos Shuuta Streets", "https://kainrath.files.wordpress.com/2014/05/mos-shuuta-streets-expanded-small.jpg"],
        ["Teemo's Palace", "https://vignette.wikia.nocookie.net/starwars/images/9/9b/Teemos_palace.png"],
    ];

    const user = useContext(UserContext);
    const canvasEl = useRef(null);
    const [canvasState, setCanvasState] = useState();
    const [token, setToken] = useState(tokenList[0][1]);
    const [activeToken, setActiveToken] = useState();

    useEffect(() => {
        initCanvas();
        //addToCanvas();
    }, [fabricObjects, background]);

    function initCanvas() {
        console.log("INIT CANVAS");
        const canvas = canvasState || new fabric.Canvas(canvasEl.current);
        let canvasDict = {};

        const fabricData = fabricObjects.map((elem, idx) => {
            canvasDict[elem.fabricId] = elem.id;
            return elem.data;
        });
        const backgroundData = {...backgroundImage, src: background };
        canvas.loadFromJSON(`{"objects": [${fabricData}], "backgroundImage": ${JSON.stringify(backgroundData)}}`);

        canvas.off('object:modified');
        canvas.off('selection:created');
        canvas.off('selection:updated');
        canvas.off('selection:cleared');
        canvas.on({
            'object:modified': (e) => {
                console.log("Object modified");
                const fabricId = e.target.toJSON(['fabricId']).fabricId;
                const graphId = canvasDict[fabricId];
                const resp = updateFabricObject(graphId, JSON.stringify(e.target.toJSON(['fabricId'])));
                //console.log(`UPDATE RESP: ${JSON.stringify(resp)}`);
                //console.log(JSON.stringify(e.target.toJSON(['fabricId'])));
            },
            'selection:created': (e) => {
                console.log("Object selection created");
                const fabricId = e.target.toJSON(['fabricId']).fabricId;
                const graphId = canvasDict[fabricId];
                console.log(graphId);
                setActiveToken(graphId);
            },
            'selection:updated': (e) => {
                console.log("Object selection updated");
                const fabricId = e.target.toJSON(['fabricId']).fabricId;
                const graphId = canvasDict[fabricId];
                console.log(graphId);
                setActiveToken(graphId);
            },
            'selection:cleared': (e) => {
                console.log("Object selection cleared");
                setActiveToken();
            },
        });

        setCanvasState(canvas);
        // UseEffect's cleanup function
        return () => {
          canvas.dispose();
        };
    }

    function addToCanvas(tokenUrl) {
        console.log("TOKEN URL: ", tokenUrl);
        const tokenStub = {
            "type": "image",
            "version": "4.2.0",
            "originX": "left",
            "originY": "top",
            "left": 0,
            "top": 0,
            "fill": "rgb(0,0,0)",
            "stroke": null,
            "strokeWidth": 0,
            "strokeDashArray": null,
            "strokeLineCap": "butt",
            "strokeDashOffset": 0,
            "strokeLineJoin": "miter",
            "strokeMiterLimit": 4,
            "scaleX": 0.4,
            "scaleY": 0.4,
            "angle": 0,
            "flipX": false,
            "flipY": false,
            "opacity": 1,
            "shadow": null,
            "visible": true,
            "backgroundColor": "",
            "fillRule": "nonzero",
            "paintFirst": "fill",
            "globalCompositeOperation": "source-over",
            "skewX": 0,
            "skewY": 0,
            "cropX": 0,
            "cropY": 0,
            "src": tokenUrl,
            "crossOrigin": null,
            "filters": [],
            "fabricId": ""
        };
        const fabricId = `${Date.now()}`;
        const fabObj = {...tokenStub, fabricId: fabricId};
        const resp = createFabricObject(fabricId, JSON.stringify(fabObj));
        console.log(`RESP: ${JSON.stringify(resp)}`);
    }

    async function createFabricObject(fabricId, fabricData) {
        //console.log("GOT HERE");
        //console.log(`CREATE INPUT: ${JSON.stringify(fabricData)} / ${fabricId}`);
        if (!fabricData || !fabricId) return;
        //console.log("GOT PAST DATA TYPE");
        await API.graphql({query: createFabricObjectMutation, variables: {
            input: {
                fabricId: fabricId,
                data: fabricData
            }}})
            .then(success => {
                console.log(`SUCCESS: ${JSON.stringify(success)}`);
            },
                error => {
                console.log(`ERROR: ${JSON.stringify(error)}`);
            })
    }

    async function deleteFabricObject({ id }) {
        await API.graphql({ query: deleteFabricObjectMutation, variables: { input: { id } }})
            .then(success => {
                console.log(`SUCCESS`);
            },
                error => {
                console.log(`ERROR`)
                })
    }

    async function updateFabricObject(graphId, fabricData) {
        //console.log("GOT HERE");
        console.log(`UPDATE INPUT: ${JSON.stringify(fabricData)} / ${graphId}`);
        if (!fabricData || !graphId) return;
        //console.log("GOT PAST DATA TYPE");
        await API.graphql({query: updateFabricObjectMutation, variables: {
            input: {
                id: graphId,
                data: fabricData
            }}})
            .then(success => {
                //console.log(`SUCCESS: ${JSON.stringify(success)}`);
            },
                error => {
                //console.log(`ERROR: ${JSON.stringify(error)}`);
            })
    }
    return fabricObjects.length > 0 ? (
        <>
            {user === "esila" &&
                <>
                    <select
                        name="token_select"
                        onChange={event => {
                            event.preventDefault();
                            const { target: {value} } = event;
                            setToken(value);
                        }}
                    >
                        {tokenList.map((token, token_idx) => {
                            const [name, value] = token;
                            return <option key={token_idx} value={value}>{name}</option>
                        })}
                    </select>
                    <button
                        onClick={() => addToCanvas(token)}
                    >Add Elements</button>
                    <button
                        className="chat__delete"
                        onClick={(event) => {
                            event.preventDefault();
                            fabricObjects.forEach((obj) => {
                                console.log(`DELETE: ${obj.id}`);
                                deleteFabricObject({id: obj.id});
                            })
                        }}
                    >
                        DELETE ALL
                    </button>
                    <button
                        className="chat__delete"
                        onClick={(event) => {
                            event.preventDefault();
                            console.log("DELETE CALLED FOR: ", activeToken);
                            if (!activeToken) return;
                            deleteFabricObject({id: activeToken});
                        }}
                    >
                        DELETE ACTIVE TOKEN
                    </button>
                </>
            }
            <select
                name="map_select"
                onChange={event => {
                    event.preventDefault();
                    const { target: {value} } = event;
                    setBackground(value);
                }}
            >
                {mapList.map((map, map_idx) => {
                    const [name, value] = map;
                    return <option key={map_idx} value={value}>{name}</option>
                })}
            </select>
            <canvas ref={canvasEl} id="my-fabric-canvas" width="1920" height="1080" />
        </>
    ):
        <div></div>
}

export default Visuals