import * as Model from "../../model/Effects";
import { Compressor } from "./compressor/Compressor";
import { Boost } from "./boost/Boost";
import { Distortion } from "./distortion/Distortion";
import { VoltageControlledAmp } from "./vca/VoltageControlledAmp";
import { Phaser } from "../../model/Phaser";
import { Volume } from "../../model/Volume";
import { Filters } from "./filters/Filters";
import { Modulation } from "../../model/Modulation";
import { Delay } from "../../model/Delay";
import { Aux } from "./auxRouting/AuxRouting";
import { PreAmp } from "./preamp/PreAmp";
import { Dsp } from "../../model/Dsp";
import { NoiseGate } from "../../model/NoiseGate";
import { TapTempo } from "../../model/TapTempo";
import { Midi } from "../../model/Midi";

export interface Effects extends Model.Effects {
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

export interface EffectsEx extends Model.EffectsEx {
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