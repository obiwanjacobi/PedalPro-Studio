import PedalProDevice from "./PedalProDevice";
import { ProtocolBuffer } from "./ProtocolBuffer";

export interface DeviceProfile {
    presetCount: number;
    partSize: number;
    lastPartSize: number;
    presetBufferSize: number;
}

export default class DeviceCommand {
    protected readonly device: PedalProDevice;
    protected readonly profile: DeviceProfile;

    public constructor(device: PedalProDevice, profile: DeviceProfile) {
        this.device = device;
        this.profile = profile;
    }

    protected throwIfCommandFailed(buffer: ProtocolBuffer) {
        if (!buffer.isCommandSuccess(this.device.read())) {
            throw new Error("Device communication fault.");
        }
    }
}