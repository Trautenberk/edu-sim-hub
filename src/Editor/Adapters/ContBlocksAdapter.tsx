import { timeStamp } from "console";
import { Add, Div, Gain, Integrator, Mul, Sub } from "Editor/Model/ContBlocks";
import { Constant, IConstant } from "Editor/Model/ContBlocks/Constant";
import { IGain } from "Editor/Model/ContBlocks/Gain";
import { IIntegrator } from "Editor/Model/ContBlocks/Integrator";
import { ISignal, Signal } from "Editor/Model/ContBlocks/Signal";
import { Time } from "Editor/Model/ContBlocks/Time";
import { IEditorObject, IEditorObjectWithEndPoints } from "Editor/Model/EditorObject";
import { ISimulatorAdapter } from "./PetriNetsSimulatorAdapter";
import { IContBlocksSimulationParams } from "Editor/Model/SimulationParams";


/**
 * Adaptér wasm modulu se simulátorem pro simulaci spojitých blokových schémat
 */
export class ContBlocksAdapter implements ISimulatorAdapter {

    // Wasm modul
    private _simulatorModule : any;

    // Simulační engine
    private _engine : any;

    // Kolekce simObjektů z wasm modulu
    private _allSimObjects : {[key : string] : any} = {}

    // Id integrátorů
    private _integratorIds : string[] = []

    // Statistiky
    public statistics : any

    /**
     * Metoda slouží pro konverzi objektu statstiky z wasm objektu na normální JS objekt
     * @param rawStatistics Wasm objekt se statistikami
     * @returns JS objekt se statistikami simulace
     */
    private convertStatistics(rawStatistics : any) : IContBlockStatistics {
        const statistics : IContBlockStatistics = {
            simulationTime : rawStatistics.simulationTime,
            integratorRecords: {}
        };
        
        // Iteruje přes všechny id integrátorů
        for (const objId of this._integratorIds) {
            const recordsArray : IntegratorRecord[] = [];

            // Najdu odpovídající objekt v mapě wasm statistik
            const rawRecordsArray : any = rawStatistics.integratorRecords.get(objId);
            
            // Získanou kolekci proiteruje a vytvoří odpovídající JS objekt
            for (let i = 0; i < rawRecordsArray.size(); i++) {
                const rawRecord = rawRecordsArray.get(i);
                recordsArray.push({time: rawRecord.time, value: rawRecord.value});
            }

            statistics.integratorRecords[objId] = recordsArray;
        }

        return statistics;
    }

    /**
     * Uvolní všechny držené Wasm instance
     */
    private clear() : void {
        this._engine.delete();
        this._integratorIds = [];
        
        for (const key of Object.keys(this._allSimObjects)) {
            const simObj = this._allSimObjects[key];
            simObj.delete();
        }

        this._allSimObjects = {};
    }


    constructor(simulatorModule: any) {
        this._simulatorModule = simulatorModule;
    }

    /**
     * Metoda provede vytvoření simulačního modelu a provede simulaci 
     * @param allEditorObjects objekty editoru
     * @param params parametry simulace
     * @returns 
     */
    simulate(allEditorObjects : {[key : string] :IEditorObject }, params : IContBlocksSimulationParams) {
        // vytvoří simulační engine pro spojité blokové schéma
        this._engine = new this._simulatorModule.ContBlockEngine();

        const signals : ISignal[] = []

        // Pro každý objekt modelu z editoru vytvoří odpovídající objekt z modulu simulátoru
        for (const obj of Object.values(allEditorObjects)) {
            let simObj = null;
            switch(obj.className) {
                case Constant.className:
                    simObj = new this._simulatorModule.Constant(obj.id, this._engine, (obj as IConstant).value); break;
                case Add.className:
                    simObj = new this._simulatorModule.Add(obj.id, this._engine); break;
                case Sub.className:
                    simObj = new this._simulatorModule.Sub(obj.id, this._engine); break;
                case Mul.className:
                    simObj = new this._simulatorModule.Mul(obj.id, this._engine); break;
                case Div.className:
                    simObj = new this._simulatorModule.Div(obj.id, this._engine); break;
                case Gain.className:
                    simObj = new this._simulatorModule.Gain(obj.id, this._engine, (obj as IGain).gain); break;
                case Integrator.className:
                    this._integratorIds.push(obj.id);
                    simObj = new this._simulatorModule.Integrator(obj.id, this._engine, (obj as IIntegrator).initialValue);
                    break;
                case Time.className:
                    simObj = new this._simulatorModule.Time(obj.id, this._engine); break;
                case Signal.className:
                    signals.push(obj as ISignal); break;
            }

            if (simObj != null) {
                this._allSimObjects[obj.id] = simObj;
            }
        }
        
        // Podle signálů propojí bloky
        for (const signal of signals) {
            if (signal.from == null ||  signal.to == null) {
                console.error(`Unconected signal ${signal.id}`);
                return;
            }

            const obj = allEditorObjects[signal.to.objId] as IEditorObjectWithEndPoints;

            const inputSimObject = this._allSimObjects[signal.from.objId];
            const targetSimObject = this._allSimObjects[signal.to.objId];

            if (isSingleInputBlock(obj)) {
                targetSimObject.setInput(inputSimObject);
            } else {
                if (isFirstInputSignal(signal, obj)) {
                    targetSimObject.setInputFirst(inputSimObject);
                } else {
                    targetSimObject.setInputSecond(inputSimObject);
                }
            }
        }

        // pokud inicializace proběhne v pořádku, provede experiment
        if (this._engine.init(params.beginTime, params.endTime, params.simStepSize, params.statisticsInterval)) {
            this._engine.simulate(); // provedení simulace
           this.statistics = this.convertStatistics(this._engine.statistics()); // konverze statistik
        } else {
            console.error("Error during engine initialization");
        }
        this.clear(); // uvolnění objektů
    }
}

/**
 * Statistiky pro spojité blokové schéma
 */
export interface IContBlockStatistics {
    simulationTime : number
    integratorRecords : {[key : string] : IntegratorRecord[]}
}


/**
 * Záznam statistik pro blok integrátoru
 */
type IntegratorRecord = {
    time : number
    value : number
}


function isSingleInputBlock(obj : IEditorObjectWithEndPoints) {
    return obj.endPointIds.length == 2;
}

function isFirstInputSignal(signal : ISignal, targetObj : IEditorObjectWithEndPoints) : boolean {
    return targetObj.endPointIds[0] == signal.to?.pointId;
}
