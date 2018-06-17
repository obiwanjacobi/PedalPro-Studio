import { Preset } from "./Preset";
import * as ModelPreset from "../model/Preset";
import { Notification } from "./notification/Notification";
import { ScreenState } from "./screen/ScreenState";
import { DeviceIdentity } from "../model/DeviceIdentity";
import { StorageBank } from "./storage/StorageBank";

export enum PresetCollectionType {
    device = "device",
    storage = "storage",
    factory = "factory",
    clipboard = "clipboard",
}

export interface ApplicationDocument {
    deviceInfo?: DeviceIdentity;
    empty?: ModelPreset.Preset;
    device: Preset[];
    storage: Preset[];
    banks: StorageBank[];
    factory: Preset[];
    clipboard: Preset[];
    screen: ScreenState;
    notifications: Notification[];
}