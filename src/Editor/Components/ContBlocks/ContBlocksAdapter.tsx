import { IEditorObject } from "Editor/Model/EditorObject";
import { IContBlocksSimulationParams } from "Editor/Model/SimulationParams";





export class ContBlocksAdapter {

    private convertStatistics() : any {

    }
    public statistics : any

    constructor(simulatorModule: any, objects : IEditorObject[], params : IContBlocksSimulationParams) {
        


    }
}


export interface IContBlockStatistics {
    simulationTime : number

}


type IntegratorRecord = {
    time : number
    
}