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
            console.log(`test: ${JSON.stringify(context.canvasBoundaries)}`)
            const currentMousePos = calcCoordinatesFromMouseEvent(e, context.canvasBoundaries);
            const moveVector = {posX: currentMousePos.posX - initMousePos.current.posX, posY: currentMousePos.posY - initMousePos.current.posY }

            setCoordinates((prev) => {
                const test = {posX: initElementPos.current.posX + moveVector.posX, posY : initElementPos.current.posY + moveVector.posY}
                // console.log(`Init : ${JSON.stringify(initMousePos)}  current: ${JSON.stringify(currentMousePos)} `)
                // console.log(`vector: ${JSON.stringify(moveVector)}  test: ${JSON.stringify(test)}`)
                return test;
            })

            // setCoordinates({posX: coords.posX - initMousePos.current.posX, posY: coords.posY - initMousePos.current.posY });
        },[context.canvasBoundaries],
    )

    const onMouseDownHandler : MouseEventHandler<T> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(`TestStart: ${JSON.stringify(context.canvasBoundaries)}`)
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

