import { Dispatch } from "redux";

import ApplicationDocument from "./ApplicationDocument";
import Client from "./Client";
import Preset from "./Preset";
import EntityFilter from "../model/EntityFilter";

export const LoadPresetsActionKey: string = "R/device/presets/*";

export interface LoadPresetsAction {
    readonly type: "R/device/presets/*";
    readonly source: string;
    readonly presets: Preset[] | null;
    readonly error: Error | null;
}

export const createLoadPresetsAction = 
    (dispatch: Dispatch<ApplicationDocument>, 
     source: string, filter: EntityFilter | null = null): Promise<void> => {
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
