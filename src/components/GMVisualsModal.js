import React, { useState } from 'react';
import {
    Button, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText, Grid, TextField
} from "@material-ui/core";
import backgroundImage from "../backgroundMap";

const scratch = '{"version":"4.2.0","objects":[{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":141,"top":28,"width":259,"height":235,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.28,"scaleY":0.28,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://kndr.io/ts/swt1/i/HumanMaleBaldCyborg.png","crossOrigin":null,"filters":[]},{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":39.5,"top":26.5,"width":326,"height":326,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.22,"scaleY":0.22,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://kndr.io/ts/swt1/i/BothanWomanCivilian.png","crossOrigin":null,"filters":[]},{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":338,"top":32,"width":524,"height":470,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.14,"scaleY":0.14,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://kndr.io/ts/swt1/i/WookieeMaleRoar.png","crossOrigin":null,"filters":[]},{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":239,"top":27.02,"width":128,"height":128,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.54,"scaleY":0.54,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://kndr.io/ts/swt1/i/DroidIg88_2.png","crossOrigin":null,"filters":[]}],"backgroundImage":{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":0,"top":0,"width":3060,"height":1980,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://1.bp.blogspot.com/-bvU8Hvlw53k/UPmkuLOAjzI/AAAAAAAACIE/vgbunrLNPyc/s1600/star_wars_edge_of_the_empire_JPTargete.jpg","crossOrigin":null,"filters":[]}}';

const pcs = [{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":141,"top":28,"width":259,"height":235,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.28,"scaleY":0.28,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://kndr.io/ts/swt1/i/HumanMaleBaldCyborg.png","crossOrigin":null,"filters":[]},{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":39.5,"top":26.5,"width":326,"height":326,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.22,"scaleY":0.22,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://kndr.io/ts/swt1/i/BothanWomanCivilian.png","crossOrigin":null,"filters":[]},{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":338,"top":32,"width":524,"height":470,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.14,"scaleY":0.14,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://kndr.io/ts/swt1/i/WookieeMaleRoar.png","crossOrigin":null,"filters":[]},{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":239,"top":27.02,"width":128,"height":128,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.54,"scaleY":0.54,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://kndr.io/ts/swt1/i/DroidIg88_2.png","crossOrigin":null,"filters":[]}];

const mapList = [
    ["", {url: "", scaleX: 1, scaleY: 1}],
    ["Range Bands", {url: "https://triumphdespair.files.wordpress.com/2012/11/range-bands.jpg", scaleX: 0.4, scaleY: 0.35}],
    ["Krayt Fang", {url: "https://s3.amazonaws.com/files.d20.io/images/3475756/Nfgcn3lIJFm3InNj5YLGXQ/original.png", scaleX: 0.5, scaleY: 0.5}],
    ["Formos", {url: "https://starwars-armorer-images.s3.amazonaws.com/backgrounds/FormosMap.jpg", scaleX: 1.5, scaleY: 1.2}],
    ["Daro Warehouse", {url: "https://starwars-armorer-images.s3.amazonaws.com/backgrounds/daro-warehouse.jpg", scaleX: 1.3, scaleY: 1.3}],
    ["Hit Site", {url: "https://starwars-armorer-images.s3.amazonaws.com/backgrounds/hit_site.png", scaleX: 0.8, scaleY: 0.7}],
    ["Kashyyk", {url: "https://starwars-armorer-images.s3.amazonaws.com/backgrounds/RryattTrailMap-SWG.jpeg", scaleX: 1.5, scaleY: 1.0}],
    ["Whisper Base", {url: "https://starwars-armorer-images.s3.amazonaws.com/backgrounds/Whisper_Base.png", scaleX: 1.0, scaleY: 1.0}],
];

const tokenList = [
    ["Zukata Netakka", "https://kndr.io/ts/swt1/i/RodianWomanGoggles.png"],
    ["Daro Blunt", "https://kndr.io/ts/swt1/i/HumanMaleThug1.png"],
    ["R4 Droid", "https://kndr.io/ts/swt1/i/DroidR5D4.png"],
    ["Rebel", "https://kndr.io/ts/swt1/i/HumanMaleRebel_14.png"],
]

function GMVisualsModal({open, handleClose, updateCanvasObject, canvasObjects, canvasId, token, setToken, activeToken}) {

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

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth={'md'}
                PaperProps={{
                    style: {
                        maxHeight: "700px"
                    },
                }}
            >
                <DialogTitle id="form-dialog-title">Visuals Admin</DialogTitle>
                <DialogContent style={{position: "inherit"}}>
                    <DialogContentText>
                    </DialogContentText>
                    <Grid container spacing={3}>
                        <Grid item xs style={{textAlign: "left"}}>
                            <strong>Change background: </strong>
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
                            <hr/>
                            <br/>
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
                            <select
                                name="token_select"
                                value={token}
                                onChange={event => {
                                    event.preventDefault();
                                    const {target: {value}} = event;
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
                            <hr/>
                            <br/>
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
                            <br/>
                            <br/>
                            <button
                                onClick={() => {
                                    const canvasObjectsJSON = JSON.parse(canvasObjects);
                                    const updateInput = {
                                        ...canvasObjectsJSON,
                                        objects: []
                                    }
                                    if (!updateInput) return;
                                    updateCanvasObject(canvasId, JSON.stringify(updateInput));
                                }}
                            >DELETE PC Tokens</button>
                            <br/>
                            <br/>
                            <hr/>
                            <button
                                onClick={() => console.log(canvasObjects)}
                            >Stringify Canvas</button>
                            <br/>
                            <br/>
                            <button
                                onClick={() => updateCanvasObject("32914896-c627-47b9-903b-730cc2f4b589", scratch)}
                            >Reload Canvas</button>

                            <br/>
                            <br/>
                            <button
                                onClick={() => {
                                    const canvasObjectsJSON = JSON.parse(canvasObjects);
                                    const updateInput = {
                                        ...canvasObjectsJSON,
                                        objects: pcs
                                    }
                                    if (!updateInput) return;
                                    updateCanvasObject(canvasId, JSON.stringify(updateInput));
                                }}
                            >Restore PC Tokens</button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={() => handleClose()} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default GMVisualsModal
