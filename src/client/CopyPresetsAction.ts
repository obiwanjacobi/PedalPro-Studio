import { Preset } from "./Preset";

export interface CopyPresetsAction {
    readonly type: "C/clipboard/presets/";
    readonly presets: Preset[];
}

export const createCopyPresetsAction = (presets: Preset[]): CopyPresetsAction => {
    return { type: "C/clipboard/presets/", presets: presets };
};

export interface CopyPresets {
    copyPresets(presets: Preset[]): void;
}