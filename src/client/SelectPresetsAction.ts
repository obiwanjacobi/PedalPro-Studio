import Preset from "./Preset";

export const SelectPresetsActionKey: string = "U/*/presets/.selected";

export interface SelectPresetsAction {
    readonly type: "U/*/presets/.selected";
    readonly presets: Preset[];
    readonly selected: boolean;
}

export const createSelectPresetsAction = (presets: Preset[], selected: boolean): SelectPresetsAction => {
    return <SelectPresetsAction> { type: SelectPresetsActionKey, presets: presets, selected: selected };
};

export interface SelectPresets {
    selectPresets(presets: Preset[], selected: boolean): void;
}