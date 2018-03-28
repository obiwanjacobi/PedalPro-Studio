import { PresetCollectionType } from "./ApplicationDocument";
import { Preset } from "./Preset";

const CopyPresetsActionKey = "C/clipboard/presets/";

export interface CopyPresetsAction {
    readonly type: "C/clipboard/presets/";
    readonly presets: Preset[];
    readonly target: PresetCollectionType;
}

export const createCopyPresetsAction = (presets: Preset[], target: PresetCollectionType): CopyPresetsAction => {
    return <CopyPresetsAction> { type: CopyPresetsActionKey, presets: presets, target: target };
};

export interface CopyPresets {
    copyPresets(presets: Preset[], target: PresetCollectionType): void;
}