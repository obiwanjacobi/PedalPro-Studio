import { PedalProDeviceUsb, PresetCount } from "./PedalProDevice";
import PedalProReadPreset from "./PedalProReadPreset";
import PedalProPresetSerializer from "./PedalProPresetSerializer";
import EntityFilter from "../model/EntityFilter";
import PresetProvider from "../model/PresetProvider";
import Preset from "../model/Preset";

export default class PedalProProvider implements PresetProvider {

    private readonly device: PedalProDeviceUsb;
    private readonly cache: Preset[];

    public constructor(device: PedalProDeviceUsb) {
        this.device = device;
        this.cache = new Array<Preset>(PresetCount);
    }

    public get presetCount(): number {
        return PresetCount;
    }

    public async getPreset(presetIndex: number): Promise<Preset> {
        if (this.cache[presetIndex]) {
            return this.cache[presetIndex];
        }

        this.ensureConnected();

        const cmd = new PedalProReadPreset(this.device);
        const buffer = await cmd.read(presetIndex);
        const preset = PedalProPresetSerializer.deserialize(buffer);
        preset.index = presetIndex;
        
        // add to cache
        this.cache[presetIndex] = preset;

        return preset;
    }

    public async getPresets(filter: EntityFilter): Promise<Preset[]> {
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