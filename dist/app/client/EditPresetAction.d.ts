import Preset from "./Preset";
export declare const EditPresetActionKey: string;
export interface EditPresetAction {
    readonly type: "U/*/presets/.*";
    readonly preset: Preset;
    readonly update: Partial<Preset>;
}
export declare const createEditPresetAction: (preset: Preset, update: Partial<Preset>) => EditPresetAction;
export interface EditPreset {
    editPreset(preset: Preset, update: Partial<Preset>): void;
}
