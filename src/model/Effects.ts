import { Compressor } from "./Compressor";
import { Distortion } from "./Distortion";
import { Boost } from "./Boost";
import { NoiseGate } from "./NoiseGate";
import { VoltageControlledAmp } from "./VoltageControlledAmp";
import { Filters } from "./Filters";
import { Volume } from "./Volume";
import { Modulation } from "./Modulation";
import { Delay } from "./Delay";
import { Aux } from "./AuxRouting";
import { PreAmp } from "./PreAmp";
import { Dsp } from "./Dsp";
import { Phaser } from "./Phaser";
import { TapTempo } from "./TapTempo";
import { Midi } from "./Midi";

export interface Effects {
    compressor: Compressor;
    boost: Boost;
    distortion: Distortion;
    vca: VoltageControlledAmp;
    phaser: Phaser;
    volume: Volume;
    filters: Filters;
    modulation: Modulation;
    delay: Delay;
    aux: Aux;
    noiseGate: NoiseGate;
    tap: TapTempo;
    midi: Midi;
}

export interface EffectsEx {
    compressor: Compressor;
    boost: Boost;
    pre: PreAmp;
    vca: VoltageControlledAmp;
    phaser: Phaser;
    volume: Volume;
    filters: Filters;
    modulation: Modulation;
    delay: Delay;
    aux: Aux;
    dsp: Dsp;
    noiseGate: NoiseGate;
    tap: TapTempo;
    midi: Midi;
}
