import { PedalProDevice } from "../PedalProDevice";
import { PresetDeserializer } from "./PresetDeserializer";
import { DeviceCommands } from "../DeviceCommands";
import { DeviceStdProfile } from "./DeviceStdProfile";
import { CommonPresetProvider, DeviceProfile } from "../CommonPresetProvider";
import { Preset } from "../../model/Preset";
import { LogicalTransformer } from "./LogicalTransformer";
import { PresetBuffer } from "../PresetBuffer";
import { PresetSerializer } from "./PresetSerializer";
import { PresetMeta } from "../../model/PresetMeta";
import { PedalProDeviceIdentity } from "../PedalProDeviceIdentity";

export class PedalProProvider extends CommonPresetProvider {
    protected readonly commands: DeviceCommands;
    protected readonly identity: PedalProDeviceIdentity;

    public constructor(
        device: PedalProDevice, identity: PedalProDeviceIdentity, profile: DeviceProfile = DeviceStdProfile) {
        super(profile);
        this.commands = new DeviceCommands(device);
        this.identity = identity;
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

    public getPresetsPaged(page: number, size: number): Preset[] {
        if (page < 0 || size <= 0) { throw new RangeError("Page and Size must be possitive."); }

        const presets = new Array<Preset>();
        const start = page * size;

        if (start < this.profile.presetCount) { 
            let end = start + size;
            if (end >= this.profile.presetCount) { end = this.profile.presetCount; }

            for (let index = start; index < end; index++) {
                presets.push(this.onePreset(index));
            }
        }

        return presets;
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

    protected createMeta(): PresetMeta {
        return { device: `${this.identity.model}` };
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
        preset.meta = this.createMeta();
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