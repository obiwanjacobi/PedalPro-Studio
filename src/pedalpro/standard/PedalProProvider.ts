import PedalProDevice from "../PedalProDevice";
import PresetDeserializer from "./PresetDeserializer";
import PresetCommands from "../PresetCommands";
import { PresetCount, PartSize, PresetBufferSize, LastPartSize } from "./Constants";

import PresetProvider from "../../server/PresetProvider";
import Preset from "../../model/Preset";
import LogicalTransformer from "./LogicalTransformer";
import PresetBuffer from "../PresetBuffer";
import PresetSerializer from "./PresetSerializer";
import { DeviceProfile } from "../DeviceCommand";

const DeviceProfile: DeviceProfile = {
    presetCount: PresetCount,
    presetBufferSize: PresetBufferSize,
    partSize: PartSize,
    lastPartSize: LastPartSize
};

export default class PedalProProvider extends PresetProvider {
    private readonly commands: PresetCommands;
    private readonly profile: DeviceProfile;

    public throwIfNotValidPresetIndex(presetIndex: number) {
        if (!this.isValidPresetIndex(presetIndex)) {
            throw new RangeError(`The Preset index is not valid (0-${this.profile.presetCount - 1}).`);
        }
    }

    public isValidPresetIndex(presetIndex: number): boolean {
        return presetIndex >= 0 && presetIndex < this.profile.presetCount;
    }

    public constructor(device: PedalProDevice, profile: DeviceProfile = DeviceProfile) {
        super();
        this.profile = profile;
        this.commands = new PresetCommands(device, profile);
    }

    public putPreset(preset: Preset) {
        const buffer = new PresetBuffer(this.profile.presetBufferSize);
        this.serialize(buffer, preset);
        this.commands.write(buffer, preset.index);
    }

    public getPreset(presetIndex: number): Preset {
        this.throwIfNotValidPresetIndex(presetIndex);
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

    protected serialize(buffer: PresetBuffer, preset: Preset): void {
        LogicalTransformer.presetFromLogical(preset);
        const serializer = new PresetSerializer();
        serializer.serialize(buffer, preset);
    }

    protected deserialize(buffer: PresetBuffer): Preset {
        const deserializer = new PresetDeserializer();
        const preset = deserializer.deserialize(buffer);
        LogicalTransformer.presetToLogical(preset);
        return preset;
    }

    private onePreset(presetIndex: number): Preset {
        const buffer = this.commands.read(presetIndex);
        const preset = this.deserialize(buffer);
        preset.index = presetIndex;
        return preset;
    }
}