import { Dispatch } from "react-redux";

import { PresetsClient } from "./Client";
import { ApplicationDocument } from "./ApplicationDocument";
import { createDeviceInfoAction } from "./DevciceInfoAction";
import { DeviceIdentity } from "../model/DeviceIdentity";
import { createUpdateScreenAction } from "./screen/UpdateScreenAction";
import { ProgressInfo } from "./screen/ScreenState";
import { createLoadPresetsAction, createLoadPresetsErrorAction, LoadPresetsAction } from "./LoadPresetsAction";
import { ScreenBuilder } from "./screen/ScreenBuilder";

const pageSize = 20;

export async function loadAllPresets(
    presetClient: PresetsClient, dispatch: Dispatch<LoadPresetsAction>): Promise<void> {
        const presets = await presetClient.getPresets();
        dispatch(createLoadPresetsAction(presetClient.collection, presets));
}

const makeProgressInfo = (deviceInfo: DeviceIdentity, currentPreset: number): ProgressInfo => {
    return <ProgressInfo> { 
        title: deviceInfo.device, 
        message: `Loading preset ${currentPreset} of ${deviceInfo.presetCount}.`,
        percent: Math.round(currentPreset * 100 / deviceInfo.presetCount)
    };
};

async function loadPresetsPaged(
    presetClient: PresetsClient, page: number, dispatch: Dispatch<LoadPresetsAction>, progress: ProgressInfo) {
    const presets = await presetClient.getPresetsPaged(page, pageSize);
    dispatch(createLoadPresetsAction(presetClient.collection, presets, progress));
}

async function loadPresets(
        deviceInfo: DeviceIdentity, presetClient: PresetsClient, dispatch: Dispatch<LoadPresetsAction>) {
    try {
        for (let page = 0; page < deviceInfo.presetCount / pageSize; page++) {
            const progress = makeProgressInfo(deviceInfo, page * pageSize);
            await loadPresetsPaged(presetClient, page, dispatch, progress);
        }
    } catch (error) {
        throw error;
    } finally {
        // dismiss progress
        dispatch(createUpdateScreenAction(ScreenBuilder.default));
    }
}

export const progressLoadPresets = (
    presetClient: PresetsClient, dispatch: Dispatch) => {

        // since updating (redux/thunk/TS) this errors out: 
        //   the thunk extension on Dispatch is not recognized.
        // At runtime it still works though...
        // @ts-ignore
        dispatch(async (disp: Dispatch, getState: () => ApplicationDocument) => {
            const appDoc = getState();
            let deviceInfo = appDoc.deviceInfo;
        
            try {
                if (!deviceInfo) {
                    deviceInfo = await presetClient.getDeviceInfo();
                    const empty = await presetClient.getEmptyPreset();
                    disp(createDeviceInfoAction(deviceInfo, empty));
                }

                await loadPresets(deviceInfo, presetClient, disp);
            } catch (error) {
                disp(createLoadPresetsErrorAction(presetClient.collection, error));
            }
        });
};
