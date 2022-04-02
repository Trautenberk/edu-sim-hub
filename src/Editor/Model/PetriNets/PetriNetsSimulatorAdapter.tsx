import { IEditorObject } from "../EditorObject";
import { IArch, InputArch, OutputArch } from "./Arch";
import { IPlace, Place } from "./Place";
import { ITransition, Transition } from "./Transition";

interface ISimulatorAdapter {
    init(endTime : number, maxIteration : number) : void;
    simulate() : void;
}

export class PetriNetsSimulatorAdapter implements ISimulatorAdapter {

    private engine : any;

    init(endTime : number, maxIteration : number): void {
        this.engine.init(endTime, maxIteration);
    }
    simulate(): void {
        this.engine.simulate();
    }

    constructor(simulatorModule: any, objects : IEditorObject[]) {
        this.engine = new simulatorModule.PetriNetsEngine();

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

        const placesDict : {[key : string] : IPlace } = {};
        const inputArchesDict : {[key : string] : IArch } = {};
        const outputArchesDict : {[key : string] : IArch } = {};
        const transitionsDict : {[key : string] : ITransition } = {};

        for (const place of places) {
            placesDict[place.id] = new simulatorModule.Place(this.engine, place.label, place.tokenCount, place.id);
        }

        for (const inputArch of inputArches) {
            inputArchesDict[inputArch.id] = new simulatorModule.InputArch(this.engine, placesDict[inputArch.placeId], inputArch.weight, inputArch.id);
        }

        for (const outputArch of outputArches) {
            outputArchesDict[outputArch.id] = new simulatorModule.OutputArch(this.engine, placesDict[outputArch.placeId], outputArch.weight, outputArch.id);
        }

        for (const transition of transitions) {
            const inputArchVec = new simulatorModule.InputArchVec();
            const outputArchVec = new simulatorModule.OutputArchVec();

            for (const inputArch of inputArches) {
                if (inputArch.transitionId === transition.id) {
                    inputArchVec.push_back(inputArchesDict[inputArch.id]);
                }
            }

            for (const outputArch of outputArches) {
                if (outputArch.transitionId === transition.id) {
                    outputArchVec.push_back(outputArchesDict[outputArch.id]);
                }
            }

            transitionsDict[transition.id] = new simulatorModule.ImmediateTransition(this.engine, transition.label, inputArchVec, outputArchVec, 0, transition.id)

            this.engine.init(10,10);
            this.engine.simulate();
        }
    }
}
