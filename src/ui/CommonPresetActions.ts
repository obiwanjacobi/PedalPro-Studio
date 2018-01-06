import Preset from "../client/Preset";

export interface LoadPresets {
    loadPresets(source: string): Promise<void>;
}

export interface SelectPresets {
    selectPresets(presets: Preset[], selected: boolean): void;
}

export interface CopyPresets {
    copyPresets(presets: Preset[], target: string): void;
}