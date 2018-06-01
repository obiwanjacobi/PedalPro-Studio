import { Preset } from "./Preset";
import { ItemUI } from "./ItemUI";
import { PresetCollectionType } from "./ApplicationDocument";

export interface ChangePresetsAction {
    readonly type: "U/*/presets/ui";
    readonly presets: Preset[];
    readonly source: PresetCollectionType;
    readonly ui: Partial<ItemUI>;
}

export const createChangePresetsAction = 
    (presets: Preset[], source: PresetCollectionType, command: Partial<ItemUI>): ChangePresetsAction => {
    return { 
        type: "U/*/presets/ui", 
        presets: presets, 
        source: source,
        ui: command
    };
};

export interface ChangePresets {
    changePresets(presets: Preset[], source: PresetCollectionType, command: Partial<ItemUI>): void;
}