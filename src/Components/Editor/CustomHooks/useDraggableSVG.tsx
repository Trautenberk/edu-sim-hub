import { verify } from "crypto";
import {useState, useMemo, useCallback, MouseEventHandler, useRef, useContext} from "react"
import { Coordinates, Boundaries, CanvasContext } from "../../../Store/Editor/Canvas/CanvasContext";
import {calcCoordinatesFromMouseEvent} from "../../../Utils"

export const useDragableSVGCompoennt = <T extends SVGElement>() => {

    const context = useContext(CanvasContext);
    const [coordinates, setCoordinates] = useState<Coordinates>({posX: 0, posY: 0});
    const initMousePos = useRef<Coordinates>({posX: 0, posY: 0});
    const initElementPos = useRef<Coordinates>({posX: 0, posY: 0});


    const mouseMoveEventHandler = useCallback(
        (e : MouseEvent) => {
            const currentMousePos = calcCoordinatesFromMouseEvent(e, context.canvasBoundaries);
            const moveVector = {posX: currentMousePos.posX - initMousePos.current.posX, posY: currentMousePos.posY - initMousePos.current.posY }

            setCoordinates({posX: initElementPos.current.posX + (moveVector.posX / context.currentZoom), posY : initElementPos.current.posY + (moveVector.posY / context.currentZoom)})
        },[context.canvasBoundaries, context.currentZoom],
    )

    const onMouseDownHandler : MouseEventHandler<T> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        initMousePos.current = calcCoordinatesFromMouseEvent(e as any as MouseEvent, context.canvasBoundaries);
        initElementPos.current = {posX : coordinates.posX, posY : coordinates.posY};
        document.addEventListener("mousemove", mouseMoveEventHandler)
    }

    const onMouseUpHandler : MouseEventHandler<T> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(`TestEnd: ${JSON.stringify(context.canvasBoundaries)}`)
        initMousePos.current = {posX: 0, posY: 0};
        initElementPos.current = {posX: 0, posY: 0}
        document.removeEventListener("mousemove", mouseMoveEventHandler);   
    }

    const values = useMemo(
        () => ({
            context,
            coordinates,
            setCoordinates,
            mouseMoveEventHandler,
            onMouseDownHandler,
            onMouseUpHandler
        }), [mouseMoveEventHandler, onMouseDownHandler, onMouseUpHandler]
    )

    return values;
}

