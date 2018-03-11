import DeviceIdentity from "../../model/DeviceIdentity";
import Preset from "../../model/Preset";
import VrFile from "../VrFile";
import PresetDeserializerEx from "./PresetDeserializerEx";
import PresetBufferEx from "./PresetBufferEx";
import { PresetBufferExFields } from "./PresetBufferExFields";
import { PresetBufferSize } from "./ConstantsEx";
import LogicalTransformerEx from "./LogicalTransformerEx";

export default class FactoryProviderEx {
    public readonly deviceIdentity: DeviceIdentity;
    public readonly presetCount: number;
    
    private readonly presets: Preset[];

    public constructor(path: string) {
        this.deviceIdentity = {
            vendor: "Vintage Revolution",
            device: "PedalProEx Factory Presets File",
            version: "8.1",
            supported: true
        };

        const file = VrFile.read(path, PresetBufferSize);
        this.presets = new Array<Preset>(file.presets.length);
        const buffer = new PresetBufferEx();
        for (let i = 0; i < file.presets.length; i++) {
            buffer.data = file.presets[i];

            const deserializer = new PresetDeserializerEx(PresetBufferExFields);
            const preset = deserializer.deserialize(buffer);
            LogicalTransformerEx.preset(preset);
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