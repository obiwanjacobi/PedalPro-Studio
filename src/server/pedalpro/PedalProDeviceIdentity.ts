import { DeviceIdentity } from "../model/DeviceIdentity";

export enum PedalProDeviceModel {
    Unspecified,
    PedalPro,
    Pedalino,
    Reserved,
    PedalProEx,
    AccousticBox
}

export interface PedalProDeviceIdentity extends DeviceIdentity {
    model: PedalProDeviceModel;
}