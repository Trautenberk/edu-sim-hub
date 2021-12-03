import {createContext, FC, FunctionComponent, MouseEventHandler, ReactElement, useCallback, useEffect, useRef, useState} from "react";
import uniqid from "uniqid";
import { ConnectionPoint, pointClickedEventName ,pointClickedEventDetails, pointMovedEventName, pointMovedEventDetails } from "../../../Components/Editor/CustomHooks/useConnectionPoint";

export type Coordinates = {
    posX : number,
    posY : number
}


const INIT_POS_OFFSET_X = 50;
const INIT_POS_OFFSET_Y = 50

export type Boundaries = {
    left : number,
    top : number
}

export type Connection = {
    connectionID : string,
    points : ConnectionPoint[]
}

interface ICanvasContext {
    initPos : Coordinates ;
    updateInitPos : (position : Coordinates) => void,
    canvasBoundaries : Boundaries,
    onGridClick : (clickCoords : Coordinates) => void, 
    onElementClick : (id : string) => void,
    updateCanvasBoundaries : (boundaries : Boundaries) => void,
    isSelectedElement : (id : string | null) => boolean,
    isSelectedEndPoint : (id : string | null) => boolean,
    getVisibility : (id : string) => string,
    registerEndPoint : (point : ConnectionPoint) => void,
    connections : Connection[],
    drawLineVisibility : "hidden" | "visible",
    drawLineCoords : {start : Coordinates, end : Coordinates},
}

const defaultState : ICanvasContext = {
    initPos : {posX : 0, posY : 0},
    updateInitPos : () => { throw new Error("Method not implemeted!")}, 
    canvasBoundaries : {left : 0, top : 0},
    onGridClick: () => { throw new Error("Method not implemeted!")},
    onElementClick: () => { throw new Error("Method not implemeted!")},
    updateCanvasBoundaries : () => { throw new Error("Method not implemeted!")},
    isSelectedElement: () => { throw new Error("Method not implemeted!")},
    isSelectedEndPoint: () => { throw new Error("Method not implemeted!")},
    getVisibility: () => {throw new Error("Method not implemeted!")},
    registerEndPoint : () => {throw new Error("Method not implemeted!")},
    connections : [],
    drawLineVisibility : "hidden",
    drawLineCoords: {end : {posX : 0, posY: 0}, start: {posX: 0, posY: 0}}
}

enum CanvasState {
    normal,
    connecting,
}



export const CanvasContext = createContext<ICanvasContext>(defaultState);



export const CanvasContextProvider : FC = ({children}) => {

    const [selectedElementID, setSelectedElementID] = useState<string | null>(null);
    const [selectedEndPointID, setSelectedEndpointID] = useState<string | null>(null);
    const [initPos, setInitPos] = useState(defaultState.initPos);
    const [canvasState, setCanvasState] = useState<CanvasState>(CanvasState.normal);
    const [canvasBoundaries, setCanvasBoundaries] = useState(defaultState.canvasBoundaries);
    const endPointsCollection = useRef<ConnectionPoint[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);
    const newConnectionID = useRef<string>("");
    const mouseCoords = useRef<Coordinates>({posX : 0, posY : 0});
    const [drawLineVisibility, setDrawLineVisibility] = useState<"hidden" | "visible">(defaultState.drawLineVisibility);
    const [drawLineCoords, setDrawLineCoords] = useState(defaultState.drawLineCoords)


    const updateInitPos = (position : Coordinates ) => {
        setInitPos(position);
    }

    const updateCanvasBoundaries =  (boundaries :  {left : number, top : number}) => {
        setCanvasBoundaries(boundaries);
        setInitPos({posX: boundaries.left + INIT_POS_OFFSET_X , posY : boundaries.top +  INIT_POS_OFFSET_Y })
    }

    const clearSelection = () => {
        setSelectedElementID(null);
        setSelectedEndpointID(null);
    }

    const isSelectedElement = (id : string | null) : boolean => {
        return id === selectedElementID;
    }

    const isSelectedEndPoint = (id : string | null) : boolean => {
        return id === selectedEndPointID;
    }

    const onElementClick = (id : string) : void => {

        if(canvasState == CanvasState.normal){
            if(isSelectedElement(id)){
                clearSelection()
            }else{
                setSelectedElementID(id);
            }
        }
    }

    const onGridClick = (clickCoords : Coordinates) : void  => {
        console.log("GridClick");
        if(canvasState == CanvasState.normal){
            console.log("Grid click clear selection")
            clearSelection()
        }
        else if(canvasState == CanvasState.connecting){
            console.log("GridClick add point");
            const nextConnectionPoint : ConnectionPoint = {pointID : uniqid(), coords: clickCoords}
            setConnections(prev => (
                    prev.map(value => (value.connectionID == newConnectionID.current ? {connectionID : value.connectionID, points: [...value.points, nextConnectionPoint] } : value ))
                )
            )
        }
    }


    const getVisibility = (id : string) : string => {
        return isSelectedElement(id) ? "visible" : "hidden";
    }

    const registerEndPoint = (point : ConnectionPoint) : void => {
        endPointsCollection.current.push(point);
        console.log(`Point ${point.pointID} registered!!`);
    }

    const unregisterEndPoint = (pointID: string) : void => {
        const collection = endPointsCollection.current  ?? null
        if(collection == null){
            console.log("Error : collection is not defined");
            return;
        }
        
        const indexToBeRemoved = collection.findIndex(value => (value.pointID == pointID))
    
        if(indexToBeRemoved > -1 ){
            endPointsCollection.current.splice(indexToBeRemoved, 1);
        }
        else {
            console.log(`Error : could not unregister ConnectionPoint, element with id: ${pointID} was not present in the collection`);
        }
    }

    const pointClickedHandler = useCallback((evt : Event) : void => {
        if ( evt instanceof CustomEvent ){
            const eventDetails = evt.detail as pointClickedEventDetails;
            if(eventDetails == null){
                throw new Error("Error : wrong detail type in pointClickedHandler")
            }
            setSelectedEndpointID(eventDetails.pointID);
            if(canvasState == CanvasState.normal){

                
                const beginPoint : ConnectionPoint = {pointID : eventDetails.pointID, coords : eventDetails.coordinates} 
                newConnectionID.current = uniqid();
                const newConnection : Connection = {connectionID : newConnectionID.current, points: [beginPoint]};
                setConnections((prev) => {
                    return [...prev, newConnection]
                })
                setCanvasState(CanvasState.connecting);
            }
            
            console.log(`Jupiiii kliknutej point: ${eventDetails.pointID}`);

        }
        else {
            throw new Error("Error : wrong evet type in pointClickedHandler")
        }
    }, [])


    const mouseMoveEventHandler = useCallback(
        (e : MouseEvent) => {
            // console.log(` Souradnice noveho bodu: ${e.clientX - canvasBoundaries.left,  e.clientY - canvasBoundaries.top}`)
            mouseCoords.current = {posX : e.clientX - canvasBoundaries.left, posY: e.clientY - canvasBoundaries.top}
        },[],
    )

    useEffect(() => {
        document.addEventListener(pointClickedEventName, pointClickedHandler);
        document.addEventListener("mousemove",mouseMoveEventHandler);
    }, [])

    return(
        <CanvasContext.Provider value={{
            initPos,
            updateInitPos,
            canvasBoundaries,
            updateCanvasBoundaries,
            onGridClick,
            onElementClick,
            isSelectedElement,
            isSelectedEndPoint,
            getVisibility,
            registerEndPoint,
            connections, 
            drawLineCoords,
            drawLineVisibility
        }}>
                {children}
        </CanvasContext.Provider>
    )
}


