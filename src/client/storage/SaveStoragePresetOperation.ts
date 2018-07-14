import { Dispatch } from "react-redux";
import { PresetsClient } from "../Client";
import { getProgressInfo, savePresetsAsync } from "../preset/SavePresetOperations";
import { PresetCollectionType, ApplicationDocument } from "../ApplicationDocument";
import { Preset } from "../preset/Preset";
import { dispatchLoadStorageBankPresetsAction } from "./LoadStorageBankPresetsAction";
import { createAddFaultAction } from "../AddFaultAction";
import { distinct } from "../../ArrayExtensions";

export const progressSaveStoragePresets = (
    presetClient: PresetsClient, presets: Preset[], dispatch: Dispatch) => {
    
    if (presets.length === 0) { return; }
    // since updating (redux/thunk/TS) this errors out: 
    //   the thunk extension on Dispatch is not recognized.
    // At runtime it still works though...
    // @ts-ignore
    dispatch(async (disp: Dispatch, getState: () => ApplicationDocument) => {
        const appDoc = getState();

        try {
            const progressInfo = getProgressInfo(PresetCollectionType.storage, presets, appDoc.deviceInfo);
            await savePresetsAsync(presetClient, progressInfo, presets, disp);
            // Do not use the presets returned from savePresetsAsync, 
            // but reload so the presets have their group set.
            const banks = presets
                .map(p => p.group ? p.group.name : "")
                .filter(b => b && b.length);
            distinct(banks).forEach(b => dispatchLoadStorageBankPresetsAction(disp, b));
        } catch (error) {
            disp(createAddFaultAction(PresetCollectionType.storage, error));
        }
    });
};