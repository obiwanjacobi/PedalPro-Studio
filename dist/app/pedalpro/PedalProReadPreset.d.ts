import { PedalProDeviceUsb } from "./PedalProDevice";
import PedalProPresetBuffer from "./PedalProPresetBuffer";
export default class PedalProReadPreset {
    private device;
    private static isCommandDone(command, response);
    constructor(device: PedalProDeviceUsb);
    read(presetIndex: number): Promise<PedalProPresetBuffer>;
    _read(presetIndex: number): Promise<PedalProPresetBuffer>;
}
