import { on } from "events";
import {createContext, FunctionComponent, useState} from "react";


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
}

const defaultState : ICanvasContext = {
    selectedElementID: null,
    initPos : {posX : 40, posY : 40},
    canvasBoundaries : {left : 0, top : 0},
    onClick: () => { throw new Error("Method not implemeted!")},
    updateCanvasBoundaries : () => { throw new Error("Method not implemeted!")},
    isSelectedElement: () => { throw new Error("Method not implemeted!")},
}


export const CanvasContext = createContext<ICanvasContext>(defaultState);


export const CanvasContextProvider : FunctionComponent = ({children}) => {

    const [selectedElementID, setSelectedElementID] = useState(defaultState.selectedElementID);
    const [initPos] = useState(defaultState.initPos);

    const [canvasBoundaries, setCanvasBoundaries] = useState(defaultState.canvasBoundaries)

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

    return(
        <CanvasContext.Provider value={{
            selectedElementID,
            initPos,
            canvasBoundaries,
            updateCanvasBoundaries,
            onClick,
            isSelectedElement
        }}>
                {children}
        </CanvasContext.Provider>
    )
}
