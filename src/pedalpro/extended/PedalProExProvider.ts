import PedalProDevice from "../PedalProDevice";
import PedalProProvider from "../standard/PedalProProvider";
import Preset from "../../model/Preset";

import { PresetCount } from "./ConstantsEx";
import ReadPresetEx from "./ReadPresetEx";
import { PresetBufferExFields } from "./PresetBufferExFields";
import PresetDeserializerEx from "./PresetDeserializerEx";
import LogicalTransformerEx from "./LogicalTransformerEx";

export default class PedalProExProvider extends PedalProProvider {

    public static throwIfNotValidPresetIndex(presetIndex: number) {
        if (!PedalProProvider.isValidPresetIndex(presetIndex)) {
            throw new RangeError(`The Preset index is not valid (0-${PresetCount - 1}).`);
        }
    }

    public static isValidPresetIndex(presetIndex: number): boolean {
        return presetIndex >= 0 && presetIndex < PresetCount;
    }

    public constructor(device: PedalProDevice) {
        super(device);
    }

    public get presetCount(): number {
        return PresetCount;
    }

    public getPreset(presetIndex: number): Preset {
        PedalProExProvider.throwIfNotValidPresetIndex(presetIndex);
        return this.onePresetEx(presetIndex);
    }

    public getPresets(): Preset[] {
        const presets = this.allPresets();
        return presets.filter((p) => !p.traits.empty);
    }

    public allPresets(): Preset[] {
        const presets = new Array(PresetCount);
        
        for (let index = 0; index < PresetCount; index++) {
            presets[index] = this.onePresetEx(index);
        }

        return presets;
    }

    private onePresetEx(presetIndex: number): Preset {
        const cmd = new ReadPresetEx(this.device);
        const buffer = cmd.read(presetIndex);
        const deserializer = new PresetDeserializerEx(PresetBufferExFields);
        const preset = deserializer.deserialize(buffer);
        LogicalTransformerEx.preset(preset);
        preset.index = presetIndex;
        
        return preset;
    }
}