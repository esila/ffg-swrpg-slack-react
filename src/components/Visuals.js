import React, {useContext, useEffect, useRef, useState} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { fabric } from 'fabric';
import {
    createFabricObject as createFabricObjectMutation,
    createCanvasObject as createCanvasObjectMutation,
    deleteFabricObject as deleteFabricObjectMutation,
    updateFabricObject as updateFabricObjectMutation,
    updateCanvasObject as updateCanvasObjectMutation
} from "../graphql/mutations";
import {onCreateFabricObject, onDeleteFabricObject, onUpdateCanvasObject} from "../graphql/subscriptions";
import {listFabricObjects, listCanvasObjects} from "../graphql/queries";
import { UserContext} from "../App";
import backgroundImage from "../backgroundMap";

const scratch = '{"version":"4.2.0","objects":[{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":115.21,"top":145,"width":452,"height":404,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.16,"scaleY":0.16,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://kndr.io/ts/swt1/i/DroidHk-47.png","crossOrigin":null,"filters":[]},{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":299,"top":459,"width":259,"height":235,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.25,"scaleY":0.25,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://kndr.io/ts/swt1/i/HumanMaleBaldCyborg.png","crossOrigin":null,"filters":[]},{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":264.5,"top":56.5,"width":326,"height":326,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.48,"scaleY":0.48,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://kndr.io/ts/swt1/i/BothanWomanCivilian.png","crossOrigin":null,"filters":[]},{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":389,"top":455,"width":524,"height":470,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.14,"scaleY":0.14,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://kndr.io/ts/swt1/i/WookieeMaleRoar.png","crossOrigin":null,"filters":[]}],"backgroundImage":{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":0,"top":0,"width":3060,"height":1980,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://1.bp.blogspot.com/-bvU8Hvlw53k/UPmkuLOAjzI/AAAAAAAACIE/vgbunrLNPyc/s1600/star_wars_edge_of_the_empire_JPTargete.jpg","crossOrigin":null,"filters":[]}}';

function Visuals() {
    const [canvasObjects, setCanvasObjects] = useState();
    const [canvasState, setCanvasState] = useState();
    const canvasEl = useRef(null);

    useEffect(() => {
        fetchCanvasObjects();
        //subscribeCreateCanvasObjects();
        subscribeUpdateCanvasObjects();
        //subscribeDeleteCanvasObjects();
    }, []);

    async function fetchCanvasObjects() {
        const apiData = await API.graphql({query: listCanvasObjects });
        const fetchedData = apiData.data.listCanvasObjects.items[0];
        fetchedData && setCanvasObjects(fetchedData.data);

        console.log("INIT CANVAS");
        const canvas = canvasState || new fabric.Canvas(canvasEl.current);
        fetchedData && canvas.loadFromJSON(JSON.parse(fetchedData.data));

        canvas.off('object:modified');
        canvas.off('selection:created');
        canvas.off('selection:updated');
        canvas.off('selection:cleared');
        canvas.on({
            'object:modified': () => {
                console.log("Object modified");
                updateCanvasObject(fetchedData.id, JSON.stringify(canvas));
            },
            'selection:created': () => {
                console.log("Object selection created");
                updateCanvasObject(fetchedData.id, JSON.stringify(canvas));
                //setActiveToken(graphId);
            },
            'selection:updated': (e) => {
                console.log("Object selection updated");
                updateCanvasObject(fetchedData.id, JSON.stringify(canvas));
                //setActiveToken(graphId);
            },
            'selection:cleared': (e) => {
                updateCanvasObject(fetchedData.id, JSON.stringify(canvas));
                //setActiveToken();
            },
        });

        setCanvasState(canvas);
        // UseEffect's cleanup function
        return () => {
          canvas.dispose();
        };
    }

    async function updateCanvasObject(canvasId, canvasData) {
        if (!canvasId || !canvasData) return;
        await API.graphql({query: updateCanvasObjectMutation, variables: {
            input: {
                id: canvasId,
                data: canvasData
            }}})
            .then(success => {
                console.log(`SUCCESS: ${JSON.stringify(success)}`);
            },
                error => {
                console.log(`ERROR: ${JSON.stringify(error)}`);
            })
    }

    async function subscribeUpdateCanvasObjects() {
        await API.graphql(graphqlOperation(onUpdateCanvasObject)).subscribe({
            next: subonUpdateCanvasObject => {
                console.log(`subscribed message: ${JSON.stringify(subonUpdateCanvasObject.value.data.onUpdateCanvasObject)}`);
                //setCanvasObjects([subonUpdateCanvasObject.value.data.onUpdateCanvasObject]);
                fetchCanvasObjects();
            }
        })
    }

    /*
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

    function initCanvas() {
        console.log("INIT CANVAS");
        const canvas = canvasState || new fabric.Canvas(canvasEl.current);
        let canvasDict = {};

        const fabricData = fabricObjects.map((elem, idx) => {
            canvasDict[elem.fabricId] = elem.id;
            return elem.data;
        });
        const backgroundData = {...backgroundImage, src: background.url, scaleX: background.scaleX, scaleY: background.scaleY };
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

     */

    return canvasObjects ? (
        <div>
            <button
                onClick={() => console.log(canvasObjects)}
            >Stringify Canvas</button>
             <button
                onClick={() => updateCanvasObject("32914896-c627-47b9-903b-730cc2f4b589", scratch)}
            >Reload Canvas</button>
            <canvas ref={canvasEl} id="my-fabric-canvas" width="1920" height="1080" />
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
        ["Welcome", {url: "https://1.bp.blogspot.com/-bvU8Hvlw53k/UPmkuLOAjzI/AAAAAAAACIE/vgbunrLNPyc/s1600/star_wars_edge_of_the_empire_JPTargete.jpg", scaleX: 1, scaleY: 1}],
        ["Range Bands", {url: "https://triumphdespair.files.wordpress.com/2012/11/range-bands.jpg", scaleX: 0.4, scaleY: 0.35}],
        ["Krayt Fang", {url: "https://s3.amazonaws.com/files.d20.io/images/3475756/Nfgcn3lIJFm3InNj5YLGXQ/original.png", scaleX: 0.5, scaleY: 0.5}],
        ["Mos Shuuta Streets", {url: "https://kainrath.files.wordpress.com/2014/05/mos-shuuta-streets-expanded-small.jpg", scaleX: 0.39, scaleY: 0.39}],
        ["Teemo's Palace", {url: "https://vignette.wikia.nocookie.net/starwars/images/9/9b/Teemos_palace.png", scaleX: 0.5, scaleY: 0.5}],
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
        const backgroundData = {...backgroundImage, src: background.url, scaleX: background.scaleX, scaleY: background.scaleY };
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

     async function createCanvasObject(canvasData) {
        console.log("GOT HERE");
        if (!canvasData) return;
        //console.log("GOT PAST DATA TYPE");
        await API.graphql({query: createCanvasObjectMutation, variables: {
            input: {
                data: JSON.stringify(canvasData)
            }}})
            .then(success => {
                console.log(`SUCCESS: ${JSON.stringify(success)}`);
            },
                error => {
                console.log(`ERROR: ${JSON.stringify(error)}`);
            })
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
        <div style={{height: "750px", overflow: "auto"}}>
            {user === "esila" &&
                <>
                    <input
                        name="token_input"
                        type="text"
                        value={token}
                        onChange={event => {
                        event.preventDefault();
                        const { target: {value} } = event;
                        setToken(value);
                        }}
                    />
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
                        type="button"
                        onClick={() => addToCanvas(token)}
                    >Add Elements</button>
                    <button
                        type="button"
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
                        type="button"
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
                    setBackground(JSON.parse(value));
                }}
            >
                {mapList.map((map, map_idx) => {
                    const [name, value] = map;
                    return <option key={map_idx} value={JSON.stringify(value)}>{name}</option>
                })}
            </select>
            <button
                onClick={() => createCanvasObject(canvasState)}
            >Stringify Canvas</button>
            <canvas ref={canvasEl} id="my-fabric-canvas" width="1920" height="1080" />
        </div>
    ):
        <div></div>
}

export default Visuals