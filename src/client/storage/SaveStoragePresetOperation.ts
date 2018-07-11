import { Dispatch } from "react-redux";
import { PresetsClient } from "../Client";
import { getProgressInfo, savePresetsAsync } from "../preset/SavePresetOperations";
import { PresetCollectionType, ApplicationDocument } from "../ApplicationDocument";
import { Preset } from "../preset/Preset";
import { dispatchLoadStorageBankPresetsAction } from "./LoadStorageBankPresetsAction";
import { dispatchDeleteStorageBankAction } from "./DeleteStorageBankAction";
import { createAddFaultAction } from "../AddFaultAction";

export const progressSaveStoragePresets = (
    presetClient: PresetsClient, presets: Preset[], dispatch: Dispatch) => {
    
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
            banks.forEach(b => dispatchLoadStorageBankPresetsAction(disp, b));
            const renamedBanks = presets
                .filter(p => p.group && p.group.name !== p.group.originName)
                .map(p => p.group ? p.group.originName : "")
                .filter(n => n.length)
                .map(n => appDoc.banks.find(b => b.name === n));
            renamedBanks.forEach(b => b ? dispatchDeleteStorageBankAction(disp, b) : null);
        } catch (error) {
            disp(createAddFaultAction(PresetCollectionType.storage, error));
        }
    });
};