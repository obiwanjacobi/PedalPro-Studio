import { Dispatch } from "redux";

import ApplicationDocument, { PresetCollectionType } from "./ApplicationDocument";
import Client from "./Client";
import Preset from "./Preset";

const client = new Client();

export const LoadPresetsActionKey: string = "R/device/presets/";

export interface LoadPresetsAction {
    readonly type: "R/device/presets/";
    readonly source: PresetCollectionType;
    readonly presets: Preset[] | null;
    readonly error: Error | null;
}

export const createLoadPresetsAction = 
    (dispatch: Dispatch<ApplicationDocument>, 
     source: PresetCollectionType): void => {
        client.getPresets().then((result) => {
            dispatch(
                { type: LoadPresetsActionKey, source: source, presets: result, error: null });
        }).catch((error) => {
            dispatch(
                { type: LoadPresetsActionKey, source: source, presets: null, error: error });
        });
};

export interface LoadPresets {
    loadPresets(source: PresetCollectionType): void;
}