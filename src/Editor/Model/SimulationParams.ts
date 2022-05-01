

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
    endTime: 30,
    simStepSize: 0.001,
    statisticsInterval: 100
}