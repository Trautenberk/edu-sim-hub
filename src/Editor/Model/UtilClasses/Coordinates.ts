export interface IToSerializable<T> {
    /**
    * Metoda vrací serializovatelnou kopii objektu
    * @returns Serializovatelný objekt
    */
    toSerializableObj () : T;
}

export interface ICoordinates {
    x : number
    y: number
}

/**
 * Provede typovou kontrolu jestli typ vstupního objektu odpovídá třídě Coordinates.
 * @param obj vstupní objektu
 * @returns true okud typ odpovídá
 */
export function isCoordinates(obj : any) : obj is ICoordinates {
    return (obj as ICoordinates).x !== undefined && (obj as ICoordinates).y !== undefined;
} 

/**
 * Objekty této třídy slouží k uchování a práci se souřadnicemi. 
 */
export class Coordinates implements ICoordinates, IToSerializable<ICoordinates> {

    public constructor(obj : ICoordinates);
    public constructor(obj?: ICoordinates) {
        this.x = obj?.x ?? 0;
        this.y = obj?.y ?? 0;
    }

    /**
     * Souřadnice na ose x
     */
    public x : number = 0;
    /**
     * Souřadnice na ose y
     */
    public y : number = 0;

    /**
     * Přičte souřadnice přijatého objektu těm v instanci.
     * @param obj souřadnice které mají být přičteny
     * @returns Odkaz na instanci objektu
     */
    public add (obj : ICoordinates) {
        this.x += obj.x;
        this.y += obj.y;
        return this;
    }

    /**
     * Provede odečet souřadnic přijatého objektu od těch v instanci.
     * @param obj Souřadnice které slouží jako druhý operand operace
     * @returns Odkaz na instanci objektu
     */
    public sub (obj : ICoordinates) {
        this.x -= obj.x;
        this.y -= obj.y;
        return this;
    }

    /**
     * Vynásobí souřadnice v instanci s těmi v přijatém objektu.
     * @param obj Souřadnice které slouží jako druhý operand 
     * @returns Odkaz na instanci objektu
     */
    public mul (obj : ICoordinates) {
        this.x *= obj.x;
        this.y *= obj.y;
        return this;
    }

    /**
     * Vydělí souřadnice instance.
     * @param obj Souřadnice které slouží jako druhý operand 
     * @returns Odkaz na objekt
     */
    public div (obj : ICoordinates) {
        this.x /= obj.x;
        this.y /= obj.y;
        return this;
    }

    /**
     * Zvětší souadnice podle přijaté hodnoty.
     * @param obj Hodnota zvětšení 
     * @returns Odkaz na objekt
     */
    public scale (value : number) {
        this.mul({x: value, y: value});
        return this;
    }

    /**
     * Provede umocnění souřadnic podle přijaté hodnoty
     * @param value Na kolikátou se mají souřadníce umocnit
     * @return Odaz na instanci objektu
     */
    public power (value : number) {
        this.x =  Math.pow(this.x, value);
        this.y = Math.pow(this.y, value);
        return this;
    }

    /**
     * Statická metoda pro výpočet vzdálenosti mezi dvěma body.
     * @param begin První bod 
     * @param end Druhý bod
     * @returns Vzdálenost mezi oběma body
     */
    public static getDistance (begin : ICoordinates, end : ICoordinates) {
        const result = new Coordinates(end) // B
        result.sub(begin);  // B - A      
        result.power(2);    // (B - A)^2
        return Math.sqrt(result.x + result.y);  // sqrt((A-B)^2)
    }
    
    toSerializableObj(): ICoordinates {
        return {x: this.x, y: this.y}
    }

    public toString () {
        return `${this.x} ${this.y}`
    }
}