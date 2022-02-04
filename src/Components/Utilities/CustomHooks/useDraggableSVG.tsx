import {useState, useMemo, useCallback, MouseEventHandler, useRef} from "react"
import {calcCoordinatesFromMouseEvent, calcCoordinatesWithZoomScale, Coordinates } from "Components/Utilities/UtilMethodsAndTypes"
import {selelctCurrentZoom} from "Feature/ZoomSlice";
import {useAppSelector} from "Store/Hooks";
import {selectCanvasBoundaries} from "Feature/CanvasContextSlice"
export const useDragableSVGCompoennt = <T extends SVGElement>() => {
    const [coordinates, setCoordinates] = useState<Coordinates>({posX: 0, posY: 0});
    const initMousePos = useRef<Coordinates>({posX: 0, posY: 0});
    const initElementPos = useRef<Coordinates>({posX: 0, posY: 0});
    const useSelector = useAppSelector;
    
    const zoom = useSelector(selelctCurrentZoom)
    const canvasBoundaries = useSelector(state => selectCanvasBoundaries(state));

    const mouseMoveEventHandler = useCallback(
        (e : MouseEvent) => {
            const currentMousePos = calcCoordinatesFromMouseEvent(e, canvasBoundaries);
            const scaledMoveVector = calcCoordinatesWithZoomScale({posX: currentMousePos.posX - initMousePos.current.posX, posY: currentMousePos.posY - initMousePos.current.posY}, zoom);
            
            setCoordinates({posX: initElementPos.current.posX + scaledMoveVector.posX, posY : initElementPos.current.posY + scaledMoveVector.posY})
        },[canvasBoundaries, zoom],
    )

    const onMouseDownHandler : MouseEventHandler<T> = (e) => {
            e.preventDefault();
            e.stopPropagation();
            initMousePos.current = calcCoordinatesFromMouseEvent(e, canvasBoundaries);
            initElementPos.current = {posX : coordinates.posX, posY : coordinates.posY};
            document.addEventListener("mousemove", mouseMoveEventHandler)            
    }

    const onMouseUpHandler : MouseEventHandler<T> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(`TestEnd: ${JSON.stringify(canvasBoundaries)}`)
        initMousePos.current = {posX: 0, posY: 0};
        initElementPos.current = {posX: 0, posY: 0}
        document.removeEventListener("mousemove", mouseMoveEventHandler);   
    }

    const values = useMemo(
        () => ({
            coordinates,
            setCoordinates,
            mouseMoveEventHandler,
            onMouseDownHandler,
            onMouseUpHandler
        }), [mouseMoveEventHandler, onMouseDownHandler, onMouseUpHandler]
    )

    return values;
}

