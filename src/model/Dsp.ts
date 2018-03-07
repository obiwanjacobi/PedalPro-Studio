import { Percent } from "./Types";

export enum DspType {
    MedHall,
    BigHall,
    Room,
    Church,
    Reverse,
    Gated,
    Chapel,
    Spring,
    // ***
    DoubleDelay,
    CaveDelay,
    SingleTap,
    FourTapsDelay,
    TripleDelay,
    Plate,
    Spring2,
    Hall,
    FreeVerb,
}

export default interface Dsp {
    enabled: boolean;
    type: DspType;
    input: Percent;
    dry: Percent;
    wet: Percent;
    data: string;
}