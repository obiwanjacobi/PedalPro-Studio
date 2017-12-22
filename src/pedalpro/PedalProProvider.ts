import PresetProvider from "../model/PresetProvider";
import { PedalProDeviceUsb } from "./PedalProDevice";
import Preset from "../model/Preset";
import PedalProReadPreset from "./PedalProReadPreset";
import PedalProPresetSerializer from "./PedalProPresetSerializer";

export default class PedalProProvider implements PresetProvider {

    private readonly device: PedalProDeviceUsb;

    public constructor(device: PedalProDeviceUsb) {
        this.device = device;
    }

    public get presetCount(): number {
        return 400;
    }

    public async getPreset(presetIndex: number): Promise<Preset> {
        this.ensureConnected();
        
        const cmd = new PedalProReadPreset(this.device);
        const buffer = await cmd.read(presetIndex);
        return PedalProPresetSerializer.deserialize(buffer);
    }

    private ensureConnected() {
        if (!this.device.isConnected) {
            this.device.connect();
        }
    }
}