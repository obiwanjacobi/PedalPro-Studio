import { Dispatch } from "react-redux";
import { PresetsClient } from "../Client";
import { getProgressInfo, savePresetsAsync } from "../preset/SavePresetOperations";
import { createSaveStoragePresetsErrorAction } from "./SaveStoragePresetsAction";
import { PresetCollectionType } from "../ApplicationDocument";
import { Preset } from "../preset/Preset";
import { dispatchLoadStorageBankPresetsAction } from "./LoadStorageBankPresetsAction";

export const progressSaveStoragePresets = (
    presetClient: PresetsClient, presets: Preset[], dispatch: Dispatch) => {
    
    // since updating (redux/thunk/TS) this errors out: 
    //   the thunk extension on Dispatch is not recognized.
    // At runtime it still works though...
    // @ts-ignore
    dispatch(async (disp: Dispatch, getState: () => ApplicationDocument) => {
        const appDoc = getState();
        let deviceInfo = appDoc.deviceInfo;
    
        const progressInfo = getProgressInfo(PresetCollectionType.storage, presets, deviceInfo);

        try {
            await savePresetsAsync(presetClient, progressInfo, presets, disp);
            // Do not use the presets returned from save, 
            // but reload so the presets have their group set.
            const banks = presets.map(p => p.group ? p.group.name : "");
            banks.filter(b => b && b.length)
                .forEach(b => dispatchLoadStorageBankPresetsAction(disp, b)
            );
        } catch (error) {
            disp(createSaveStoragePresetsErrorAction(error));
        }
    });
};