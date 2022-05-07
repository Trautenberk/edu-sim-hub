import { Direction } from "Editor/Components/Utilities/UtilMethodsAndTypes";
import { Coordinates, ICoordinates, isCoordinates, IToSerializable } from "./Coordinates";

/**
 * Rozhraní bodu
 */
export interface IPoint {
   /**
    * Identifikátor
    */
    id : string
    /**
     * Hodnota souřadnic bodu
     */
    coords : ICoordinates
}

/**
 * Počítadlo pro tvorbu id bodu
 */
let POINT_COUNTER = 0;

/**
 * Nastaví počítadlo vytvořených identifikátoru
 * @param value 
 */
export function SetPointCounter(value : number) {
    POINT_COUNTER = value;
}

/**
 * Bod v halvní ploše
 */
export class Point implements IPoint, IToSerializable<IPoint> {
    /**
     * Identifikátor
     */
    public id : string
    
    /**
     *  Absolutní souřadnice  bodu v ploše
     * */  
    public coords : Coordinates 

    /**
     * Počítadlo pro tvorbu identifikátorů
     */
    private static _cnt : number = 0;

    public static get cnt() {
        return POINT_COUNTER++;
    }

    /**
     * Generátor unikátních id pro konstrukci Point
     * @returns unikátní id
     */
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


/**
 * Pomocný typ pro parametry konstruktoru EndPointu
 */
export type IEndPointBrief = {
    //  Souřadnice
    coords : ICoordinates
    // Typ
    type : EndPointType
    // Omezení počtu výstupních hran
    maxSpawnedObj?: number
    // Směr kterým se má hrana z EndPointu přidat
    arrowDirection? : Direction
    // Jesti je možné s bode spojovat
    connectable?: boolean
} 

/**
 * Rozrahní EndPointu
 */
export interface IEndPoint extends IPoint {
    ownerId : string
    bindings : string[]
    type : EndPointType
    spawnedObjCnt : number
    maxSpawnedObj?: number
    arrowDirection? : Direction,
    connectable: boolean // jestli do něj může vést hrana
}

/**
 * Typ EndPointu   
 */
export enum EndPointType {
    /**
     * Nemůže z něj vést hrana
     */
    Input,  
    /**
     * Může z něj vést libovolný počet hran
     */
    Infinite,

    /**
     * Může z něj vést počet hran určený parametrem
     */
    Restricted,  
}


/**
 *  Třída koncového bodu.
 *  Tento bod slouží pro spojování jednotlivých objektů hlavní plochy.
 * 
 */
export class EndPoint  extends Point implements IToSerializable<IEndPoint> {
    /**
     * Id objketu kterému bod náleží 
     */
    public ownerId : string

    /**
     * Bindingy, slouží pro návázání bodu na jiný bod.
     */
    public bindings : string[] = []

    /**
     * Typ endpointu
     */
    public type : EndPointType 
    public spawnedObjCnt : number = 0

    /**
     * Definované omezení pro počet hran vedoucích z endpointu. Platí jen pro určitý typ endPointu.
     */
    public maxSpawnedObj? : number  // 0 znamena inputOnly

    /**
     * Směr šipky, jenž udává jakým směrem se přidá nová hrana
     */
    public arrowDirection? : Direction

    /**
     * Jestli mohou vést hrany do endpointu
     */
    public connectable : boolean

    constructor(value : ICoordinates, ownerId : string, type : EndPointType, maxSpawnedObj? : number, arrowDirection? : Direction, connectable: boolean = true ) {
        super(value);
        this.ownerId = ownerId;
        this.type = type;
        this.arrowDirection = arrowDirection;
        this.connectable = connectable;

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
            maxSpawnedObj: this.maxSpawnedObj,
            connectable: this.connectable
        }
    }
}