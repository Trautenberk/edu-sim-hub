import React from "react";
import { Coordinates } from "./UtilClasses/Coordinates";

export type Visibility = "visible" | "hidden";

export enum Direction {
    Top,
    Right,
    Down,
    Left
}

export function convertToVisibility(value : boolean) : Visibility {
    return value ? "visible" : "hidden";
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
    return new Coordinates({x : coords.x - boundaries.left, y : coords.y - boundaries.top})
}

export function calcCoordinatesFromMouseEvent (evt : MouseEvent | React.MouseEvent, boundaries : Boundaries) : Coordinates;
export function calcCoordinatesFromMouseEvent (evt : MouseEvent | React.MouseEvent, boundaries : Boundaries, zoomScale : number) : Coordinates;
export function calcCoordinatesFromMouseEvent (evt : any, boundaries : Boundaries, zoomScale? : number) {
    if(zoomScale != null){
        return calcCoordinatesWithZoomScale(calcCoordinatesFromMouseEvent(evt, boundaries), zoomScale);
    }    
    return calcCoordinates(new Coordinates({x: evt.pageX, y: evt.pageY}), boundaries);
}

export function calcCoordinatesWithZoomScale (coords : Coordinates, zoomScale : number) : Coordinates {
    return new Coordinates({x: coords.x / zoomScale, y :  coords.y / zoomScale})
}