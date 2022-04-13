

export interface IPNSimulationParams {
    endTime : number
}


export const defaultPNSimulationParams : IPNSimulationParams = {
    endTime: 100
}

export interface IContBlocksSimulationParams {
    endTime : number
    simStepSize : number
    statisticsInterval : number
}

export function isIContBlocksSimulationParams(obj : any) : obj is IContBlocksSimulationParams {
    return obj.endTime != null && obj.simStepSize != null && obj.statisticsStepSize != null
}


export const defaultContBlocksSimulationParams : IContBlocksSimulationParams = {
    endTime: 100,
    simStepSize: 0.1,
    statisticsInterval: 10
}