import { Dispatch } from "redux";

import { ApplicationDocument, PresetCollectionType } from "./ApplicationDocument";
import { DefaultClient, PresetsClient } from "./Client";
import { Preset } from "./Preset";
import { createDeviceInfoAction } from "./DevciceInfoAction";
import { ProgressInfo, ScreenState } from "./screen/ScreenState";
import { DeviceIdentity } from "../model/DeviceIdentity";
import { createUpdateScreenAction } from "./screen/UpdateScreenAction";

const pageSize = 20;

export const LoadPresetsActionKey: string = "R/*/presets/";

export interface LoadPresetsAction {
    readonly type: "R/*/presets/";
    readonly source: PresetCollectionType;
    readonly presets: Preset[] | null;
    readonly error: Error | null;
    readonly progress: ProgressInfo | null;
}

async function loadAllPresets(
    presetClient: PresetsClient, dispatch: Dispatch<ApplicationDocument>): Promise<void> {
        const presets = await presetClient.getPresets();
        dispatch({
            type: LoadPresetsActionKey, source: presetClient.collection, presets: presets, 
            error: null, progress: null
        });
}

const makeProgressInfo = (deviceInfo: DeviceIdentity, currentPreset: number): ProgressInfo => {
    return <ProgressInfo> { 
        title: deviceInfo.device, 
        message: `Loading preset ${currentPreset} of ${deviceInfo.presetCount}.`,
        percent: Math.round(currentPreset * 100 / deviceInfo.presetCount)
    };
};

async function loadPresetsPaged(
    presetClient: PresetsClient, page: number, dispatch: Dispatch<ApplicationDocument>, progress: ProgressInfo) {
    const presets = await presetClient.getPresetsPaged(page, pageSize);
    dispatch({ 
        type: LoadPresetsActionKey, source: presetClient.collection, presets: presets, 
        error: null, progress: progress
    });
}

async function loadPresets(
        deviceInfo: DeviceIdentity, presetClient: PresetsClient, dispatch: Dispatch<ApplicationDocument>) {
    try {
        for (let page = 0; page < deviceInfo.presetCount / pageSize; page++) {
            const progress = makeProgressInfo(deviceInfo, page * pageSize);
            await loadPresetsPaged(presetClient, page, dispatch, progress);
        }
        // dismiss progress
        dispatch(createUpdateScreenAction(new ScreenState()));
    } catch (error) {
        // dismiss progress
        dispatch(createUpdateScreenAction(new ScreenState()));
        throw error;
    }
}

const progressLoadPresets = (
    presetClient: PresetsClient, dispatch: Dispatch<ApplicationDocument>) => {

        dispatch(async (disp: Dispatch<ApplicationDocument>, getState: () => ApplicationDocument) => {
            const appDoc = getState();
            let deviceInfo = appDoc.deviceInfo;
        
            try {
                if (!deviceInfo) {
                    deviceInfo = await presetClient.getDeviceInfo();
                    disp(createDeviceInfoAction(deviceInfo));
                }

                await loadPresets(deviceInfo, presetClient, disp);
            } catch (error) {
                dispatch({
                    type: LoadPresetsActionKey, source: presetClient.collection, presets: null, 
                    error: error, progress: null
                });
            }
        });
};

export async function createLoadPresetsAction(
    dispatch: Dispatch<ApplicationDocument>, source: PresetCollectionType): Promise<void> {
        const presetClient = DefaultClient.getSource(source);

        try {
            switch (source) {
                case PresetCollectionType.device:
                progressLoadPresets(presetClient, dispatch);
                break;
                default:
                await loadAllPresets(presetClient, dispatch);
                break;
            }
        } catch (error) {
            dispatch({
                type: LoadPresetsActionKey, source: presetClient.collection, presets: null, 
                error: error, progress: null
            });
        }
}

export interface LoadPresets {
    loadPresets(source: PresetCollectionType): void;
}