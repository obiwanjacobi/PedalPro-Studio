import Preset from "../model/Preset";
import DeviceIdentity from "../model/DeviceIdentity";

export default interface PresetProvider {
    deviceIdentity: DeviceIdentity;
    presetCount: number;
    getPreset(presetIndex: number): Preset;
    getPresets(): Preset[];
}