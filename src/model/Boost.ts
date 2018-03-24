export enum BoostGain {
    // -06 dB - +25 dB
}

export interface Boost {
    enabled: boolean;
    gain: BoostGain;
}