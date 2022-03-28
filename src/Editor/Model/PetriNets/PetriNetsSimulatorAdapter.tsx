import { IEditorObject } from "../EditorObject";
import { IArch } from "./Arch";
import { IPlace } from "./Place";
import { ITransition } from "./Transition";

interface ISimulatorAdapter {
    init() : void;
    simulate() : void;
}

export class PetriNetsSimulatorAdapter implements ISimulatorAdapter {

    private petriNetsEngine : any;

    init(): void {
        throw new Error("Method not implemented.");
    }
    simulate(): void {
        throw new Error("Method not implemented.");
    }

    constructor(engine: any ,objects : IEditorObject) {
        this.petriNetsEngine = engine;

        const places : IPlace[] = [];
        const inputArches : IArch[] = [];
        const outputArches : IArch[] = [];
        const transitions : ITransition[] = [];

    }
}
