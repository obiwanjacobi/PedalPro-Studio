import { Preset } from "../preset/Preset";

export interface PasteStoragePresetsAction {
    readonly type: "C/storage/*/presets/";
    readonly presets: Preset[];
    readonly deleteAfterPaste: boolean;
}

export const createPasteStoragePresetsAction = 
    (presets: Preset[], deleteAfterPaste: boolean = true): PasteStoragePresetsAction => {
    return { 
        type: "C/storage/*/presets/", presets: presets, deleteAfterPaste: deleteAfterPaste 
    };
};

export interface PasteStoragePresets {
    pasteStoragePresets(presets: Preset[], deleteAfterPaste: boolean): void;
}