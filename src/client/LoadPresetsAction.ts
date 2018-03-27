import { Dispatch } from "redux";

import { ApplicationDocument, PresetCollectionType } from "./ApplicationDocument";
import { Client, PresetsClient } from "./Client";
import { Preset } from "./Preset";
import { createDeviceInfoAction } from "./DevciceInfoAction";
import { ProgressInfo, ScreenState } from "./screen/ScreenState";
import { DeviceIdentity } from "../model/DeviceIdentity";
import { createUpdateScreenAction } from "./screen/UpdateScreenAction";

const client = new Client(0x04d8);
const pageSize = 20;

export const LoadPresetsActionKey: string = "R/*/presets/";

export interface LoadPresetsAction {
    readonly type: "R/*/presets/";
    readonly source: PresetCollectionType;
    readonly presets: Preset[] | null;
    readonly error: Error | null;
    readonly progress: ProgressInfo | null;
}

const loadAllPresets = 
    (presetClient: PresetsClient, dispatch: Dispatch<ApplicationDocument>): void => {
        presetClient.getPresets()
            .then((result) => {
                dispatch({
                    type: LoadPresetsActionKey, source: presetClient.collection, presets: result, 
                    error: null, progress: null
                });
            }).catch((error) => {
                throw error;
            });
};

const makeProgressInfo = (deviceInfo: DeviceIdentity, currentPreset: number): ProgressInfo => {
    return <ProgressInfo> { 
        title: deviceInfo.device, 
        message: `Loading preset ${currentPreset + 1} of ${deviceInfo.presetCount}.`,
        percent: Math.round(currentPreset * 100 / deviceInfo.presetCount)
    };
};

async function loadPreset(
    presetClient: PresetsClient, presetIndex: number, dispatch: Dispatch<ApplicationDocument>, progress: ProgressInfo) {
    const preset = await presetClient.getPreset(presetIndex);
    dispatch({ 
        type: LoadPresetsActionKey, source: presetClient.collection, presets: [preset], 
        error: null, progress: progress
    });
}

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
    for (let page = 0; page < deviceInfo.presetCount / pageSize; page++) {
        const progress = makeProgressInfo(deviceInfo, page * pageSize);
        await loadPresetsPaged(presetClient, page, dispatch, progress);
    }

    // dismiss progress
    dispatch(createUpdateScreenAction(new ScreenState()));
}

// async function loadPresets(
//     deviceInfo: DeviceIdentity, presetClient: PresetsClient, dispatch: Dispatch<ApplicationDocument>) {
//     for (let index = 0; index < deviceInfo.presetCount; index++) {
//         const progress = makeProgressInfo(deviceInfo, index);
//         await loadPreset(presetClient, index, dispatch, progress);
//     }

//     // dismiss progress
//     dispatch(createUpdateScreenAction(new ScreenState()));
// }

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

export const createLoadPresetsAction = 
    (dispatch: Dispatch<ApplicationDocument>, 
     source: PresetCollectionType): void => {
        const presetClient = client.getSource(source);

        try {
            switch (source) {
                case PresetCollectionType.device:
                progressLoadPresets(presetClient, dispatch);
                break;
                default:
                loadAllPresets(presetClient, dispatch);
                break;
            }

        } catch (error) {
            dispatch({
                type: LoadPresetsActionKey, source: presetClient.collection, presets: null, 
                error: error, progress: null
            });
        }
};

export interface LoadPresets {
    loadPresets(source: PresetCollectionType): void;
}