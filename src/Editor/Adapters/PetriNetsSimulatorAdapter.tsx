import { IContBlockStatistics } from "./ContBlocksAdapter";
import { IEditorObject } from "../Model/EditorObject";
import { IContBlocksSimulationParams, IPNSimulationParams } from "../Model/SimulationParams";
import { IArc, InputArc, OutputArc } from "../Model/PetriNets/Arc";
import { IPlace, Place } from "../Model/PetriNets/Place";
import { ITransition, Transition, TransitionType } from "../Model/PetriNets/Transition";

/**
 * Rozhraní adptéru modulu simulátoru
 */
export interface ISimulatorAdapter {
    simulate(objects : {[key : string] :IEditorObject }, params : IPNSimulationParams | IContBlocksSimulationParams) : void;
    statistics  : IPetriNetsStatistics | IContBlockStatistics | null;
}


/**
 *  * Adaptér wasm modulu se simulátorem pro simulaci Petriho sítě
 */
export class PetriNetsSimulatorAdapter implements ISimulatorAdapter {

    // Wasm modul
    private _simulatorModule : any;
    
    // Simulační engine
    private _engine : any;

    // Slovník míst
    private _placesDict : {[key : string] : any } = {};
    
    // Slovník vstupních hran
    private _inputArcsDict : {[key : string] : any } = {};
    
    // Slovník výstupních hran
    private _outputArcsDict : {[key : string] : any } = {};
    
    // Slovník přechodů
    private _transitionsDict : {[key : string] : any } = {};

    // JS objekt se statistikami
    public statistics : IPetriNetsStatistics | null = null;
    

    /**
     * Metoda pro uvolnění dežených Wasm instancí
     */
    public clear() : void {
        const allObjects = {...this._placesDict, ...this._inputArcsDict, ...this._outputArcsDict, ...this._transitionsDict };

        for (const simObject of Object.values(allObjects)) {
            simObject.delete();
        }
        this._engine.delete();

        this._engine = undefined;
        this._placesDict = {};
        this._inputArcsDict = {};
        this._outputArcsDict = {};
        this._transitionsDict = {};
    }

    /**
     * Metoda pro konverzi Wasm objektu se statistikami do normálního JS objektu
     * @param rawStatistics Wasm statistiky
     * @returns JS objekt se statisikami
     */
    private convertStatistics(rawStatistics : any) : IPetriNetsStatistics {
        const statistics : IPetriNetsStatistics = { 
            simulationTime: rawStatistics.simulationTime,
            placeRecords : {},
            transitionRecords: {}
        };

        // Iterace podle všech id míst
        for(const id of Object.keys(this._placesDict)) {
            const specificPlaceRecords = rawStatistics.placeRecords.get(id);
            const recordsArray : PlaceRecord[] = []; 

            for (let i = 0; i < specificPlaceRecords.size(); i++) {
                const rawRecord = specificPlaceRecords.get(i);
                recordsArray.push({time: rawRecord.time, tokens : rawRecord.tokens});
            }

            statistics.placeRecords[id] = recordsArray;
        }

        // Iterace podle všech id přechodů
        for(const id of Object.keys(this._transitionsDict)) {
            const specificTransitionRecords = rawStatistics.transitionRecords.get(id);
            const recordsArray : TransitionRecord[] = []; 

            for (let i = 0; i < specificTransitionRecords.size(); i++) {
                const rawRecord = specificTransitionRecords.get(i);
                recordsArray.push({time: rawRecord.time, fired : rawRecord.fired});
            }

            statistics.transitionRecords[id] = recordsArray;
        }

        return statistics;
    }

    constructor(simulatorModule: any) {
        this._simulatorModule = simulatorModule;
    }

    /**
     * Metoda provede vytvoření simulačního modelu a provede simmulaci PN
     * @param objects objekty editoru
     * @param params parametry simulace
     */
    simulate(objects : {[key : string] :IEditorObject }, params : IPNSimulationParams) {
        // PN simulační engine
        this._engine = new this._simulatorModule.PetriNetsEngine();

        const places :  IPlace[] = [];
        const inputArcs : IArc[] = [];
        const outputArcs : IArc[] = [];
        const transitions : ITransition[] = [];
        
        // Roztřídí objekty ediotru do odpovídajích slovníků
        for(const obj of Object.values(objects)) {
            switch (obj.className) {
                case Place.className:
                    places.push(obj as IPlace);
                    break;
            case InputArc.className:
                    inputArcs.push(obj as IArc);
                    break;
                case OutputArc.className:
                    outputArcs.push(obj as IArc);
                    break;
                case Transition.className:
                    transitions.push(obj as ITransition);
                    break;
            }
        }

        // Vytvoření instancí simulátoru pro místa
        for (const place of places) {   
            this._placesDict[place.id] = new this._simulatorModule.Place(place.id, this._engine, place.tokenCount);
        }

        // Vytvoření instancí simulátoru pro vstupní hrany
        for (const inputArc of inputArcs) {
            this._inputArcsDict[inputArc.id] = new this._simulatorModule.InputArc(inputArc.id, this._engine, this._placesDict[inputArc.placeId], inputArc.weight);
        }

        // Vytvoření instnací simulátoru pro výstupní místa
        for (const outputArc of outputArcs) {
            if (outputArc.to != null) { 
                this._outputArcsDict[outputArc.id] = new this._simulatorModule.OutputArc(outputArc.id, this._engine, this._placesDict[outputArc.to.objId], outputArc.weight);
            }
        }

        // Vytvoření instancí simulátoru pro přechody
        for (const transition of transitions) {
            const inputArcVec = new this._simulatorModule.InputArcVec();
            const outputArcVec = new this._simulatorModule.OutputArcVec();

            // Připraví kolekci vstupních hran přechodu
            for (const inputArc of inputArcs) {
                if (inputArc.to != null && inputArc.to?.objId === transition.id) {
                    inputArcVec.push_back(this._inputArcsDict[inputArc.id]);
                }
            }
            // a jeho výstupních hran
            for (const outputArc of outputArcs) {
                if (outputArc.transitionId === transition.id) {
                    outputArcVec.push_back(this._outputArcsDict[outputArc.id]);
                }
            }

            // Podle typu přechodu vytvořím odpovídající instanci
            switch (transition.type) {
                case TransitionType.Immediate:
                    this._transitionsDict[transition.id] = new this._simulatorModule.ImmediateTransition(transition.id, this._engine, inputArcVec, outputArcVec, transition.priority);
                    break;
                case TransitionType.Constant:
                    this._transitionsDict[transition.id] = new this._simulatorModule.TimedConstantTransition(transition.id, this._engine, inputArcVec, outputArcVec, transition.timeValue);
                    break;
                case TransitionType.Exponential:
                    this._transitionsDict[transition.id] = new this._simulatorModule.TimedExponentialTransition(transition.id, this._engine, inputArcVec, outputArcVec, transition.timeValue);
                    break;
            }   
        }

            // inicializace
            this._engine.init(params.endTime, 1000);
            // simulace
            this._engine.simulate();
            // konverze statistik
            this.statistics = this.convertStatistics(this._engine.statistics())
            // uvolnění instancí
            this.clear();
    }

}


/**
 * Statistiky simulace PN
 */
export interface IPetriNetsStatistics {
    simulationTime : number
    placeRecords : {[key : string] : PlaceRecord[] }
    transitionRecords : {[key : string] : TransitionRecord[] }
}


/**
 * Záznam statistik pro místo
 */
export type PlaceRecord = {
    time : number
    tokens : number
}

/**
 * Záznam statistik pro přechod
 */
export type TransitionRecord = {
    time : number
    fired : number
}