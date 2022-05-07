import { EditorObject, IEditorObject } from "../EditorObject";
import { Coordinates, IToSerializable } from "./Coordinates";
import { IEndPoint, IPoint } from "./Point";


export interface IEdge extends IEditorObject {
    pointsId : string[]
    from : ConnectionInfo | null,
    to : ConnectionInfo | null,
    allowedClassNames: string[] // kolekce typu objektu, jenž můžou být na konci hrany
}

/**
 * Provede typovou kontrolu jestli je objekt hrana
 * @param obj vstupní objekt
 * @returns true jestli se jedná o hranu
 */
export function isEdge(obj : any): obj is IEdge{
    return (obj as IEdge).pointsId != undefined;
}

/**
 * Pomocný typ, slouží k uchování informací o spojení
 */
export type ConnectionInfo = {
    /**
     * Bod se který je provedeno spojení.
     */
    pointId : string
    /**
     * Objekt se kterým je provedeni spojení
     */    
    objId : string 
}

/**
 * Abstraktní třída pro objekty hlavní plochy, které budou mít podobu hrany
 */
export abstract class Edge extends EditorObject implements IToSerializable<IEdge> {
    
    /**
     * Body které tvoří hranu
     */
    public  pointsId : string[] = [];

    /**
     * Odkud hrana vede
     */
    public from : ConnectionInfo | null = null
    /**
     * Kam hrana vede
     */
    public to : ConnectionInfo | null = null;

    /**
     * Kolekce názvu tříd objektů, se kterými hrana může být spojena
     */
    public  allowedClassNames : string[] = [] 

    constructor(from : ConnectionInfo, allowedTypes? : string[]) {
        super();
        this.from = from;
        if (allowedTypes != null)
            this. allowedClassNames = allowedTypes;
    }

    toSerializableObj(): IEdge {
        return { ...super.toSerializableObj(), pointsId: this.pointsId, from: this.from, to: this.to,  allowedClassNames: this.allowedClassNames }
    }

    /**
     * 
     * @param points  Body hrany
     * @returns    Řetězcová reprezentace, slouží pro použití s svg elementem path
     */
    public static getPathDescription (points: IPoint[]) : string {
        const description = [`M ${new Coordinates(points[0].coords).toString()}`];
    
        for(const item of (points.slice(1, points.length))) {
            description.push(`L ${new Coordinates(item.coords).toString()}`)
        }

        return description.join(" ");
    }
}