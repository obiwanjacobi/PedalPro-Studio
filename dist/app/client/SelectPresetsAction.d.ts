import Preset from "./Preset";
export declare const SelectPresetsActionKey: string;
export interface SelectPresetsAction {
    readonly type: "U/*/presets/.selected";
    readonly presets: Preset[];
    readonly selected: boolean;
}
export declare const createSelectPresetsAction: (presets: Preset[], selected: boolean) => SelectPresetsAction;
export interface SelectPresets {
    selectPresets(presets: Preset[], selected: boolean): void;
}
