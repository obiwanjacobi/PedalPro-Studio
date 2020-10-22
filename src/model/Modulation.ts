import { TempoSpeed, Percent, PhaseShift } from "./Types";

export enum ModulationMode {
    None,
    Chorus,
    ChorusVibe,
    Flanger
}

export enum ModulationWaveForm {
    Sine,
    Triangle,
    Trapezoidal,
    Rectangle,
    Exponential,
    Shelf1,
    Shelf2
}

export enum Harmonics {
    Odd,
    Even
}

export interface Chorus {
    bright: boolean;
    tempo: TempoSpeed;
    level: Percent;
    depth: Percent;
    phase: PhaseShift;
    wave: ModulationWaveForm;
    wet: Percent;
}

export interface Vibe {
    boost: boolean;
    tempo: TempoSpeed;
    depth: Percent;
    phase: PhaseShift;
    wave: ModulationWaveForm;
}

export interface Flanger {
    harmonics: Harmonics;
    tempo: TempoSpeed;
    feedback: Percent;
    depth: Percent;
    wave: ModulationWaveForm;
    delay: Percent;
    wet: Percent;
}

export interface Modulation {
    mode: ModulationMode;

    chorus: Chorus;
    vibe: Vibe;
    flanger: Flanger;
}