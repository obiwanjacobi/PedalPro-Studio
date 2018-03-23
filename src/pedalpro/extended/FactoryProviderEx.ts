import Preset from "../../model/Preset";
import VrFile from "../VrFile";
import PresetDeserializerEx from "./PresetDeserializerEx";
import { PresetCount, PresetBufferSize } from "./ConstantsEx";
import LogicalTransformerEx from "./LogicalTransformerEx";
import CommonPresetProvider, { DeviceProfile } from "../CommonPresetProvider";
import PresetBuffer from "../PresetBuffer";

const DeviceExProfile: DeviceProfile = {
    presetCount: PresetCount,
    presetBufferSize: PresetBufferSize,
};

export default class FactoryProviderEx extends CommonPresetProvider {
    private readonly presets: Preset[];

    public constructor(path: string) {
        super(DeviceExProfile);
        
        const file = VrFile.read(path, PresetBufferSize);
        this.presets = new Array<Preset>(file.presets.length);
        const buffer = new PresetBuffer(PresetBufferSize);
        const deserializer = new PresetDeserializerEx();

        for (let i = 0; i < file.presets.length; i++) {
            buffer.data = file.presets[i];

            const preset = deserializer.deserialize(buffer);
            LogicalTransformerEx.presetToLogical(preset);
            preset.index = i;

            this.presets[i] = preset;
        }
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
}