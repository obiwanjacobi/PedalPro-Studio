import { Dispatch } from "react-redux";

import { PresetCollectionType } from "./ApplicationDocument";
import { DefaultClient } from "./Client";
import { Preset } from "./Preset";

export interface SavePresetsAction {
    readonly type: "U/*/presets/";
    readonly source: PresetCollectionType;
    readonly presets?: Preset[];
    readonly error?: Error;
}

export const createSavePresetsAction = 
    (dispatch: Dispatch<SavePresetsAction>, 
     source: PresetCollectionType, presets: Preset[]): void => {
        DefaultClient.getSource(source).replacePresets(presets)
            .then((result) => {
            dispatch(
                { type: "U/*/presets/", source: source, presets: result });
        }).catch((error) => {
            dispatch(
                { type: "U/*/presets/", source: source, error: error });
        });
};

export interface SavePresets {
    savePresets(source: PresetCollectionType, presets: Preset[]): void;
}