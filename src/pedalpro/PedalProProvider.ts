import { PedalProDeviceUsb, PresetCount } from "./PedalProDevice";
import PedalProReadPreset from "./PedalProReadPreset";
import PedalProPresetSerializer from "./PedalProPresetSerializer";

import PresetProvider from "../model/PresetProvider";
import Preset from "../model/Preset";

export default class PedalProProvider implements PresetProvider {

    private readonly device: PedalProDeviceUsb;

    public constructor(device: PedalProDeviceUsb) {
        this.device = device;
    }

    public get presetCount(): number {
        return PresetCount;
    }

    public async getPreset(presetIndex: number): Promise<Preset> {
        this.ensureConnected();

        const cmd = new PedalProReadPreset(this.device);
        const buffer = await cmd.read(presetIndex);
        const preset = PedalProPresetSerializer.deserialize(buffer);
        preset.index = presetIndex;
        
        return preset;
    }

    public async getPresets(): Promise<Preset[]> {
        return this.allPresets();
    }

    public async allPresets(): Promise<Preset[]> {
        const presets = new Array(PresetCount);
        
        for (let index = 0; index < PresetCount; index++) {
            presets[index] = await this.getPreset(index);
        }

        return presets;
    }

    private ensureConnected() {
        if (!this.device.isConnected) {
            this.device.connect();
        }
    }
}