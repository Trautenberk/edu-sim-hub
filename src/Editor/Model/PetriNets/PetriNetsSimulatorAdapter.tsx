import { IEditorObject } from "../EditorObject";
import { IPNSimulationParams } from "../SimulationParams";
import { IArc, InputArc, OutputArc } from "./Arc";
import { IPlace, Place } from "./Place";
import { ITransition, Transition, TransitionType } from "./Transition";

interface ISimulatorAdapter {
    init(endTime : number, maxIteration : number) : void;
    simulate() : void;
}

export class PetriNetsSimulatorAdapter implements ISimulatorAdapter {

    private _engine : any;

    private _placesDict : {[key : string] : any } = {};
    private _inputArcsDict : {[key : string] : any } = {};
    private _outputArcsDict : {[key : string] : any } = {};
    private _transitionsDict : {[key : string] : any } = {};

    public statistics : IPetriNetsStatistics;
    
    public init(endTime : number, maxIteration : number): void {
        this._engine.init(endTime, maxIteration);
    }

    public simulate(): void {
        this._engine.simulate();
    }

    public clear() : void {
        const allObjects = {...this._placesDict, ...this._inputArcsDict, ...this._outputArcsDict, ...this._transitionsDict };

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
        const inputArcs : IArc[] = [];
        const outputArcs : IArc[] = [];
        const transitions : ITransition[] = [];
        
        for(const obj of objects) {
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

        for (const place of places) {
            this._placesDict[place.id] = new simulatorModule.Place(place.id, this._engine, place.label, place.tokenCount);
        }

        for (const inputArc of inputArcs) {
            this._inputArcsDict[inputArc.id] = new simulatorModule.InputArc(inputArc.id, this._engine, this._placesDict[inputArc.placeId], inputArc.weight);
        }

        for (const outputArc of outputArcs) {
            if (outputArc.to != null) {    // TODO docasne reseni, predelat
                this._outputArcsDict[outputArc.id] = new simulatorModule.OutputArc(outputArc.id, this._engine, this._placesDict[outputArc.to.objId], outputArc.weight);
            }
        }

        for (const transition of transitions) {
            const inputArcVec = new simulatorModule.InputArcVec();
            const outputArcVec = new simulatorModule.OutputArcVec();

            for (const inputArc of inputArcs) {
                if (inputArc.to != null && inputArc.to?.objId === transition.id) {
                    inputArcVec.push_back(this._inputArcsDict[inputArc.id]);
                }
            }

            for (const outputArc of outputArcs) {
                if (outputArc.transitionId === transition.id) {
                    outputArcVec.push_back(this._outputArcsDict[outputArc.id]);
                }
            }

            switch (transition.type) {
                case TransitionType.Immediate:
                    this._transitionsDict[transition.id] = new simulatorModule.ImmediateTransition(transition.id, this._engine, transition.label, inputArcVec, outputArcVec, transition.priority);
                    break;
                case TransitionType.Constant:
                    this._transitionsDict[transition.id] = new simulatorModule.TimedConstantTransition(transition.id, this._engine, transition.label, inputArcVec, outputArcVec, transition.timeValue);
                    break;
                case TransitionType.Exponential:
                    this._transitionsDict[transition.id] = new simulatorModule.TimedExponentialTransition(transition.id, this._engine, transition.label, inputArcVec, outputArcVec, transition.timeValue);
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