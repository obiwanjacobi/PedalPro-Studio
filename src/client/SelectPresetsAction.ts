import Preset from "./Preset";

export const SelectPresetsActionKey: string = "U/*/preset.selected";

export interface SelectPresetsAction {
    readonly type: "U/*/preset.selected";
    readonly presets: Preset[];
    readonly selected: boolean;
}

export const createSelectPresetsAction = (presets: Preset[], selected: boolean): SelectPresetsAction => {
    return <SelectPresetsAction> { type: SelectPresetsActionKey, presets: presets, selected: selected };
};