import { Dispatch } from "react-redux";

import { PresetCollectionType } from "./ApplicationDocument";
import { DefaultClient } from "./Client";
import { Preset } from "./Preset";
import { ProgressInfo } from "./screen/ScreenState";
import { progressLoadPresets, loadAllPresets } from "./LoadPresetsOperation";

export const LoadPresetsActionKey: string = "R/*/presets/";

export interface LoadPresetsAction {
    readonly type: "R/*/presets/";
    readonly source: PresetCollectionType;
    readonly presets?: Preset[];
    readonly error?: Error;
    readonly progress?: ProgressInfo;
}

export const createLoadPresetsAction = (source: PresetCollectionType, presets: Preset[], progress?: ProgressInfo) => {
    return {
        type: LoadPresetsActionKey, source: source, presets: presets, progress: progress
    };
};

export const createLoadPresetsErrorAction = (source: PresetCollectionType, error: Error) => {
    return {
        type: LoadPresetsActionKey, source: source, error: error
    };
};

export async function dispatchLoadPresetsAction(
    dispatch: Dispatch<LoadPresetsAction>, source: PresetCollectionType): Promise<void> {

    const presetClient = DefaultClient.getSource(source);

    try {
        switch (source) {
            case PresetCollectionType.storage:
            throw new Error("Invalid Operation: Storage has separate Actions.");

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