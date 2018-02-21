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
        if (!PedalProDeviceUsb.isValidPresetIndex(presetIndex)) { 
            throw new RangeError("Not a valid preset index.");
        }
        
        return this.onePreset(presetIndex);
    }

    public async getPresets(): Promise<Preset[]> {
        this.ensureConnected();

        const presets = await this.allPresets();
        return presets.filter((p) => !p.empty);
    }

    public async allPresets(): Promise<Preset[]> {
        const presets = new Array(PresetCount);
        
        for (let index = 0; index < PresetCount; index++) {
            presets[index] = await this.onePreset(index);
        }

        return presets;
    }

    private async onePreset(presetIndex: number): Promise<Preset> {
        const cmd = new PedalProReadPreset(this.device);
        const buffer = await cmd.read(presetIndex);
        const preset = PedalProPresetSerializer.deserialize(buffer);
        preset.index = presetIndex;
        
        return preset;
    }

    private ensureConnected(): Error | null {
        if (!this.device.isConnected) {
            try {
                this.device.connect();
                // return  null;
            } catch (error) {
                throw new Error("Cannot connect to Device.");
            }
        }
        return  null;
    }
}