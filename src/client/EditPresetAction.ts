import Preset from "./Preset";

export const EditPresetActionKey: string = "U/*/presets/.*";

export interface EditPresetAction {
    readonly type: "U/*/presets/.*";
    readonly preset: Preset;
    readonly update: Partial<Preset>;
}

export const createEditPresetAction = (preset: Preset, update: Partial<Preset>): EditPresetAction => {
    return <EditPresetAction> { type: EditPresetActionKey, preset: preset, update: update };
};

export interface EditPreset {
    editPreset(preset: Preset, update: Partial<Preset>): void;
}