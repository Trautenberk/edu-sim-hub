import { IEditorObject } from "../EditorObject";
import { IPNSimulationParams } from "../SimulationParams";
import { IArch, InputArch, OutputArch } from "./Arch";
import { IPlace, Place } from "./Place";
import { ITransition, Transition, TransitionType } from "./Transition";

interface ISimulatorAdapter {
    init(endTime : number, maxIteration : number) : void;
    simulate() : void;
}

export class PetriNetsSimulatorAdapter implements ISimulatorAdapter {

    private _engine : any;

    private _placesDict : {[key : string] : any } = {};
    private _inputArchesDict : {[key : string] : any } = {};
    private _outputArchesDict : {[key : string] : any } = {};
    private _transitionsDict : {[key : string] : any } = {};

    public statistics : IPetriNetsStatistics;
    
    public init(endTime : number, maxIteration : number): void {
        this._engine.init(endTime, maxIteration);
    }

    public simulate(): void {
        this._engine.simulate();
    }

    public clear() : void {
        const allObjects = {...this._placesDict, ...this._inputArchesDict, ...this._outputArchesDict, ...this._transitionsDict };

        for (const simObject of Object.values(allObjects))
            simObject.delete();
    }

    private convertStatistics(rawStatistics : any) : IPetriNetsStatistics {
        const statistics : IPetriNetsStatistics = { 
            simulationTime: rawStatistics.simulationTime,
            placeRecords : {},
            transitionRecords: {}
        };

        for(const id of Object.keys(this._placesDict)) {
            const specificPlaceRecords = rawStatistics.placeRecords.get(id);
            const recordsArray : PlaceRecord[] = []; 

            for (let i = 0; i < specificPlaceRecords.size(); i++) {
                const rawRecord = specificPlaceRecords.get(i);
                recordsArray.push({time: rawRecord.time, tokens : rawRecord.tokens});
            }

            statistics.placeRecords[id] = recordsArray;
        }

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


    constructor(simulatorModule: any, objects : IEditorObject[], params : IPNSimulationParams) {
        this._engine = new simulatorModule.PetriNetsEngine();

        const places :  IPlace[] = [];
        const inputArches : IArch[] = [];
        const outputArches : IArch[] = [];
        const transitions : ITransition[] = [];
        
        for(const obj of objects) {
            switch (obj.className) {
                case Place.name:
                    places.push(obj as IPlace);
                    break;
                case InputArch.name:
                    inputArches.push(obj as IArch);
                    break;
                case OutputArch.name:
                    outputArches.push(obj as IArch);
                    break;
                case Transition.name:
                    transitions.push(obj as ITransition);
                    break;
            }
        }

        for (const place of places) {
            this._placesDict[place.id] = new simulatorModule.Place(place.id, this._engine, place.label, place.tokenCount);
        }

        for (const inputArch of inputArches) {
            this._inputArchesDict[inputArch.id] = new simulatorModule.InputArch(inputArch.id, this._engine, this._placesDict[inputArch.placeId], inputArch.weight);
        }

        for (const outputArch of outputArches) {
            if (outputArch.to != null) {    // TODO docasne reseni, predelat
                this._outputArchesDict[outputArch.id] = new simulatorModule.OutputArch(outputArch.id, this._engine, this._placesDict[outputArch.to.objId], outputArch.weight);
            }
        }

        for (const transition of transitions) {
            const inputArchVec = new simulatorModule.InputArchVec();
            const outputArchVec = new simulatorModule.OutputArchVec();

            for (const inputArch of inputArches) {
                if (inputArch.to != null && inputArch.to?.objId === transition.id) {
                    inputArchVec.push_back(this._inputArchesDict[inputArch.id]);
                }
            }

            for (const outputArch of outputArches) {
                if (outputArch.transitionId === transition.id) {
                    outputArchVec.push_back(this._outputArchesDict[outputArch.id]);
                }
            }

            switch (transition.type) {
                case TransitionType.Immediate:
                    this._transitionsDict[transition.id] = new simulatorModule.ImmediateTransition(transition.id, this._engine, transition.label, inputArchVec, outputArchVec, transition.priority);
                    break;
                case TransitionType.Constant:
                    this._transitionsDict[transition.id] = new simulatorModule.TimedConstantTransition(transition.id, this._engine, transition.label, inputArchVec, outputArchVec, transition.timeValue);
                    break;
                case TransitionType.Exponential:
                    this._transitionsDict[transition.id] = new simulatorModule.TimedExponentialTransition(transition.id, this._engine, transition.label, inputArchVec, outputArchVec, transition.timeValue);
                    break;
            }   
        }

            this._engine.init(params.endTime,10);
            this._engine.simulate();
            this.statistics = this.convertStatistics(this._engine.statistics())
            this.clear();
    }

}


export interface IPetriNetsStatistics {
    simulationTime : number
    placeRecords : {[key : string] : PlaceRecord[] }
    transitionRecords : {[key : string] : TransitionRecord[] }
}


export type PlaceRecord = {
    time : number
    tokens : number
}

export type TransitionRecord = {
    time : number
    fired : number
}