import { Dispatch } from "redux";

import { ApplicationDocument, PresetCollectionType } from "./ApplicationDocument";
import { DefaultClient } from "./Client";
import { Preset } from "./Preset";

export const DeletePresetsActionKey: string = "D/*/presets/";

export interface DeletePresetsAction {
    readonly type: "D/*/presets/";
    readonly source: PresetCollectionType;
    readonly presets: Preset[];
    readonly error: Error | null;
}

export const createDeletePresetsAction = 
    (dispatch: Dispatch<ApplicationDocument>, 
     source: PresetCollectionType, presets: Preset[]): void => {
        DefaultClient.getSource(source).deletePresets(presets)
            .then((result) => {
            dispatch(
                { type: DeletePresetsActionKey, source: source, presets: result, error: null });
        }).catch((error) => {
            dispatch(
                { type: DeletePresetsActionKey, source: source, presets: null, error: error });
        });
};

export interface DeletePresets {
    deletePresets(source: PresetCollectionType, presets: Preset[]): void;
}