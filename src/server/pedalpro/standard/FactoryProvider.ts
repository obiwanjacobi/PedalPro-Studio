import { Preset } from "../../../model/Preset";
import { VrFile } from "../VrFile";
import { PresetDeserializer } from "./PresetDeserializer";
import { DeviceStdProfile } from "./DeviceStdProfile";
import { LogicalTransformer } from "./LogicalTransformer";
import { CommonPresetProvider } from "../CommonPresetProvider";
import { PresetBuffer } from "../PresetBuffer";

export class FactoryProvider extends CommonPresetProvider {
    private readonly presets: Preset[];

    public constructor(path: string) {
        super(DeviceStdProfile);
        
        const file = VrFile.read(path, this.profile.presetBufferSize);
        this.presets = new Array<Preset>(file.presets.length);
        const buffer = new PresetBuffer(this.profile.presetBufferSize);
        const deserializer = new PresetDeserializer();

        for (let i = 0; i < file.presets.length; i++) {
            buffer.data = file.presets[i];

            const preset = deserializer.deserialize(buffer);
            LogicalTransformer.presetToLogical(preset);
            preset.index = i;

            this.presets[i] = preset;
        }
    }

    public getPresetsPaged(page: number, size: number): Preset[] {
        const start = page * size;
        return this.presets.slice(start, start + size);
    }

    public getPreset(presetIndex: number): Preset {
        return this.presets[presetIndex];
    }

    public getPresets(): Preset[] {
        return this.presets.filter((p) => !p.traits.empty);
    }

    public allPresets(): Preset[] {
        return this.presets;
    }

    protected setPreset(preset: Preset) {
        this.presets[preset.index] = preset;
    }
}