import { Fault } from "./Fault";
import { Preset } from "./Preset";
import { DeviceIdentity } from "./DeviceIdentity";
import { Bank } from "./Storage";

export interface ResponseMessage {
    fault?: Fault;
}

export interface DeviceResponse extends ResponseMessage {
    device: DeviceIdentity;
}

export interface PresetRequest {
    presets: Preset[];
}

export interface PresetResponse extends ResponseMessage {
    presets: Preset[];
}

export interface BankResponse extends ResponseMessage {
    banks: Bank[];
}

export interface StorageResponse extends ResponseMessage {
    bank: string;
    presets: Preset[];
}
