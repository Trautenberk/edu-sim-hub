import React from "react";

export type Visibility = "visible" | "hidden";

export function convertToVisibility(value : boolean) : Visibility {
    return value ? "visible" : "hidden";
}
export type Coordinates = {
    posX : number,
    posY : number
}
export type Boundaries = {
    left : number,
    top : number
}

export type TransormMatrix = {
    scaleX : number,
    skewY : number,
    skewX : number,
    scaleY : number,
    translateX : number,
    transalteY : number
}

export type PointBriefDesc = {
    id : string,
    coords : Coordinates
}

export function  convertMatrixToString (matrix : TransormMatrix) : string {
    return `matrix(${matrix.scaleX}, ${matrix.skewY}, ${matrix.skewX}, ${matrix.scaleY}, ${matrix.translateX}, ${matrix.transalteY})`
}

export const calcCoordinates = (coords : Coordinates, boundaries: Boundaries) : Coordinates => {
    return {posX : coords.posX - boundaries.left, posY : coords.posY - boundaries.top}
}


export function calcCoordinatesFromMouseEvent (evt : React.MouseEvent, boundaries : Boundaries) : Coordinates;
export function calcCoordinatesFromMouseEvent (evt : MouseEvent , boundaries : Boundaries) : Coordinates;

export function calcCoordinatesFromMouseEvent (evt : any, boundaries : Boundaries) {    
    return calcCoordinates({posX: evt.pageX, posY: evt.pageY}, boundaries);
}