import { Preset } from "./Preset";

const CopyPresetsActionKey = "C/clipboard/presets/";

export interface CopyPresetsAction {
    readonly type: "C/clipboard/presets/";
    readonly presets: Preset[];
}

export const createCopyPresetsAction = (presets: Preset[]): CopyPresetsAction => {
    return <CopyPresetsAction> { type: CopyPresetsActionKey, presets: presets };
};

export interface CopyPresets {
    copyPresets(presets: Preset[]): void;
}