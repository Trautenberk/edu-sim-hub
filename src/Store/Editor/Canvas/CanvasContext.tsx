import {createContext, FunctionComponent, useState} from "react";



interface ICanvasContext {
    selectedElementID : string | undefined;
    initXPos : number,
    initYPos : number,    
    onClick : (id : string) => void;
}

const defaultState : ICanvasContext = {
    selectedElementID : undefined,
    initXPos : 30,
    initYPos : 30,
    onClick: () => {}
}


export const CanvasContext = createContext<ICanvasContext>(defaultState);


export const CanvasContextProvider : FunctionComponent = ({children}) => {

    const [selectedElementID, setSelectedElementID] = useState(defaultState.selectedElementID);
    const [initXPos, setInitXPos] = useState(defaultState.initXPos);
    const [initYPos, setInitYPos] = useState(defaultState.initYPos);
    
    const onClick : (id : string) => void = (id) => {
        console.log("Clicked component ID: " + id);
        setSelectedElementID(id);
    }

    return(
        <CanvasContext.Provider value={{
            selectedElementID,
            initXPos,
            initYPos,
            onClick
            }}>

        </CanvasContext.Provider>
    )
}
