import { Dispatch } from "redux";

import { ApplicationDocument, PresetCollectionType } from "./ApplicationDocument";
import { DefaultClient } from "./Client";
import { Preset } from "./Preset";

export const SavePresetsActionKey: string = "U/*/presets/";

export interface SavePresetsAction {
    readonly type: "U/*/presets/";
    readonly source: PresetCollectionType;
    readonly presets: Preset[];
    readonly error: Error | null;
}

export const createSavePresetsAction = 
    (dispatch: Dispatch<ApplicationDocument>, 
     source: PresetCollectionType, presets: Preset[]): void => {
        DefaultClient.getSource(source).replacePresets(presets)
            .then((result) => {
            dispatch(
                { type: SavePresetsActionKey, source: source, presets: result, error: null });
        }).catch((error) => {
            dispatch(
                { type: SavePresetsActionKey, source: source, presets: null, error: error });
        });
};

export interface SavePresets {
    savePresets(source: PresetCollectionType, presets: Preset[]): void;
}