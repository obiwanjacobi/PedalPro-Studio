import { DeviceIdentity } from "../../model/DeviceIdentity";

export enum PedalProDeviceModel {
    Unspecified = "unspecified",
    PedalPro = "PedalPro",
    Pedalino = "Pedalino",
    Reserved = "<reserved>",
    PedalProEx = "PedalProEx",
    AccousticBox = "AccousticBox"
}

export interface PedalProDeviceIdentity extends DeviceIdentity {
    model: PedalProDeviceModel;
}