import { FilterRouting } from "./Filters";
import { ModulationMode } from "./Modulation";
import { DelayRouting } from "./Delay";
import { AuxRouting } from "./SendReturn";

export class MidiRouting {
    filter: FilterRouting;
    modulation: ModulationMode;
    delay: DelayRouting;
    aux: AuxRouting;
}

export default class Midi {
    routing: MidiRouting;
}