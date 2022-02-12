import {useState, useMemo, useCallback, MouseEventHandler, useRef} from "react"
import {calcCoordinatesFromMouseEvent, calcCoordinatesWithZoomScale } from "Components/Utilities/UtilMethodsAndTypes"
import {selelctCurrentZoom} from "Feature/ZoomSlice";
import {useAppSelector} from "Store/Hooks";
import {selectCanvasBoundaries} from "Feature/CanvasContextSlice"
import { Coordinates } from "../UtilClasses/Coordinates";
export const useDragableSVGComponent = <T extends SVGElement>(coords : Coordinates) => {
    const [coordinates, setCoordinates] = useState<Coordinates>(coords);
    const initMousePos = useRef<Coordinates>(new Coordinates());
    const initElementPos = useRef<Coordinates>(new Coordinates());
    const useSelector = useAppSelector;
    
    const zoom = useSelector(selelctCurrentZoom)
    const canvasBoundaries = useSelector(state => selectCanvasBoundaries(state));

    const mouseMoveEventHandler = useCallback(
        (e : MouseEvent) => {
            
            const currentMousePos = calcCoordinatesFromMouseEvent(e, canvasBoundaries);
            const scaledMoveVector = calcCoordinatesWithZoomScale(new Coordinates({x: currentMousePos.x - initMousePos.current.x, y: currentMousePos.y - initMousePos.current.y}), zoom);
            
            setCoordinates(new Coordinates({x: initElementPos.current.x + scaledMoveVector.x, y : initElementPos.current.y + scaledMoveVector.y}))
        },[canvasBoundaries, zoom],
    )

    const onMouseDownHandler : MouseEventHandler<T> = (e) => {
            e.preventDefault();
            e.stopPropagation();
            initMousePos.current = calcCoordinatesFromMouseEvent(e, canvasBoundaries);
            initElementPos.current = new Coordinates(coordinates);
            document.addEventListener("mousemove", mouseMoveEventHandler)            
    }

    const onMouseUpHandler : MouseEventHandler<T> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(`TestEnd: ${JSON.stringify(canvasBoundaries)}`)
        initMousePos.current = new Coordinates();
        initElementPos.current = new Coordinates();
        document.removeEventListener("mousemove", mouseMoveEventHandler);   
    }

    const values = useMemo(
        () => ({
            coordinates,
            setCoordinates,
            mouseMoveEventHandler,
            onMouseDownHandler,
            onMouseUpHandler
        }), [coordinates, mouseMoveEventHandler, onMouseDownHandler, onMouseUpHandler]
    )

    return values;
}

