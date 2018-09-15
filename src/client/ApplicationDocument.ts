import { Preset } from "./preset/Preset";
import * as ModelPreset from "../model/Preset";
import { Notification } from "./notification/Notification";
import { ScreenState } from "./screen/ScreenState";
import { DeviceIdentity } from "../model/DeviceIdentity";
import { StorageBank } from "./storage/StorageBank";
import { EffectState } from "./effects/EffectsState";

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
    banks?: StorageBank[];
    factory: Preset[];
    clipboard: Preset[];
    editEffects?: EffectState;
    screen: ScreenState;
    notifications: Notification[];
}