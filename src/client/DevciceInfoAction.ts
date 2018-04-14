import { DeviceIdentity } from "../model/DeviceIdentity";
import * as ModelPreset from "../model/Preset";

export const DeviceInfoActionKey: string = "R/device";

export interface DeviceInfoAction {
    readonly type: "R/device";
    readonly deviceInfo: DeviceIdentity;
    readonly empty?: ModelPreset.Preset;
}

export const createDeviceInfoAction = (deviceInfo: DeviceIdentity, empty?: ModelPreset.Preset): DeviceInfoAction => {
    return <DeviceInfoAction> { type: DeviceInfoActionKey, deviceInfo: deviceInfo, empty: empty };
};
