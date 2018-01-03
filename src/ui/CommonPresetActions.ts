import Preset from "../client/Preset";
import EntityFilter from "../model/EntityFilter";

export interface LoadPresets {
    loadPresets(source: string, filter: EntityFilter | null): Promise<void>;
}

export interface PresetSelected {
    presetSelected(presets: Preset[], selected: boolean): void;
}

export interface CopyPresets {
    copyPresets(presets: Preset[], target: string): void;
}