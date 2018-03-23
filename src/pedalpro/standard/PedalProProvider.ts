import PedalProDevice from "../PedalProDevice";
import PresetDeserializer from "./PresetDeserializer";
import DeviceCommands from "../DeviceCommands";
import { PresetCount, PresetBufferSize } from "./Constants";
import CommonPresetProvider, { DeviceProfile } from "../CommonPresetProvider";
import Preset from "../../model/Preset";
import LogicalTransformer from "./LogicalTransformer";
import PresetBuffer from "../PresetBuffer";
import PresetSerializer from "./PresetSerializer";

const DeviceProfile: DeviceProfile = {
    presetCount: PresetCount,
    presetBufferSize: PresetBufferSize,
};

export default class PedalProProvider extends CommonPresetProvider {
    protected readonly commands: DeviceCommands;

    public constructor(device: PedalProDevice, profile: DeviceProfile = DeviceProfile) {
        super(profile);
        this.commands = new DeviceCommands(device);
    }

    public putPreset(preset: Preset) {
        const buffer = new PresetBuffer(this.profile.presetBufferSize);
        this.serialize(buffer, preset);
        this.commands.write(buffer, preset.index);
    }

    public putPresets(presets: Preset[]) {
        const buffer = new PresetBuffer(this.profile.presetBufferSize);

        for (let i = 0; i < presets.length; i++) {
            const preset = presets[i];

            buffer.clear();
            this.serialize(buffer, preset);
            this.commands.write(buffer, preset.index);
        }
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
        const presets = new Array<Preset>(this.profile.presetCount);
        
        for (let index = 0; index < this.profile.presetCount; index++) {
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
        const buffer = new PresetBuffer(this.profile.presetBufferSize);
        this.commands.read(presetIndex, buffer);
        const preset = this.deserialize(buffer);
        preset.index = presetIndex;
        return preset;
    }
}