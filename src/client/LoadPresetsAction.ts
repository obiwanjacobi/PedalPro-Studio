import { Dispatch } from "redux";

import { ApplicationDocument, PresetCollectionType } from "./ApplicationDocument";
import { Client } from "./Client";
import { Preset } from "./Preset";

const client = new Client(0x04d8);

export const LoadPresetsActionKey: string = "R/*/presets/";

export interface LoadPresetsAction {
    readonly type: "R/*/presets/";
    readonly source: PresetCollectionType;
    readonly presets: Preset[] | null;
    readonly error: Error | null;
}

export const createLoadPresetsAction = 
    (dispatch: Dispatch<ApplicationDocument>, 
     source: PresetCollectionType): void => {
        client.getSource(source).getPresets()
            .then((result) => {
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