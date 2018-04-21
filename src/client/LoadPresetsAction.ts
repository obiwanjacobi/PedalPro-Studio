import { Dispatch } from "redux";

import { ApplicationDocument, PresetCollectionType } from "./ApplicationDocument";
import { DefaultClient } from "./Client";
import { Preset } from "./Preset";
import { ProgressInfo } from "./screen/ScreenState";
import { progressLoadPresets, loadAllPresets } from "./LoadPresetsOperation";

export const LoadPresetsActionKey: string = "R/*/presets/";

export interface LoadPresetsAction {
    readonly type: "R/*/presets/";
    readonly source: PresetCollectionType;
    readonly presets: Preset[] | null;
    readonly error: Error | null;
    readonly progress: ProgressInfo | null;
}

export const createLoadPresetsAction = (
    source: PresetCollectionType, presets: Preset[], progress: ProgressInfo | null = null) => {

    return {
        type: LoadPresetsActionKey, source: source, presets: presets, error: null, progress: progress
    };
};

export const createLoadPresetsErrorAction = (source: PresetCollectionType, error: Error) => {
    return {
        type: LoadPresetsActionKey, source: source, presets: null, error: error, progress: null
    };
};

export async function dispatchLoadPresetsAction(
    dispatch: Dispatch<ApplicationDocument>, source: PresetCollectionType): Promise<void> {

    const presetClient = DefaultClient.getSource(source);

    try {
        switch (source) {
            case PresetCollectionType.storage:
            // loadStorageBanks(dispatch);
            break;

            case PresetCollectionType.device:
            progressLoadPresets(presetClient, dispatch);
            break;
            
            default:
            await loadAllPresets(presetClient, dispatch);
            break;
        }
    } catch (error) {
        dispatch(createLoadPresetsErrorAction(presetClient.collection, error));
    }
}

export interface LoadPresets {
    loadPresets(source: PresetCollectionType): void;
}