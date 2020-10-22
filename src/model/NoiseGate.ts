import { Percent } from "./Types";

export interface NoiseGate {
    enabled: boolean;
    sustain: boolean;
    noiseLevel: Percent;
    release: Percent;
}