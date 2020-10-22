import { Percent } from "./Types";

export enum DelayRouting {
    None,
    Left, 
    Right
}

export enum DelayRange {
    Short,
    Medium,
    Long
}

// Short: 23.7-99.4 ms step 0.3  
// Medium: 40.9-409.4 ms step 1.4~1.5  
// Long: 61.4-614.3 ms step 2.1~2.2
export type RelativeDelay = number;

export interface Delay {
    routing: DelayRouting;
    range: DelayRange;
    time: RelativeDelay;
    inputLevel: Percent;
    wet: Percent;
    outputLevel: Percent;
    feedback: Percent;

    modulation: boolean;
    modSpeed: Percent;
    modDepth: Percent;
}