import { Add, Div, Gain, Integrator, Mul, Sub } from "Editor/Model/ContBlocks";
import { Constant, IConstant } from "Editor/Model/ContBlocks/Constant";
import { IGain } from "Editor/Model/ContBlocks/Gain";
import { IIntegrator } from "Editor/Model/ContBlocks/Integrator";
import { ISignal, Signal } from "Editor/Model/ContBlocks/Signal";
import { IEditorObject, IEditorObjectWithEndPoints } from "Editor/Model/EditorObject";
import { IContBlocksSimulationParams } from "Editor/Model/SimulationParams";

export class ContBlocksAdapter {

    private _engine : any;

    private _allSimObjects : {[key : string] : any} = {}

    private _integratorIds : string[] = []

    public statistics : any

    private convertStatistics(rawStatistics : any) : IContBlockStatistics {
        const statistics : IContBlockStatistics = {
            simulationTime : rawStatistics.simulationTime,
            integratorRecords: {}
        };

        for (const objId of this._integratorIds) {
            const recordsArray : IntegratorRecord[] = [];
            const rawRecordsArray : any = rawStatistics.integratorRecords.get(objId);
            
            for (let i = 0; i < rawRecordsArray.size(); i++) {
                const rawRecord = rawRecordsArray.get(i);
                recordsArray.push({time: rawRecord.time, value: rawRecord.value});
            }

            statistics.integratorRecords[objId] = recordsArray;
        }

        return statistics;
    }

    private clear() : void {
        this._engine.delete();
    }


    constructor(simulatorModule: any, allEditorObjects : {[key : string] :IEditorObject }, params : IContBlocksSimulationParams) {
        this._engine = new simulatorModule.ContBlockEngine();

        const signals : ISignal[] = []

        for (const obj of Object.values(allEditorObjects)) {
            let simObj = null;
            switch(obj.className) {
                case Constant.name:
                    simObj = new simulatorModule.Constant(obj.id, this._engine, (obj as IConstant).value); break;
                case Add.name:
                    simObj = new simulatorModule.Add(obj.id, this._engine); break;
                case Sub.name:
                    simObj = new simulatorModule.Sub(obj.id, this._engine); break;
                case Mul.name:
                    simObj = new simulatorModule.Mul(obj.id, this._engine); break;
                case Div.name:
                    simObj = new simulatorModule.Div(obj.id, this._engine); break;
                case Gain.name:
                    simObj = new simulatorModule.Gain(obj.id, this._engine, (obj as IGain).gain); break;
                case Integrator.name:
                    this._integratorIds.push(obj.id);
                    simObj = new simulatorModule.Integrator(obj.id, this._engine, (obj as IIntegrator).initialValue);
                    break;
                case Signal.name:
                    signals.push(obj as ISignal); break;
            }

            if (simObj != null) {
                this._allSimObjects[obj.id] = simObj;
            }
        }

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

        if (this._engine.init(params.endTime, params.simStepSize, params.statisticsInterval)) {
            this._engine.simulate()
           this.statistics = this.convertStatistics(this._engine.statistics());
        } else {
            console.error("Error during engine initialization");
        }
        this.clear();

    }
}

export interface IContBlockStatistics {
    simulationTime : number
    integratorRecords : {[key : string] : IntegratorRecord[]}
}


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
