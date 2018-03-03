import Fault from "./Fault";
import Preset from "./Preset";

export default interface PresetResponse {
    fault?: Fault;
    presets: Preset[];
}