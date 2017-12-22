import PedalProPresetBuffer from "./PedalProPresetBuffer";
import Preset from "../model/Preset";

export default class PedalProPresetSerializer {
    public static deserialize(buffer: PedalProPresetBuffer): Preset {
        const preset = new Preset();

        preset.name = buffer.name.trimRight();

        return preset;
    }
}