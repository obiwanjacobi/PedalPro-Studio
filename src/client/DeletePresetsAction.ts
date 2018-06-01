import { PresetCollectionType } from "./ApplicationDocument";
import { Preset } from "./Preset";

export interface DeletePresetsAction {
    readonly type: "D/*/presets/";
    readonly source: PresetCollectionType;
    readonly presets: Preset[];
}

export const createDeletePresetsAction = (source: PresetCollectionType, presets: Preset[]): DeletePresetsAction => {
    return { type: "D/*/presets/", presets: presets, source: source };
};

export interface DeletePresets {
    deletePresets(source: PresetCollectionType, presets: Preset[]): void;
}