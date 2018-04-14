import { Preset, PresetUI } from "./Preset";
import { PresetCollectionType } from "./ApplicationDocument";

export const ChangePresetsActionKey: string = "U/*/presets/ui";

export interface ChangePresetsAction {
    readonly type: "U/*/presets/ui";
    readonly presets: Preset[];
    readonly source: PresetCollectionType;
    readonly ui: Partial<PresetUI>;
}

export const createChangePresetsAction = 
    (presets: Preset[], source: PresetCollectionType, command: Partial<PresetUI>): ChangePresetsAction => {
    return <ChangePresetsAction> { 
        type: ChangePresetsActionKey, 
        presets: presets, 
        source: source,
        ui: command
    };
};

export interface ChangePresets {
    changePresets(presets: Preset[], source: PresetCollectionType, command: Partial<PresetUI>): void;
}