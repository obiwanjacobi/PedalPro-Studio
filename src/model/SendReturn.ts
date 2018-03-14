// Weird stuff happens when you name this file Aux.ts

import { Percent } from "./Types";

export enum AuxRouting {
    None,
    LeftOnly,
    RightOnly,
    SeriesLeft,
    Mixer
}

export interface AmpSwitches {
    switch1: boolean;
    switch2: boolean;
    switch3: boolean;
    switch4: boolean;
}

export default interface Aux {
    routing: AuxRouting;

    mixGainSendL: Percent;
    mixGainSendR: Percent;
    mixDryLevelL: Percent;
    mixDryLevelR: Percent;
    mixWetLevelL: Percent;
    mixWetLevelR: Percent;

    switches: AmpSwitches;
}