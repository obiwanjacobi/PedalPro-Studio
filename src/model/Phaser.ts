import { PhaseShift, Percent, TempoSpeed, WaveForm } from "./Types";

export default interface Phaser {
    enabled: boolean;
    manual: Percent;
    tempo: TempoSpeed;
    wave: WaveForm;
    depth: Percent;
    phase: PhaseShift;
}