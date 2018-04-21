import { Preset, ItemUI } from "./Preset";
import { PresetCollectionType } from "./ApplicationDocument";

export const ChangePresetsActionKey: string = "U/*/presets/ui";

export interface ChangePresetsAction {
    readonly type: "U/*/presets/ui";
    readonly presets: Preset[];
    readonly source: PresetCollectionType;
    readonly ui: Partial<ItemUI>;
}

export const createChangePresetsAction = 
    (presets: Preset[], source: PresetCollectionType, command: Partial<ItemUI>): ChangePresetsAction => {
    return <ChangePresetsAction> { 
        type: ChangePresetsActionKey, 
        presets: presets, 
        source: source,
        ui: command
    };
};

export interface ChangePresets {
    changePresets(presets: Preset[], source: PresetCollectionType, command: Partial<ItemUI>): void;
}