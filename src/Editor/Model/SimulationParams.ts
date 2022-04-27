

export interface IPNSimulationParams {
    endTime : number
}


export const defaultPNSimulationParams : IPNSimulationParams = {
    endTime: 10
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
    endTime: 10,
    simStepSize: 0.01,
    statisticsInterval: 100
}