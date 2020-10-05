import React, {useContext, useEffect, useRef, useState} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { fabric } from 'fabric';
import {
    createFabricObject as createFabricObjectMutation,
    deleteFabricObject as deleteFabricObjectMutation,
    updateFabricObject as updateFabricObjectMutation
} from "./graphql/mutations";
import {onCreateFabricObject, onUpdateFabricObject} from "./graphql/subscriptions";
import {listFabricObjects} from "./graphql/queries";
import { UserContext} from "./App";
import backgroundImage from "./backgroundMap";

function Visuals() {
    const [fabricObjects, setFabricObjects] = useState([]);
    const [background, setBackground] = useState("https://triumphdespair.files.wordpress.com/2012/11/range-bands.jpg");

    useEffect(() => {
        fetchFabricObjects();
        subscribeCreateFabricObjects();
        subscribeFabricObjects();
    }, []);

    async function fetchFabricObjects() {
        const apiData = await API.graphql({query: listFabricObjects });
        setFabricObjects(apiData.data.listFabricObjects.items);
    }

    async function subscribeFabricObjects() {
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
    const user = useContext(UserContext);
    const canvasEl = useRef(null);
    const [canvasState, setCanvasState] = useState();

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
        canvas.on({
            'object:modified': (e) => {
                console.log("Object modified");
                const fabricId = e.target.toJSON(['fabricId']).fabricId;
                const graphId = canvasDict[fabricId];
                const resp = updateFabricObject(graphId, JSON.stringify(e.target.toJSON(['fabricId'])));
                //console.log(`UPDATE RESP: ${JSON.stringify(resp)}`);
                //console.log(JSON.stringify(e.target.toJSON(['fabricId'])));
            }
        });

        setCanvasState(canvas);
        // UseEffect's cleanup function
        return () => {
          canvas.dispose();
        };
    }

    function addToCanvas() {
        const bothan = {
            "type": "image",
            "version": "4.2.0",
            "originX": "left",
            "originY": "top",
            "left": 0,
            "top": 0,
            "width": 330,
            "height": 330,
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
            "src": "http://kndr.io/ts/swt1/i/BothanMale-Ota2.png",
            "crossOrigin": null,
            "filters": [],
            "fabricId": ""
        };
        const fabricId = `${Date.now()}`;
        const fabObj = {...bothan, fabricId: fabricId};
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
        //console.log(`UPDATE INPUT: ${JSON.stringify(fabricData)} / ${graphId}`);
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
                    <button
                        onClick={() => addToCanvas()}
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

                </>
            }
            <button
                onClick={() => setBackground("https://triumphdespair.files.wordpress.com/2012/11/range-bands.jpg")}
            >Range Bands</button>
            <button
                onClick={() => setBackground("https://kainrath.files.wordpress.com/2014/05/mos-shuuta-streets-expanded-small.jpg")}
            >Mos Shuuta Streets</button>
            <canvas ref={canvasEl} id="my-fabric-canvas" width="1920" height="1080" />
        </>
    ):
        <div></div>
}

export default Visuals