import Preset from "../model/Preset";

export default interface PresetProvider {
    presetCount: number;
    getPreset(presetIndex: number): Preset;
    getPresets(): Preset[];
}