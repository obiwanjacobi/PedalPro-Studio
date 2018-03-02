import PedalProDevice, { PresetCount } from "./PedalProDevice";
import PedalProReadPreset from "./PedalProReadPreset";
import PedalProPresetSerializer from "./PedalProPresetSerializer";

import PresetProvider from "../server/PresetProvider";
import Preset from "../model/Preset";

export default class PedalProProvider implements PresetProvider {

    private readonly device: PedalProDevice;

    public constructor() {
        this.device = new PedalProDevice();
    }

    public get presetCount(): number {
        return PresetCount;
    }

    public getPreset(presetIndex: number): Preset {
        if (!PedalProDevice.isValidPresetIndex(presetIndex)) { 
            throw new RangeError("Not a valid preset index.");
        }
        
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
        const cmd = new PedalProReadPreset(this.device);
        const buffer = cmd.read(presetIndex);
        const preset = PedalProPresetSerializer.deserialize(buffer);
        preset.index = presetIndex;
        
        return preset;
    }
}