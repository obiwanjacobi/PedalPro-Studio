import DeviceIdentity from "../../model/DeviceIdentity";
import Preset from "../../model/Preset";
import VrFile from "../VrFile";
import PresetDeserializerEx from "./PresetDeserializerEx";
import PresetBufferEx from "./PresetBufferEx";
import { PresetBufferExFields } from "./PresetBufferExFields";
import { PresetBufferSize } from "../standard/Constants";

export default class FactoryExProvider {
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

        for (let i = 0; i < file.presets.length; i++) {
            const buffer = new PresetBufferEx();
            buffer.data = file.presets[i];

            const deserializer = new PresetDeserializerEx(PresetBufferExFields);
            const preset = deserializer.deserialize(buffer);
            preset.index = i;

            this.presets[i] = preset;
        }
    }

    public getPreset(presetIndex: number): Preset {
        return this.presets[presetIndex];
    }

    public getPresets(): Preset[] {
        return this.presets;
    }
}