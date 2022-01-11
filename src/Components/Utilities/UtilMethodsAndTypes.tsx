export type Visibility = "visible" | "hidden";

export function convertToVisibility(value : boolean) : Visibility {
    return value ? "visible" : "hidden";
}

export type TransormMatrix = {
    scaleX : number,
    skewY : number,
    skewX : number,
    scaleY : number,
    translateX : number,
    transalteY : number
}

export function  convertMatrixToString (matrix : TransormMatrix) : string {
    return `matrix(${matrix.scaleX}, ${matrix.skewY}, ${matrix.skewX}, ${matrix.scaleY}, ${matrix.translateX}, ${matrix.transalteY})`
}