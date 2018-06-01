import { DeviceIdentity } from "../model/DeviceIdentity";
import * as ModelPreset from "../model/Preset";

export interface DeviceInfoAction {
    readonly type: "R/device";
    readonly deviceInfo: DeviceIdentity;
    readonly empty?: ModelPreset.Preset;
}

export const createDeviceInfoAction = (deviceInfo: DeviceIdentity, empty?: ModelPreset.Preset): DeviceInfoAction => {
    return { type: "R/device", deviceInfo: deviceInfo, empty: empty };
};
