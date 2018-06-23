import { Dispatch } from "react-redux";
import { PresetsClient } from "../Client";
import { createSavePresetsErrorAction, createSavePresetsAction } from "./SavePresetsAction";
import { PresetCollectionType } from "../ApplicationDocument";
import { ProgressInfo } from "../screen/ScreenState";
import { createUpdateScreenAction } from "../screen/UpdateScreenAction";
import { ScreenBuilder } from "../screen/ScreenBuilder";
import { Preset } from "../preset/Preset";
import { DeviceIdentity } from "../../model/DeviceIdentity";

const pageSize = 20;

function makeProgressInfo(title: string, count: number, current: number): ProgressInfo {
    return { 
        title: title, 
        message: `Saving preset ${current} of ${count}.`,
        percent: Math.round(current * 100 / count)
    };
}

function getProgressInfo(source: PresetCollectionType, presets: Preset[], deviceInfo: DeviceIdentity) {
    switch (source) {
        case PresetCollectionType.device:
            return { title: deviceInfo.device, count: deviceInfo.presetCount };
    
        case PresetCollectionType.storage:
            // @ts-ignore: bank always set for storage presets
            const group = presets[0].group.name;
            return { title: `${source.toUpperCase()} - ${group}`, count: presets.length };
        default:
            break;
    }

    return { title: source.toUpperCase(), count: presets.length };
}

async function savePresets(
        presetClient: PresetsClient, 
        {title, count}: {title: string, count: number}, 
        presets: Preset[], 
        dispatch: Dispatch): Promise<Preset[]> {

    try {
        const savedPresets = new Array<Preset>();        

        for (let page = 0; page < count / pageSize; page++) {
            const pageIndex = page * pageSize;
            
            dispatch(createUpdateScreenAction({progress: makeProgressInfo(title, count, pageIndex)}));

            const pagedPresets = presets.slice(pageIndex, pageIndex + pageSize);
            const replacedPresets = await presetClient.replacePresets(pagedPresets);
            savedPresets.push(...replacedPresets);
        }

        return savedPresets;
    } catch (error) {
        throw error;
    } finally {
        // dismiss progress
        dispatch(createUpdateScreenAction(ScreenBuilder.default));
    }
}

export const progressSavePresets = (
    presetClient: PresetsClient, source: PresetCollectionType, presets: Preset[], dispatch: Dispatch) => {
    
    // since updating (redux/thunk/TS) this errors out: 
    //   the thunk extension on Dispatch is not recognized.
    // At runtime it still works though...
    // @ts-ignore
    dispatch(async (disp: Dispatch, getState: () => ApplicationDocument) => {
        const appDoc = getState();
        let deviceInfo = appDoc.deviceInfo;
    
        const progressInfo = getProgressInfo(source, presets, deviceInfo);

        try {
            const savedPresets = await savePresets(presetClient, progressInfo, presets, disp);
            dispatch(createSavePresetsAction(source, savedPresets));
        } catch (error) {
            disp(createSavePresetsErrorAction(presetClient.collection, error));
        }
    });
};