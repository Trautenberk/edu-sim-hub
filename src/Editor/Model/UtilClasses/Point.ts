import { Direction } from "Editor/Components/Utilities/UtilMethodsAndTypes";
import { Coordinates, ICoordinates, isCoordinates, IToSerializable } from "./Coordinates";

export interface IPoint {
    id : string
    coords : ICoordinates
}

export interface IGroupPoint extends IPoint {
    groupCoords : ICoordinates;
}

export class Point implements IPoint, IToSerializable<IPoint> {
    public id : string  // identifikátor
    public coords : Coordinates    // absolutní souřadnice

    private static _cnt : number = 0;

    public static get cnt() {
        return Point._cnt++;
    }

    public static getId() {
        return `Point_${Point.cnt}`
    }
    
    constructor (value : IPoint | ICoordinates) {
        if (isCoordinates(value)) {
            this.id = Point.getId();
            this.coords = new Coordinates(value);
        } else {
            this.id = value.id;
            this.coords = new Coordinates(value.coords);   
        }
    }


    public toSerializableObj () : IPoint {
        return {id : this.id, coords: this.coords.toSerializableObj()};
    }
}


export class GroupPoint extends Point implements IGroupPoint, IToSerializable<IGroupPoint> {
    public groupCoords : Coordinates;   // souřadnice v groupě

    constructor(value : IGroupPoint) {   // id, absolutní souřadnice celé groupy, souřadnice elementu v groupě
        super({...value});   // absolutní souřadnice bodu se vypočítají jako souřadnice celé groupu + souřadnice elementu v groupě
        this.groupCoords = new Coordinates(value.groupCoords);
    }

    public toSerializableObj () : IGroupPoint {
        const obj = super.toSerializableObj();
        const groupObj = {...obj, groupCoords: this.groupCoords.toSerializableObj()} as IGroupPoint
        return groupObj;
    }
}


export type IEndPointBrief = {
    coords : ICoordinates

    type : EndPointType

    maxSpawnedObj?: number

    arrowDirection? : Direction
} 

export interface IEndPoint extends IPoint {
    ownerId : string
    bindings : string[]
    type : EndPointType
    spawnedObjCnt : number
    maxSpawnedObj?: number
    arrowDirection? : Direction,
}

export enum EndPointType {
    Input,  // nemuze vytvaret dalsi objekty
    Infinite,   // muze vytvorit nekonecno dalsich objektu
    Restricted  // omezeni definovane dalsi parametrem
}

export class EndPoint  extends Point implements IToSerializable<IEndPoint> {

    public ownerId : string

    public bindings : string[] = []

    public type : EndPointType 
    public spawnedObjCnt : number = 0

    public maxSpawnedObj? : number  // 0 znamena inputOnly

    public arrowDirection? : Direction

    constructor(value : ICoordinates, ownerId : string, type : EndPointType, maxSpawnedObj? : number, arrowDirection? : Direction ) {
        super(value);
        this.ownerId = ownerId;
        this.type = type;
        this.arrowDirection = arrowDirection;

        if (maxSpawnedObj) {
            if (maxSpawnedObj >= 1)
                this.maxSpawnedObj = maxSpawnedObj;
            else 
                console.warn("value of maxSpawnedObj cannot be less than one")
        }
    
    }

    public toSerializableObj () : IEndPoint {
        return {
            ...super.toSerializableObj(),
            ownerId: this.ownerId,
            spawnedObjCnt: this.spawnedObjCnt,
            bindings : this.bindings,
            type : this.type,
            arrowDirection: this.arrowDirection,
            maxSpawnedObj: this.maxSpawnedObj
        }
    }
}