import {useState, useMemo, useCallback, MouseEventHandler, useRef} from "react"
import { Coordinates, Boundaries } from "../../../Store/Editor/Canvas/CanvasContext";


export const useDragableSVGCompoennt = <T extends SVGElement>() => {

    const [coordinates, setCoordinates] = useState<Coordinates>({posX : 0, posY: 0});
    const canvasBoundaries  = useRef<Boundaries>({left: 0, top: 0}) 


    const mouseMoveEventHandler = useCallback(
        (e : MouseEvent) => {
            console.log(`Mouse coords: x: ${e.clientX}  y: ${e.clientY}`)
            console.log(`Canvas borders : left: ${canvasBoundaries.current.left}  top: ${canvasBoundaries.current.top}`)
            console.log(`Computed coords: x: ${e.clientX - canvasBoundaries.current.left}  y:${e.clientY - canvasBoundaries.current.top}`)
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
            coordinates,
            setCoordinates,
            canvasBoundaries,
            mouseMoveEventHandler,
            onMouseDownHandler,
            onMouseUpHandler
        }), [coordinates, canvasBoundaries, mouseMoveEventHandler, onMouseDownHandler, onMouseUpHandler]
    )

    return values;
}

