import {createContext, FunctionComponent, useCallback, useEffect, useRef, useState} from "react";
import { ConnectionPoint, pointClickedEventName ,pointClickedEventDetails, pointMovedEventName, pointMovedEventDetails } from "../../../Components/Editor/CustomHooks/useConnectionPoint";

export type Coordinates = {
    posX : number,
    posY : number
}

export type Boundaries = {
    left : number,
    top : number
}

interface ICanvasContext {
    selectedElementID : string | null;
    initPos : Coordinates ;
    canvasBoundaries : Boundaries,
    onClick : (id : string | null) => void,
    updateCanvasBoundaries : (boundaries : Boundaries) => void,
    isSelectedElement : (id : string | null) => boolean,
    getVisibility : (id : string) => string,
    registerPoint : (point : ConnectionPoint) => void,
}

const defaultState : ICanvasContext = {
    selectedElementID: null,
    initPos : {posX : 40, posY : 40},
    canvasBoundaries : {left : 0, top : 0},
    onClick: () => { throw new Error("Method not implemeted!")},
    updateCanvasBoundaries : () => { throw new Error("Method not implemeted!")},
    isSelectedElement: () => { throw new Error("Method not implemeted!")},
    getVisibility: () => {throw new Error("Method not implemeted!")},
    registerPoint : () => {throw new Error("Method not implemeted!")},
}

enum CanvasState {
    normal,
    connecting,
}



export const CanvasContext = createContext<ICanvasContext>(defaultState);


export const CanvasContextProvider : FunctionComponent = ({children}) => {

    const [selectedElementID, setSelectedElementID] = useState(defaultState.selectedElementID);
    const [initPos] = useState(defaultState.initPos);
    const [canvasState, setCanvasState] = useState<CanvasState>(CanvasState.normal);
    const [canvasBoundaries, setCanvasBoundaries] = useState(defaultState.canvasBoundaries)

    const canvasPointsCollection = useRef<ConnectionPoint[]>([])

    const updateCanvasBoundaries =  (boundaries :  {left : number, top : number}) => {
        setCanvasBoundaries(boundaries);
    }

    const onClick = (id : string | null) : void => {
        if(id == null && selectedElementID == null){
            return;
        }
        if(isSelectedElement(id)){
            setSelectedElementID(null);
        }else{
            setSelectedElementID(id);
        }
    }

    const isSelectedElement = (id : string | null) : boolean => {
        return id === selectedElementID;
    }

    const getVisibility = (id : string) : string => {
        return isSelectedElement(id) ? "visible" : "hidden";
    }

    const registerPoint = (point : ConnectionPoint) : void => {
        canvasPointsCollection.current.push(point);
    }

    const unregisterPoint = (pointID: string) : void => {
        const collection = canvasPointsCollection.current  ?? null
        if(collection == null){
            console.log("Error : collection is not defined");
            return;
        }
        
        const indexToBeRemoved = collection.findIndex(value => (value.pointID == pointID))
    
        if(indexToBeRemoved > -1 ){
            canvasPointsCollection.current.splice(indexToBeRemoved, 1);
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
            
            console.log(`Jupiiii kliknutej point: ${eventDetails.pointID}`);

        }
        else {
            throw new Error("Error : wrong evet type in pointClickedHandler")
        }
    }, [])

    const pointMovedHandler =  useCallback((evt : Event) : void => {
        if ( evt instanceof CustomEvent ){
            const eventDetails = evt.detail as pointMovedEventDetails;
            if(eventDetails == null){
                throw new Error("Error : wrong detail type in pointMovedHandler")
            }
            
            console.log(`Jupiiii posunutej point: ${eventDetails.pointID} a souraddnice: ${eventDetails.coords.posX}, ${eventDetails.coords.posY}`);
        }
        else {
            throw new Error("Error : wrong evet type in pointClickedHandler")
        }
    }, [])


    useEffect(() => {
        console.log("UseEffect z kontextu");
        document.addEventListener(pointClickedEventName, pointClickedHandler);
        document.addEventListener(pointMovedEventName, pointMovedHandler);
    }, [])

    return(
        <CanvasContext.Provider value={{
            selectedElementID,
            initPos,
            canvasBoundaries,
            updateCanvasBoundaries,
            onClick,
            isSelectedElement,
            getVisibility,
            registerPoint,
        }}>
                {children}
        </CanvasContext.Provider>
    )
}

