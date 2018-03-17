import Preset from "../../model/Preset";
import VrFile from "../VrFile";
import PresetDeserializerEx from "./PresetDeserializerEx";
import { PresetBufferSize } from "./ConstantsEx";
import LogicalTransformerEx from "./LogicalTransformerEx";
import PresetProvider from "../../server/PresetProvider";
import PresetBuffer from "../PresetBuffer";

export default class FactoryProviderEx extends PresetProvider {
    private readonly presets: Preset[];

    public constructor(path: string) {
        super();
        
        const file = VrFile.read(path, PresetBufferSize);
        this.presets = new Array<Preset>(file.presets.length);
        const buffer = new PresetBuffer(PresetBufferSize);
        for (let i = 0; i < file.presets.length; i++) {
            buffer.data = file.presets[i];

            const deserializer = new PresetDeserializerEx();
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