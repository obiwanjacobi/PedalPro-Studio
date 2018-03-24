import { Preset } from "../model/Preset";

export interface PresetProvider {
    presetCount: number;
    getPreset(_: number): Preset;
    getPresets(): Preset[];
    putPreset(preset: Preset): void;
    putPresets(presets: Preset[]): void;
}