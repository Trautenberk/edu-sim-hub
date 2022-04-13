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

    private _placesDict : {[key : string] : IPlace } = {};
    private _inputArchesDict : {[key : string] : IArch } = {};
    private _outputArchesDict : {[key : string] : IArch } = {};
    private _transitionsDict : {[key : string] : ITransition } = {};

    public init(endTime : number, maxIteration : number): void {
        this._engine.init(endTime, maxIteration);
    }

    public simulate(): void {
        this._engine.simulate();
    }

    public clear() : void {
        const allObjects = {...this._placesDict, ...this._inputArchesDict, ...this._outputArchesDict, ...this._transitionsDict };

        for (const simObjectKey of Object.keys(allObjects))
            delete allObjects[simObjectKey];
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
            this._placesDict[place.id] = new simulatorModule.Place(this._engine, place.label, place.tokenCount, place.id);
        }

        for (const inputArch of inputArches) {
            this._inputArchesDict[inputArch.id] = new simulatorModule.InputArch(this._engine, this._placesDict[inputArch.placeId], inputArch.weight, inputArch.id);
        }

        for (const outputArch of outputArches) {
            if (outputArch.to != null) {    // TODO docasne reseni, predelat
                this._outputArchesDict[outputArch.id] = new simulatorModule.OutputArch(this._engine, this._placesDict[outputArch.to.objId], outputArch.weight, outputArch.id);
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

            if (transition.type === TransitionType.Priority) {
                this._transitionsDict[transition.id] = new simulatorModule.ImmediateTransition(this._engine, transition.label, inputArchVec, outputArchVec, transition.priority, transition.id);
            } else {
                this._transitionsDict[transition.id] = new simulatorModule.TimedTransition(this._engine, transition.label, inputArchVec, outputArchVec, transition.timeValue, transition.id);
            }

        }

            this._engine.init(params.endTime,10);
            this._engine.simulate();
            const statistics = this._engine.statistics();
            this.clear();
    }


}
