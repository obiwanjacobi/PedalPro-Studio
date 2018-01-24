import PedalProPresetBuffer from "./PedalProPresetBuffer";
import Preset from "../model/Preset";
export default class PedalProPresetSerializer {
    static deserialize(buffer: PedalProPresetBuffer): Preset;
}
