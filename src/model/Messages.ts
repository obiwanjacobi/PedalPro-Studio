import Fault from "./Fault";
import Preset from "./Preset";
import DeviceIdentity from "./DeviceIdentity";

export interface PresetResponse {
    fault?: Fault;
    presets: Preset[];
}

export interface DeviceResponse {
    fault?: Fault;
    device: DeviceIdentity;
}