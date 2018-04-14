import { PresetCollectionType } from "./ApplicationDocument";
import { Preset } from "./Preset";

export const DeletePresetsActionKey: string = "D/*/presets/";

export interface DeletePresetsAction {
    readonly type: "D/*/presets/";
    readonly source: PresetCollectionType;
    readonly presets: Preset[];
}

export const createDeletePresetsAction = (source: PresetCollectionType, presets: Preset[]): DeletePresetsAction => {
    return <DeletePresetsAction> { type: DeletePresetsActionKey, presets: presets, source: source };
};

export interface DeletePresets {
    deletePresets(source: PresetCollectionType, presets: Preset[]): void;
}