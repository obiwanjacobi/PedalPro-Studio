import PedalProDevice from "../PedalProDevice";
import PresetDeserializer from "./PresetDeserializer";
import ReadPreset from "./ReadPreset";
import { PresetCount } from "./Constants";

import PresetProvider from "../../server/PresetProvider";
import Preset from "../../model/Preset";
import { PresetBufferFields } from "./PresetBufferFields";
import LogicalTransformer from "./LogicalTransformer";
import PresetBuffer from "../PresetBuffer";
import WritePreset from "./WritePreset";
import { PresetBufferSize } from "../extended/ConstantsEx";

export default class PedalProProvider extends PresetProvider {
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
        super();
        this.device = device;
    }

    public putPreset(preset: Preset) {
        const buffer = new PresetBuffer(PresetBufferSize);
        
        const writer = new WritePreset(this.device);
        writer.write(buffer, preset.index);
    }

    public getPreset(presetIndex: number): Preset {
        PedalProProvider.throwIfNotValidPresetIndex(presetIndex);
        return this.onePreset(presetIndex);
    }

    public getPresets(): Preset[] {
        const presets = this.allPresets();
        return presets.filter((p) => !p.traits.empty);
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
        
        const deserializer = new PresetDeserializer(PresetBufferFields);
        const preset = deserializer.deserialize(buffer);
        LogicalTransformer.presetToLogical(preset);
        preset.index = presetIndex;
        
        return preset;
    }
}