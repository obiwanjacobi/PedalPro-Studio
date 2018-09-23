// -06 dB - +25 dB
export type BoostGain = number;

export interface Boost {
    enabled: boolean;
    gain: BoostGain;
}