import Compressor from "./Compressor";
import Distortion from "./Distortion";
import Boost from "./Boost";
import NoiseGate from "./NoiseGate";
import VoltageControlledAmp from "./VoltageControlledAmp";
import Filters from "./Filters";
import Volume from "./Volume";
import Modulation from "./Modulation";
import Delay from "./Delay";
import Aux from "./SendReturn";
import PreAmp from "./PreAmp";

export default interface Preset {
    /**
     * The index or position of this preset in the collection (order).
     */
    index: number;

    /**
     * The name of the preset - does not have to be unique.
     */
    name: string;

    /** 
     * An indication if the preset uses an Expression Pedal.
     */
    expression: boolean;

    /**
     * An indication if the preset is stereo.
     */
    stereo: boolean;

    /**
     * Indicates if this preset is considered empty.
     */
    empty: boolean;

    /**
     * Raw data
     */
    data?: string;

    /**
     * Effects
     */
    compressor?: Compressor;
    boost?: Boost;
    noiseGate?: NoiseGate;
    vca?: VoltageControlledAmp;
    filters?: Filters;
    volume?: Volume;
    modulation?: Modulation;
    delay?: Delay;
    aux?: Aux;

    // pre version 7
    distortion?: Distortion;
    // post version 7 (Ex)
    pre?: PreAmp;
}