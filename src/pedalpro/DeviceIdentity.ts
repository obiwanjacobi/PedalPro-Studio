export enum PedalProDeviceModel {
    Unspecified,
    PedalPro,
    Pedalino,
    Reserved,
    PedalProEx,
    AccousticBox
}

export default interface DeviceIdentity {
    vendor: string;
    name: string;
    version: string;
    model: PedalProDeviceModel;
}