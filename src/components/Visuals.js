import React, {useContext, useEffect, useRef, useState} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { fabric } from 'fabric';
import {
    updateCanvasObject as updateCanvasObjectMutation
} from "../graphql/mutations";
import {onUpdateCanvasObject} from "../graphql/subscriptions";
import {listCanvasObjects} from "../graphql/queries";
import { UserContext} from "../App";
import backgroundImage from "../backgroundMap";

const scratch = '{"version":"4.2.0","objects":[{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":115.21,"top":145,"width":452,"height":404,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.16,"scaleY":0.16,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://kndr.io/ts/swt1/i/DroidHk-47.png","crossOrigin":null,"filters":[]},{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":299,"top":459,"width":259,"height":235,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.25,"scaleY":0.25,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://kndr.io/ts/swt1/i/HumanMaleBaldCyborg.png","crossOrigin":null,"filters":[]},{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":264.5,"top":56.5,"width":326,"height":326,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.48,"scaleY":0.48,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://kndr.io/ts/swt1/i/BothanWomanCivilian.png","crossOrigin":null,"filters":[]},{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":389,"top":455,"width":524,"height":470,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.14,"scaleY":0.14,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://kndr.io/ts/swt1/i/WookieeMaleRoar.png","crossOrigin":null,"filters":[]}],"backgroundImage":{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":0,"top":0,"width":3060,"height":1980,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://1.bp.blogspot.com/-bvU8Hvlw53k/UPmkuLOAjzI/AAAAAAAACIE/vgbunrLNPyc/s1600/star_wars_edge_of_the_empire_JPTargete.jpg","crossOrigin":null,"filters":[]}}';

const mapList = [
    ["Welcome", {url: "https://1.bp.blogspot.com/-bvU8Hvlw53k/UPmkuLOAjzI/AAAAAAAACIE/vgbunrLNPyc/s1600/star_wars_edge_of_the_empire_JPTargete.jpg", scaleX: 1, scaleY: 1}],
    ["Range Bands", {url: "https://triumphdespair.files.wordpress.com/2012/11/range-bands.jpg", scaleX: 0.4, scaleY: 0.35}],
    ["Krayt Fang", {url: "https://s3.amazonaws.com/files.d20.io/images/3475756/Nfgcn3lIJFm3InNj5YLGXQ/original.png", scaleX: 0.5, scaleY: 0.5}],
    ["Mos Shuuta Streets", {url: "https://kainrath.files.wordpress.com/2014/05/mos-shuuta-streets-expanded-small.jpg", scaleX: 0.39, scaleY: 0.39}],
    ["Teemo's Palace", {url: "https://vignette.wikia.nocookie.net/starwars/images/9/9b/Teemos_palace.png", scaleX: 0.5, scaleY: 0.5}],
];

function Visuals() {
    const user = useContext(UserContext);
    const [canvasObjects, setCanvasObjects] = useState();
    const [canvasId, setCanvasId] = useState();
    const [canvasState, setCanvasState] = useState();
    const canvasEl = useRef(null);
    const canvasMock = useRef(null);
    canvasMock.current = canvasState;

    const [activeToken, setActiveToken] = useState();
    const [token, setToken] = useState("");

    useEffect(() => {
        fetchCanvasObjects();
        subscribeUpdateCanvasObjects();
    }, []);

    async function fetchCanvasObjects() {
        const apiData = await API.graphql({query: listCanvasObjects });
        const fetchedData = apiData.data.listCanvasObjects.items[0];
        fetchedData && setCanvasObjects(fetchedData.data);
        fetchedData && setCanvasId(fetchedData.id);

        console.log("INIT CANVAS");
        const canvas = canvasMock.current || new fabric.Canvas(canvasEl.current);
        fetchedData && canvas.loadFromJSON(JSON.parse(fetchedData.data));

        canvas.off('object:modified');
        canvas.off('selection:created');
        canvas.off('selection:updated');
        canvas.off('selection:cleared');
        canvas.on({
            'object:modified': (e) => {
                console.log("Object modified");
                updateCanvasObject(fetchedData.id, JSON.stringify(canvas));
            },
            'selection:created': (e) => {
                console.log("Object selection created");
                console.log(e.target.toJSON());
                setActiveToken(e.target.toJSON());
            },
            'selection:updated': (e) => {
                console.log("Object selection updated");
                console.log(e.target.toJSON());
                setActiveToken(e.target.toJSON());
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
                fetchCanvasObjects();
            }
        })
    }

    function addToCanvas(tokenUrl) {
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
        };
        const canvasObjectsJSON = JSON.parse(canvasObjects);
        const updatedCanvasObjects = [...canvasObjectsJSON.objects, tokenStub];
        console.log(updatedCanvasObjects);
        const updateInput = {
            ...canvasObjectsJSON,
            objects: updatedCanvasObjects
        }
        updateCanvasObject(canvasId, JSON.stringify(updateInput));
    }

    return canvasObjects ? (
        <div style={{height: "750px", overflow: "auto"}}>
            {user === "esila" &&
            <>
                <select
                    name="map_select"
                    onChange={event => {
                        event.preventDefault();
                        const canvasObjectsJSON = JSON.parse(canvasObjects);
                        const {target: {value}} = event;
                        const background = JSON.parse(value);
                        const backgroundData = {
                            ...backgroundImage,
                            src: background.url,
                            scaleX: background.scaleX,
                            scaleY: background.scaleY
                        };
                        const updateInput = {
                            ...canvasObjectsJSON,
                            backgroundImage: backgroundData
                        }
                        if (!updateInput) return;
                        updateCanvasObject(canvasId, JSON.stringify(updateInput));
                    }}
                >
                    {mapList.map((map, map_idx) => {
                        const [name, value] = map;
                        return <option key={map_idx} value={JSON.stringify(value)}>{name}</option>
                    })}
                </select>
                <button
                    onClick={() => console.log(canvasObjects)}
                >Stringify Canvas</button>
                <button
                    onClick={() => updateCanvasObject("32914896-c627-47b9-903b-730cc2f4b589", scratch)}
                >Reload Canvas</button>
                <input
                    name="token_input"
                    type="text"
                    value={token}
                    onChange={event => {
                        event.preventDefault();
                        const {target: {value}} = event;
                        setToken(value);
                    }}
                />
                <button
                    type="button"
                    onClick={() => addToCanvas(token)}
                >Add Elements</button>
                <button
                    type="button"
                    onClick={(event) => {
                        event.preventDefault();
                        if (!activeToken) return;
                        console.log("DELETE CALLED FOR: ", activeToken);
                        const canvasObjectsJSON = JSON.parse(canvasObjects);
                        const isDeleteElem = (element) =>
                            element.src === activeToken.src &&
                            element.top === activeToken.top &&
                            element.left === activeToken.left;
                        const deleteIndex = canvasObjectsJSON.objects.findIndex(isDeleteElem);
                        canvasObjectsJSON.objects.splice(deleteIndex, 1);
                        const updateInput = {
                            ...canvasObjectsJSON,
                            objects: canvasObjectsJSON.objects
                        }
                        if (!updateInput) return;
                        updateCanvasObject(canvasId, JSON.stringify(updateInput));
                    }}
                >
                    DELETE ACTIVE TOKEN
                </button>
            </>
            }
            <canvas ref={canvasEl} id="my-fabric-canvas" width="1920" height="1080" />
        </div>
    ):
        <div></div>
}

export default Visuals