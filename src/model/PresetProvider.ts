import Preset from "./Preset";
import EntityFilter from "./EntityFilter";

export default interface PresetProvider {
    presetCount: number;
    getPreset(presetIndex: number): Promise<Preset>;
    getPresets(filter: EntityFilter): Promise<Preset[]>;
}