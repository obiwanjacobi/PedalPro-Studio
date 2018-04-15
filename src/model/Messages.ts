import { Fault } from "./Fault";
import { Preset } from "./Preset";
import { DeviceIdentity } from "./DeviceIdentity";
import { Bank } from "./Storage";

export interface DeviceResponse {
    fault?: Fault;
    device: DeviceIdentity;
}

export interface PresetRequest {
    presets: Preset[];
}

export interface PresetResponse {
    fault?: Fault;
    presets: Preset[];
}

export interface BankResponse {
    fault?: Fault;
    banks: Bank[];
}

export interface StorageResponse {
    fault?: Fault;
    bank: string;
    presets: Preset[];
}
