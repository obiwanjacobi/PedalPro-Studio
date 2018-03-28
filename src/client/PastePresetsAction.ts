import { PresetCollectionType } from "./ApplicationDocument";
import { Preset } from "./Preset";

const PastePresetsActionKey = "C/*/presets/";

export interface PastePresetsAction {
    readonly type: "C/*/presets/";
    readonly presets: Preset[];
    readonly target: PresetCollectionType;
}

export const createPastePresetsAction = (presets: Preset[], target: PresetCollectionType): PastePresetsAction => {
    return <PastePresetsAction> { type: PastePresetsActionKey, presets: presets, target: target };
};

export interface PastePresets {
    pastePresets(presets: Preset[], target: PresetCollectionType): void;
}