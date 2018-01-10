import { Dispatch } from "redux";

import ApplicationDocument from "./ApplicationDocument";
import Client from "./Client";
import Preset from "./Preset";
import { PresetCollection } from "./ApplicationDocument";

export const LoadPresetsActionKey: string = "R/device/presets/*";

export interface LoadPresetsAction {
    readonly type: "R/device/presets/*";
    readonly source: PresetCollection;
    readonly presets: Preset[] | null;
    readonly error: Error | null;
}

export const createLoadPresetsAction = 
    (dispatch: Dispatch<ApplicationDocument>, 
     source: PresetCollection): Promise<void> => {
        return getPresets().then((result) => {
            dispatch(<LoadPresetsAction> 
                { type: LoadPresetsActionKey, source: source, presets: result, error: null });
        }).catch((reason) => {
            dispatch(<LoadPresetsAction> 
                { type: LoadPresetsActionKey, source: source, presets: null, error: new Error(reason) });
        });
};

async function getPresets(): Promise<Preset[]> {
    const client = new Client();
    return await client.getPresets();
}

export interface LoadPresets {
    loadPresets(source: PresetCollection): Promise<void>;
}