import React, {useState, useMemo, useCallback, useRef} from "react"
import {selelctCurrentZoom} from "Feature/ZoomSlice";
import {useAppSelector} from "Store/Hooks";
import {selectCanvasBoundaries} from "Feature/CanvasContextSlice"
import { Coordinates } from "../UtilClasses/Coordinates";


export type DraggableHandlers = {
    onMouseDownDragHandler : (e : React.MouseEvent) => void
    onMouseUpDragHandler : (e : React.MouseEvent) => void
}
export const useDragableSVGComponent = (coords : Coordinates, onMouseDown? : (e : React.MouseEvent) => void, onMouseUp? : (e: React.MouseEvent) => void) => {
    const [coordinates, setCoordinates] = useState<Coordinates>(coords);
    const initMousePos = useRef<Coordinates>(new Coordinates());
    const initElementPos = useRef<Coordinates>(new Coordinates());
    const useSelector = useAppSelector;
    
    const zoom = useSelector(selelctCurrentZoom)
    const canvasBoundaries = useSelector(state => selectCanvasBoundaries(state));

    const mouseMoveEventHandler = useCallback(
        (e : MouseEvent) => {
            const scaledMoveVector = new Coordinates({x: e.pageX, y: e.pageY}); // souřadnice eventu v celem viewportu
            scaledMoveVector.sub({x: canvasBoundaries.left, y: canvasBoundaries.top}); // je potřeba odečíst okraje canvas divu
            scaledMoveVector.sub(initMousePos.current); // odečíst původní souřadnice
            scaledMoveVector.scale(1/zoom); // vyškálování vektoru současným přiblížením
            
            const newElementCoords = new Coordinates(initElementPos.current); // původní souřadnice
            newElementCoords.add(scaledMoveVector); // přičtení vektoru o který se má element posunout
            setCoordinates(newElementCoords)
        },[canvasBoundaries, zoom],
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onMouseDownHandler = (e : React.MouseEvent) => {
            e.stopPropagation();
            if (onMouseDown) {
                onMouseDown(e)
            }

            (initMousePos.current = new Coordinates({x: e.clientX, y: e.clientY})).sub({x: canvasBoundaries.left, y: canvasBoundaries.top});  // pozice odkud se za4alo táhnout
            initElementPos.current = new Coordinates(coordinates); // původní pozice elementu
            document.addEventListener("mousemove", mouseMoveEventHandler)            
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onMouseUpHandler = (e : React.MouseEvent) => {
        e.stopPropagation();
        if (onMouseUp) {
            onMouseUp(e);
        }
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

