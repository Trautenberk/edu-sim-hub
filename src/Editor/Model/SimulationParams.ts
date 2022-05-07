

/**
 * Rozhraní definující strukturu objektu parametrů simulace PN
 */
export interface IPNSimulationParams {
    /**
     * Koncový čas
     */
    endTime : number
}

/**
 * Výchozí parametry simulace PN
 */
export const defaultPNSimulationParams : IPNSimulationParams = {
    endTime: 10
}

/**
 * Rozhraní definující strukturu objektu s parametry simulace Spojitého blokového schéma
 */
export interface IContBlocksSimulationParams {
    /**
     * Počáteční modelový čas
     */
    beginTime : number
    /**
     * Koncový modelový čas
     */
    endTime : number
    /**
     * Délka kroku numerické metody 
     */
    simStepSize : number
    /**
     * Interval sběru statistik
     */
    statisticsInterval : number
}

/**
 * TypeGuard => provede typovou kontrolu jestli se jedná o objekt odpovídající rozhraní IContBlockSimulationParams
 * @param obj  vstupní objekt
 * @returns true pokud je objekt požadovaného typu
 */
export function isIContBlocksSimulationParams(obj : any) : obj is IContBlocksSimulationParams {
    return obj.endTime != null && obj.simStepSize != null && obj.statisticsStepSize != null
}

/**
 * Výchozí hodnota parametrů Spojitého blokového schéma
 */
export const defaultContBlocksSimulationParams : IContBlocksSimulationParams = {
    beginTime: 0,
    endTime: 30,
    simStepSize: 0.001,
    statisticsInterval: 100
}