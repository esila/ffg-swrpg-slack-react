import React, { useState } from 'react';
import {
    Button, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText, Grid, TextField
} from "@material-ui/core";
import backgroundImage from "../backgroundMap";

const scratch = '{"version":"4.2.0","objects":[{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":115.21,"top":145,"width":452,"height":404,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.16,"scaleY":0.16,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://kndr.io/ts/swt1/i/DroidHk-47.png","crossOrigin":null,"filters":[]},{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":299,"top":459,"width":259,"height":235,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.25,"scaleY":0.25,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://kndr.io/ts/swt1/i/HumanMaleBaldCyborg.png","crossOrigin":null,"filters":[]},{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":264.5,"top":56.5,"width":326,"height":326,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.48,"scaleY":0.48,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://kndr.io/ts/swt1/i/BothanWomanCivilian.png","crossOrigin":null,"filters":[]},{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":389,"top":455,"width":524,"height":470,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":0.14,"scaleY":0.14,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://kndr.io/ts/swt1/i/WookieeMaleRoar.png","crossOrigin":null,"filters":[]}],"backgroundImage":{"type":"image","version":"4.2.0","originX":"left","originY":"top","left":0,"top":0,"width":3060,"height":1980,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://1.bp.blogspot.com/-bvU8Hvlw53k/UPmkuLOAjzI/AAAAAAAACIE/vgbunrLNPyc/s1600/star_wars_edge_of_the_empire_JPTargete.jpg","crossOrigin":null,"filters":[]}}';
const mapList = [
    ["Welcome", {url: "https://1.bp.blogspot.com/-bvU8Hvlw53k/UPmkuLOAjzI/AAAAAAAACIE/vgbunrLNPyc/s1600/star_wars_edge_of_the_empire_JPTargete.jpg", scaleX: 1, scaleY: 1}],
    ["Range Bands", {url: "https://triumphdespair.files.wordpress.com/2012/11/range-bands.jpg", scaleX: 0.4, scaleY: 0.35}],
    ["Krayt Fang", {url: "https://s3.amazonaws.com/files.d20.io/images/3475756/Nfgcn3lIJFm3InNj5YLGXQ/original.png", scaleX: 0.5, scaleY: 0.5}],
    ["Formos", {url: "https://starwars-armorer-images.s3.amazonaws.com/backgrounds/FormosMap.jpg", scaleX: 1.5, scaleY: 1.2}],
    ["Daro Warehouse", {url: "https://starwars-armorer-images.s3.amazonaws.com/backgrounds/daro-warehouse.jpg", scaleX: 1.3, scaleY: 1.3}],
];

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
                                onClick={() => console.log(canvasObjects)}
                            >Stringify Canvas</button>
                            <br/>
                            <br/>
                            <button
                                onClick={() => updateCanvasObject("32914896-c627-47b9-903b-730cc2f4b589", scratch)}
                            >Reload Canvas</button>
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
