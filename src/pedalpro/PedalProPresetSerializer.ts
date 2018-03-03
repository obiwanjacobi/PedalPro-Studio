import PedalProPresetBuffer from "./commands/PedalProPresetBuffer";
import { EmptyPresetBuffer } from "./EmptyPresetBuffer";
import Preset from "../model/Preset";

export default class PedalProPresetSerializer {
    public static deserialize(buffer: PedalProPresetBuffer): Preset {
        const preset: Preset = <Preset> { };

        preset.data = buffer.formatData(10);

        preset.name = buffer.name.trim();
        preset.expression = buffer.expression;
        preset.stereo = buffer.stereo;
        preset.empty = EmptyPresetBuffer.isEmpty(buffer);
        
        return preset;
    }
}