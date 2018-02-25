import Preset from "./Preset";

export default interface PresetProvider {
    presetCount: number;
    getPreset(presetIndex: number): Preset;
    getPresets(): Preset[];
}