import { FilterRouting } from "./Filters";
import { ModulationMode } from "./Modulation";
import { DelayRouting } from "./Delay";
import { AuxRouting } from "./AuxRouting";

export class MidiRouting {
    filter: FilterRouting;
    modulation: ModulationMode;
    delay: DelayRouting;
    aux: AuxRouting;
}

export interface Midi {
    routing: MidiRouting;
}