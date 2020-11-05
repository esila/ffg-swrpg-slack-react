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
import GMVisualsModal from "./GMVisualsModal";

function Visuals({ gmVisualsModalOpen, handleOpenGMVisualsModal, handleCloseGMVisualsModal }) {
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



    return canvasObjects ? (
        <div style={{height: "750px", overflow: "auto"}}>
            {user === "esila" &&
            <>
                <GMVisualsModal
                    open={gmVisualsModalOpen}
                    handleClose={handleCloseGMVisualsModal}
                    updateCanvasObject={updateCanvasObject}
                    canvasObjects={canvasObjects}
                    canvasId={canvasId}
                    token={token}
                    setToken={setToken}
                    activeToken={activeToken}
                />
            </>
            }
            <canvas ref={canvasEl} id="my-fabric-canvas" width="1920" height="1080" />
        </div>
    ):
        <div></div>
}

export default Visuals