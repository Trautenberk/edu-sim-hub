import { INITIAL_COORDINATES } from "Editor/Components/Utilities/UtilMethodsAndTypes";
import { ICoordinates, IToSerializable } from "Editor/Model/UtilClasses/Coordinates";

/**
 * Rozhraní pro objekty modelu editoru
 */
export interface IEditorObject {
   /**
    * Identifikátor
    */
    id : string,
    /**
     * Název třídy objektu
     */
    className : string;
}

/**
 * Počítadlo identifikátorů
 */
let EDITOR_OBJEC_COUNTER = 0;

/**
 * Nastaví počítadlo identifikátorů
 * @param value hodnota na kterou se má počítadlo nastavit
 */
export function SetEditorObjectCounter(value : number) {
    EDITOR_OBJEC_COUNTER = value;
}

/**
 * Konstanta prázdného id
 */
export const NULL_OBJ_ID = "NULL_OBJ_ID";

/**
 * Abstraktní třída Editor Object. 
 * Z této třídy dědí všechny třídy s jejichž instancemi se pracuje v modelu.
 */
export abstract class EditorObject implements  IToSerializable<IEditorObject> {
    protected get idCount() : number {
        return EDITOR_OBJEC_COUNTER++;
    }

    /**
     * Identifikátor
     */
    public readonly id : string;
    public abstract className() : string;
    protected getElementId = () => { 
        return `${this.className().toLowerCase()}_${this.idCount}`;
    }

    constructor()
    {
        this.id = this.getElementId();
    }

    public toSerializableObj() : IEditorObject {
        return {id : this.id, className : this.className(),}
    }
    
} 

/**
 * Typ objektu modelu, jehož grafická reprezentace je diagram a nikoliv hrana/křivka.
 */
export interface IEditorObjectWithEndPoints extends IEditorObject {

    /**
     * Souřadnice
     */
    coordinates : ICoordinates 
    /**
     * EndPointy
     */
    endPointIds : string[]
}

export abstract class EditorObjectWithEndPoints extends EditorObject implements IToSerializable<IEditorObjectWithEndPoints>{
    /**
     * EndPointy
     */
    public endPointIds : string[] = []
    /**
     * Souřadnice
     */
    public coordinates : ICoordinates = INITIAL_COORDINATES;

    public toSerializableObj() : IEditorObjectWithEndPoints {
        return { ...super.toSerializableObj(), endPointIds: this.endPointIds, coordinates: this.coordinates}
    }
}