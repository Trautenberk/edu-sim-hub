import {useState, useMemo, useCallback, MouseEventHandler, useRef} from "react"
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
            const scaledMoveVector = new Coordinates({x: e.clientX, y: e.clientY}); // souřadnice eventu v celem viewportu
            scaledMoveVector.sub({x: canvasBoundaries.left, y: canvasBoundaries.top}); // je potřeba odečíst okraje canvas divu
            scaledMoveVector.sub(initMousePos.current); // odečíst původní souřadnice
            scaledMoveVector.scale(zoom); // vyškálování vektoru současným přiblížením
            
            const newElementCoords = new Coordinates(initElementPos.current); // původní souřadnice
            newElementCoords.add(scaledMoveVector); // přičtení vektoru o který se má element posunout
            setCoordinates(newElementCoords)
        },[canvasBoundaries, zoom],
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onMouseDownHandler : MouseEventHandler<T> = (e) => {
            e.stopPropagation();
            (initMousePos.current = new Coordinates({x: e.clientX, y: e.clientY})).sub({x: canvasBoundaries.left, y: canvasBoundaries.top});  // pozice odkud se za4alo táhnout
            initElementPos.current = new Coordinates(coordinates); // původní pozice elementu
            document.addEventListener("mousemove", mouseMoveEventHandler)            
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onMouseUpHandler : MouseEventHandler<T> = (e) => {
        e.stopPropagation();
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

