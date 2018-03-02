import { Percent } from "./Types";

export enum DistortionLowPass {
    High = 0,
    Mid = 1,
    Low = 2
}

export default interface Distortion {
    enabled: boolean;
    bright: boolean;
    tone: Percent;
    lowPass: DistortionLowPass;
    level: Percent;
}