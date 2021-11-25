import {useState, useMemo, useCallback, MouseEventHandler, useRef} from "react"
import { Coordinates, Boundaries } from "../../../Store/Editor/Canvas/CanvasContext";


export const useDragableSVGCompoennt = <T extends SVGElement>(setCoordinates : React.Dispatch<React.SetStateAction<Coordinates>>) => {

    const canvasBoundaries  = useRef<Boundaries>({left: 0, top: 0}) 

    const mouseMoveEventHandler = useCallback(
        (e : MouseEvent) => {
            setCoordinates({posX : e.clientX - canvasBoundaries.current.left, posY : e.clientY - canvasBoundaries.current.top})
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
            canvasBoundaries,
            mouseMoveEventHandler,
            onMouseDownHandler,
            onMouseUpHandler
        }), [canvasBoundaries, mouseMoveEventHandler, onMouseDownHandler, onMouseUpHandler]
    )

    return values;
}

