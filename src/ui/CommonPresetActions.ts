import Preset from "../client/Preset";
import EntityFilter from "../model/EntityFilter";

export interface LoadPresets {
    loadPresets(source: string, filter: EntityFilter | null): Promise<void>;
}

export interface Selected {
    presetSelected(preset: Preset, selected: boolean): void;
}
