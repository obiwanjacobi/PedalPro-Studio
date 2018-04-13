import { Preset } from "../model/Preset";

export interface PresetProvider {
    presetCount: number;
    getEmptyPreset(): Preset;
    getPreset(_: number): Preset;
    getPresets(): Preset[];
    getPresetsPaged(page: number, size: number): Preset[];
    putPreset(preset: Preset): void;
    putPresets(presets: Preset[]): void;
    deletePreset(presetIndex: number): Preset;
}