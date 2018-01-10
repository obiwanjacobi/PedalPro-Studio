import { PresetCollection } from "./ApplicationDocument";
import Preset from "./Preset";

const CopyPresetsActionKey = "C/*/presets/*";

export interface CopyPresetsAction {
    readonly type: "C/*/presets/*";
    readonly presets: Preset[];
    readonly target: PresetCollection;
}

export const createCopyPresetsAction = (presets: Preset[], target: string): CopyPresetsAction => {
    return <CopyPresetsAction> { type: CopyPresetsActionKey, presets: presets, target: target };
};

export interface CopyPresets {
    copyPresets(presets: Preset[], target: string): void;
}