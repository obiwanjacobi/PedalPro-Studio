import { DeviceIdentity } from "../model/DeviceIdentity";

export const DeviceInfoActionKey: string = "U/device";

export interface DeviceInfoAction {
    readonly type: "U/device";
    readonly deviceInfo: DeviceIdentity;
}

export const createDeviceInfoAction = (deviceInfo: DeviceIdentity): DeviceInfoAction => {
    return <DeviceInfoAction> { type: DeviceInfoActionKey, deviceInfo: deviceInfo };
};
