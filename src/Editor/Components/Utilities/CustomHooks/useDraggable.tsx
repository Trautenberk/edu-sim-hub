import React, {useMemo, useCallback, useRef, useState} from "react"
import {selelctCurrentZoom} from "Editor/Feature/ZoomSlice";
import {useAppSelector} from "Editor/Store/Hooks";
import {selectCanvasBoundaries} from "Editor/Feature/CanvasContextSlice"
import { Coordinates, ICoordinates } from "../../../Model/UtilClasses/Coordinates";


export type DraggableHandlers = {
    onMouseDownDragHandler : (e : React.MouseEvent) => void
    onMouseUpDragHandler : (e : React.MouseEvent) => void
}

type useDraggableParams = {
    initialCoordinates: ICoordinates
    onCoordsChange? : (newCoords : Coordinates) => void
    onMouseDown? :(e: React.MouseEvent) => void
    onMouseUp? : (e: React.MouseEvent) => void
}

/**
 * React custom hook přidávají komponentě prostředky, aby s ní mohlo být pomocí myši pohybováno v hlavní ploše
 * @param params Parametry ovlivňující výsledné prostředky
 * @returns Handlery a další proměnné poskytující funkčnost drag 
 */
export const useDragable = (params : useDraggableParams) => {
    // Souřadnice
    const [coordinates, setCoordinates] = useState<ICoordinates>(params.initialCoordinates);   
    // Odkud se začalo táhnout myší
    const initMousePos = useRef<Coordinates>(new Coordinates({x: 0, y: 0}));
    // Původní pozice elementu
    const initElementPos = useRef<Coordinates>(new Coordinates({x: 0, y: 0}));
    const useSelector = useAppSelector;
    
    // Současná hondnota zvětšení
    const zoom = useSelector(selelctCurrentZoom)
    // Hranice elementu plochy
    const canvasBoundaries = useSelector(state => selectCanvasBoundaries(state));

    const mouseMoveEventHandler = useCallback(
        (e : MouseEvent) : void => {
            const scaledMoveVector = new Coordinates({x: e.pageX, y: e.pageY}); // souřadnice eventu v celem viewportu
            scaledMoveVector.sub({x: canvasBoundaries.left, y: canvasBoundaries.top}); // je potřeba odečíst okraje canvas divu
            scaledMoveVector.sub(initMousePos.current); // odečíst původní souřadnice
            scaledMoveVector.scale(1/zoom); // vyškálování vektoru současným přiblížením
            
            const newElementCoords = new Coordinates(initElementPos.current); // původní souřadnice
            newElementCoords.add(scaledMoveVector); // přičtení vektoru o který se má element posunout
            
            if (params.onCoordsChange) {
                params.onCoordsChange(newElementCoords);
            }

            setCoordinates(newElementCoords);
        },[canvasBoundaries.left, canvasBoundaries.top, params.onCoordsChange, zoom],
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onMouseDownHandler = (e : React.MouseEvent) => {
            e.stopPropagation();
            if (params.onMouseDown) {
                params.onMouseDown(e)
            }

            (initMousePos.current = new Coordinates({x: e.clientX, y: e.clientY})).sub({x: canvasBoundaries.left, y: canvasBoundaries.top});  // pozice odkud se za4alo táhnout
            initElementPos.current = new Coordinates(coordinates); // původní pozice elementu
            document.addEventListener("mousemove", mouseMoveEventHandler)            
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onMouseUpHandler = (e : React.MouseEvent) => {
        e.stopPropagation();
        if (params.onMouseUp) {
            params.onMouseUp(e);
        }
        initMousePos.current = new Coordinates({ x: 0, y: 0 });  
        initElementPos.current = new Coordinates({ x: 0, y: 0});
        document.removeEventListener("mousemove", mouseMoveEventHandler);   
    }

    const values = useMemo(
        () => ({
            coordinates,
            onMouseDownHandler,
            onMouseUpHandler
        }), [mouseMoveEventHandler, onMouseDownHandler, onMouseUpHandler]
    )

    return values;
}