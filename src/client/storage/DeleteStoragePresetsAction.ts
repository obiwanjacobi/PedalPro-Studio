import { Preset } from "../preset/Preset";

export interface DeleteStoragePresetsAction {
    readonly type: "D/storage/*/presets/";
    readonly presets: Preset[];
}

export const createDeleteStoragePresetsAction = (presets: Preset[]): DeleteStoragePresetsAction => {
    return { type: "D/storage/*/presets/", presets: presets };
};

export interface DeleteStoragePresets {
    deleteStoragePresets(presets: Preset[]): void;
}