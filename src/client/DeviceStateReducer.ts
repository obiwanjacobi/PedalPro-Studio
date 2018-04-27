import { ApplicationDocument } from "./ApplicationDocument";
import { DeviceIdentity } from "../model/DeviceIdentity";
import * as ModelPreset from "../model/Preset";
import { DeviceInfoAction } from "./DevciceInfoAction";
import { ApplicationDocumentBuilder } from "./ApplicationDocumentBuilder";

// all actions this reducer handles
export type DeviceAction = DeviceInfoAction;

const reduceDeviceInfo = (
    state: ApplicationDocument, deviceInfo: DeviceIdentity, empty?: ModelPreset.Preset): ApplicationDocument => {
    
    const builder = new ApplicationDocumentBuilder(state);
    builder.mutable.deviceInfo = deviceInfo;
    builder.mutable.empty = empty;
    return builder.detach();
};

export const reduce = (state: ApplicationDocument, action: DeviceAction): ApplicationDocument => {
    switch (action.type) {
        case "R/device":
        return reduceDeviceInfo(state, action.deviceInfo, action.empty);

        default:
        return state;
    }
};