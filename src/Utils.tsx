import { Boundaries, Coordinates } from "./Store/Editor/Canvas/CanvasContext";


export const calcCoordinates = (coords : Coordinates, boundaries: Boundaries) : Coordinates => {
    return {posX : coords.posX - boundaries.left, posY : coords.posY - boundaries.top}
}

export const calcCoordinatesFromMouseEvent =  (evt : MouseEvent, boundaries : Boundaries) : Coordinates => {
    return calcCoordinates({posX: evt.pageX, posY: evt.pageY}, boundaries);
}