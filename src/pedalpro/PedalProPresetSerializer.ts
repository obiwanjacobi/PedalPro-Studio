import PedalProPresetBuffer from "./PedalProPresetBuffer";
import Preset from "../model/Preset";

export default class PedalProPresetSerializer {
    public static deserialize(buffer: PedalProPresetBuffer): Preset {
        const preset: Preset = <Preset> { };

        preset.name = buffer.name.trim();
        preset.expression = buffer.expression;
        preset.stereo = buffer.stereo;

        return preset;
    }
}