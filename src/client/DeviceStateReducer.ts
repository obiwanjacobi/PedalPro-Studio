import { ApplicationDocument } from "./ApplicationDocument";
import { DeviceIdentity } from "../model/DeviceIdentity";
import * as ModelPreset from "../model/Preset";
import { DeviceInfoAction } from "./DevciceInfoAction";

// all actions this reducer handles
export type DeviceAction = DeviceInfoAction;

const reduceDeviceInfo = (
    state: ApplicationDocument, deviceInfo: DeviceIdentity, empty?: ModelPreset.Preset): ApplicationDocument => {
    
    return state.copyOverrideDeviceInfo(deviceInfo, empty);
};

export const reduce = (state: ApplicationDocument, action: DeviceAction): ApplicationDocument => {
    switch (action.type) {
        case "R/device":
        return reduceDeviceInfo(state, action.deviceInfo, action.empty);

        default:
        return state;
    }
};