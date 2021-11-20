import {createContext, FunctionComponent, useState} from "react";

interface ICanvasContext {
    selectedElementID : string | undefined;
    initXPos : number,
    initYPos : number,
    svgLeftBoundary : number,
    svgTopBoundary : number,    
    onClick : (id : string) => void,
}

const defaultState : ICanvasContext = {
    selectedElementID: undefined,
    initXPos: 40,
    initYPos: 40,
    svgLeftBoundary : 0,
    svgTopBoundary: 0,
    onClick: () => { throw new Error("Method not implemeted!")},
}


export const CanvasContext = createContext<ICanvasContext>(defaultState);


export const CanvasContextProvider : FunctionComponent = ({children}) => {

    const [selectedElementID, setSelectedElementID] = useState(defaultState.selectedElementID);
    const [initXPos, setInitXPos] = useState(defaultState.initXPos);
    const [initYPos, setInitYPos] = useState(defaultState.initYPos);

    const svgLeftBoundary =  defaultState.svgLeftBoundary;
    const svgTopBoundary = defaultState.svgTopBoundary;

    const onClick : (id : string) => void = (id) => {
        console.log("Clicked component ID: " + id);
        setSelectedElementID(id);
    }

    return(
        <CanvasContext.Provider value={{
            selectedElementID,
            initXPos,
            initYPos,
            svgLeftBoundary,
            svgTopBoundary,
            onClick,
        }}>
                {children}
        </CanvasContext.Provider>
    )
}
