import PedalProDevice from "../PedalProDevice";
import PresetSerializer from "./PresetSerializer";
import ReadPreset from "./ReadPreset";
import { PresetCount } from "./Constants";

import PresetProvider from "../../server/PresetProvider";
import Preset from "../../model/Preset";
import DeviceIdentity from "../../model/DeviceIdentity";

export default class PedalProProvider implements PresetProvider {
    protected readonly device: PedalProDevice;

    public static throwIfNotValidPresetIndex(presetIndex: number) {
        if (!PedalProProvider.isValidPresetIndex(presetIndex)) {
            throw new RangeError(`The Preset index is not valid (0-${PresetCount - 1}).`);
        }
    }

    public static isValidPresetIndex(presetIndex: number): boolean {
        return presetIndex >= 0 && presetIndex < PresetCount;
    }

    public constructor(device: PedalProDevice) {
        this.device = device;
    }

    public get deviceIdentity(): DeviceIdentity {
        if (this.device.Id) {
            return this.device.Id;
        }
        return { vendor: "", device: "", version: "", supported: false };
    }

    public get presetCount(): number {
        return PresetCount;
    }

    public getPreset(presetIndex: number): Preset {
        PedalProProvider.throwIfNotValidPresetIndex(presetIndex);
        return this.onePreset(presetIndex);
    }

    public getPresets(): Preset[] {
        const presets = this.allPresets();
        return presets.filter((p) => !p.empty);
    }

    public allPresets(): Preset[] {
        const presets = new Array(PresetCount);
        
        for (let index = 0; index < PresetCount; index++) {
            presets[index] = this.onePreset(index);
        }

        return presets;
    }

    private onePreset(presetIndex: number): Preset {
        const cmd = new ReadPreset(this.device);
        const buffer = cmd.read(presetIndex);
        const preset = PresetSerializer.deserialize(buffer);
        preset.index = presetIndex;
        
        return preset;
    }
}