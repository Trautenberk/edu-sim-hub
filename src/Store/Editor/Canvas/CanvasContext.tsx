import { Boundaries, Coordinates } from "Components/Utilities/UtilMethodsAndTypes";
import {createContext, FC, useCallback, useEffect, useRef, useState} from "react";
import uniqid from "uniqid";
import { ConnectionPoint, pointClickedEventName ,pointClickedEventDetails } from "../../../Components/Editor/CustomHooks/useConnectionPoint";



export type Connection = {
    connectionID : string,
    points : ConnectionPoint[]
}

interface ICanvasContext {
    isSelectedEndPoint : (id : string | null) => boolean,
    registerEndPoint : (point : ConnectionPoint) => void,
    connections : Connection[],
    drawLineVisibility : "hidden" | "visible",
    drawLineCoords : {start : Coordinates, end : Coordinates},
}

const defaultState : ICanvasContext = {
    isSelectedEndPoint: () => { throw new Error("Method not implemeted!")},
    registerEndPoint : () => {throw new Error("Method not implemeted!")},
    connections : [],
    drawLineVisibility : "hidden",
    drawLineCoords: {end : {posX : 0, posY: 0}, start: {posX: 0, posY: 0}},
}

enum CanvasState {
    normal,
    connecting,
}



export const CanvasContext = createContext<ICanvasContext>(defaultState);



export const CanvasContextProvider : FC = ({children}) => {
    const [selectedEndPointID, setSelectedEndpointID] = useState<string | null>(null);
    const [canvasState, setCanvasState] = useState<CanvasState>(CanvasState.normal);
    const endPointsCollection = useRef<ConnectionPoint[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);
    const newConnectionID = useRef<string>("");
    const mouseCoords = useRef<Coordinates>({posX : 0, posY : 0});
    const [drawLineVisibility, setDrawLineVisibility] = useState<"hidden" | "visible">(defaultState.drawLineVisibility);
    const [drawLineCoords, setDrawLineCoords] = useState(defaultState.drawLineCoords)


    const isSelectedEndPoint = (id : string | null) : boolean => {
        return id === selectedEndPointID;
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

    // TODO - nevim proč to tu je
    // const mouseMoveEventHandler = useCallback(
    //     (e : MouseEvent) => {
    //         // console.log(` Souradnice noveho bodu: ${e.clientX - canvasBoundaries.left,  e.clientY - canvasBoundaries.top}`)
    //         mouseCoords.current = {posX : e.clientX - canvasBoundaries.left, posY: e.clientY - canvasBoundaries.top}
    //     },[],
    // )

    useEffect(() => {
        document.addEventListener(pointClickedEventName, pointClickedHandler);
        // document.addEventListener("mousemove",mouseMoveEventHandler); // TODO - taky nevim proč to tu je v tuto chvíli
    }, [])

    return(
        <CanvasContext.Provider value={{
            isSelectedEndPoint,
            registerEndPoint,
            connections, 
            drawLineCoords,
            drawLineVisibility,
        }}>
                {children}
        </CanvasContext.Provider>
    )
}


