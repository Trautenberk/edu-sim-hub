import {useState, useMemo, useCallback, MouseEventHandler, useRef, useContext} from "react"
import { Coordinates, Boundaries, CanvasContext } from "../../../Store/Editor/Canvas/CanvasContext";


export const useDragableSVGCompoennt = <T extends SVGElement>(setCoordinates : React.Dispatch<React.SetStateAction<Coordinates>>) => {

    const context = useContext(CanvasContext);
    const canvasBoundaries  = useRef<Boundaries>({left: 0, top: 0}) 

    const mouseMoveEventHandler = useCallback(
        (e : MouseEvent) => {
            setCoordinates({posX : e.clientX - context.canvasBoundaries.left, posY : e.clientY - context.canvasBoundaries.top})
        },[],
    )

    const onMouseDownHandler : MouseEventHandler<T> = (e) => {
        document.addEventListener("mousemove", mouseMoveEventHandler)
    }

    const onMouseUpHandler : MouseEventHandler<T> = (e) => {
        document.removeEventListener("mousemove", mouseMoveEventHandler);   
    }

    const values = useMemo(
        () => ({
            mouseMoveEventHandler,
            onMouseDownHandler,
            onMouseUpHandler
        }), [mouseMoveEventHandler, onMouseDownHandler, onMouseUpHandler]
    )

    return values;
}

