import { Preset } from "./Preset";
import { PresetCollectionType } from "./ApplicationDocument";

export const SelectPresetsActionKey: string = "U/*/presets/.selected";

export interface SelectPresetsAction {
    readonly type: "U/*/presets/.selected";
    readonly presets: Preset[];
    readonly source: PresetCollectionType;
    readonly selected?: boolean;
    readonly expanded?: boolean;
}

export const createSelectPresetsAction = 
    (presets: Preset[], source: PresetCollectionType, command: 
        { selected?: boolean, expanded?: boolean}): SelectPresetsAction => {
    return <SelectPresetsAction> { 
        type: SelectPresetsActionKey, 
        presets: presets, 
        source: source,
        selected: command.selected,
        expanded: command.expanded
    };
};

export interface SelectPresets {
    selectPresets(presets: Preset[], source: PresetCollectionType, command: 
        {selected?: boolean, expanded?: boolean}): void;
}