import { Dispatch } from "redux";

import { PresetCollectionType } from "../ApplicationDocument";
import { DefaultClient } from "../Client";
import { Preset } from "./Preset";
import { ProgressInfo } from "../screen/ScreenState";
import { progressLoadPresets, loadAllPresets } from "./LoadPresetsOperation";
import { createAddFaultAction } from "../AddFaultAction";
import { createCopyPresetsAction } from "./CopyPresetsAction";

export interface LoadPresetsAction {
    readonly type: "R/*/presets/";
    readonly source: PresetCollectionType;
    readonly presets: Preset[];
    readonly progress?: ProgressInfo;
}

export const createLoadPresetsAction =
    (source: PresetCollectionType, presets: Preset[], progress?: ProgressInfo): LoadPresetsAction => {
        return {
            type: "R/*/presets/", source: source, presets: presets, progress: progress
        };
    };

export async function dispatchLoadPresetsAction(
    dispatch: Dispatch, source: PresetCollectionType): Promise<void> {

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

        // clear clipboard
        dispatch(createCopyPresetsAction([]));

    } catch (error) {
        dispatch(createAddFaultAction(presetClient.collection, error));
    }
}

export interface LoadPresets {
    loadPresets(source: PresetCollectionType): void;
}