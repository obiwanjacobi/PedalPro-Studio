import { Percent } from "./Types";

export default interface NoiseGate {
    enabled: boolean;
    sustain: boolean;
    noiseLevel: Percent;
    release: Percent;
}