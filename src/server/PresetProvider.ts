import { Preset, PresetIndex } from "../model/Preset";

export interface PresetProvider {
    presetCount: number;
    getEmptyPreset(): Preset;
    getPreset(_: PresetIndex): Preset;
    getPresets(): Preset[];
    getPresetsPaged(page: number, size: number): Preset[];
    putPreset(preset: Preset): void;
    putPresets(presets: Preset[]): void;
    deletePreset(presetIndex: PresetIndex): Preset;
}