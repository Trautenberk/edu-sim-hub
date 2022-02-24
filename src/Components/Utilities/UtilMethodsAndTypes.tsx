import { Coordinates, ICoordinates } from "./UtilClasses/Coordinates";

export type Visibility = "visible" | "hidden";

export enum Direction {
    Top,
    Right,
    Down,
    Left
}

export const ALL_DIRECTIONS = [Direction.Right, Direction.Left, Direction.Down, Direction.Top];

export function convertToVisibility(value : boolean) : Visibility {
    return value ? "visible" : "hidden";
}

export type Dictionary<T> = {   // TODO zjistit proč nejde použít v custom hooks, z nějakýho důvodu to při Object.values.map tvrdí že item může být udenfined
    [Key: string]: T;
}
export interface Boundaries  {
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


export function  convertMatrixToString (matrix : TransormMatrix) : string {
    return `matrix(${matrix.scaleX}, ${matrix.skewY}, ${matrix.skewX}, ${matrix.scaleY}, ${matrix.translateX}, ${matrix.transalteY})`
}

const directionOffset = 50
export function convertDirectionToOffset (direction : Direction) : ICoordinates {
    switch (direction) {
        case Direction.Right:
            return { x: directionOffset, y: 0 };
        case Direction.Down:
            return { x: 0, y: directionOffset };
        case Direction.Left:
            return { x: -directionOffset, y: 0 };
        case Direction.Top:
            return { x: 0, y : -directionOffset };
    }
}

export function logNotImplemented(name : string) {
    console.error(`Error: method call but not implemented ${name}`)
}
