import { PedalProDeviceUsb } from "./PedalProDevice";
import PresetProvider from "../model/PresetProvider";
import Preset from "../model/Preset";
export default class PedalProProvider implements PresetProvider {
    private readonly device;
    private readonly cache;
    constructor(device: PedalProDeviceUsb);
    readonly presetCount: number;
    getPreset(presetIndex: number): Promise<Preset>;
    getPresets(): Promise<Preset[]>;
    allPresets(): Promise<Preset[]>;
    private ensureConnected();
}
