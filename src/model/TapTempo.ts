export enum TapTempoMode {
    Master, Delay, Tremolo, Filters, None
}

export enum TapTempoDivision {
    Quarter,
    Eighth,
    DotEighth
}

export default class TapTempo {
    mode: TapTempoMode;
    tempoDivision: TapTempoDivision;
    tempoDivisionDelay: TapTempoDivision;
}