import { PresetCollectionType } from "../ApplicationDocument";
import { Preset } from "./Preset";

export interface PastePresetsAction {
    readonly type: "C/*/presets/";
    readonly presets: Preset[];
    readonly target: PresetCollectionType;
    readonly deleteAfterPaste: boolean;
}

export const createPastePresetsAction = 
    (presets: Preset[], target: PresetCollectionType, deleteAfterPaste: boolean = true): PastePresetsAction => {
    return { 
        type: "C/*/presets/", presets: presets, target: target, deleteAfterPaste: deleteAfterPaste 
    };
};

export interface PastePresets {
    pastePresets(presets: Preset[], target: PresetCollectionType, deleteAfterPaste: boolean): void;
}