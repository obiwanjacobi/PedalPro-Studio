import Preset from "./Preset";

export const SelectPresetsActionKey: string = "U/*/presets/.selected";

export interface SelectPresetsAction {
    readonly type: "U/*/presets/.selected";
    readonly presets: Preset[];
    readonly selected?: boolean;
    readonly expanded?: boolean;
}

export const createSelectPresetsAction = 
    (presets: Preset[], selected?: boolean, expanded?: boolean): SelectPresetsAction => {
    return <SelectPresetsAction> { 
        type: SelectPresetsActionKey, 
        presets: presets, 
        selected: selected, 
        expanded: expanded
    };
};

export interface SelectPresets {
    selectPresets(presets: Preset[], command: {selected?: boolean, expanded?: boolean}): void;
}