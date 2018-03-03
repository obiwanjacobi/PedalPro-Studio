import PedalProProvider from "./PedalProProvider";
import PedalProDevice from "./PedalProDevice";
import ReadDeviceIdentity from "./commands/ReadDeviceIdentity";
import DeviceIdentity, { PedalProDeviceModel } from "./DeviceIdentity";
import PedalProExProvider from "./PedalProExProvider";

export default class PedalProProviderFactory {
    public static create(): PedalProProvider {
        const device = new PedalProDevice();
        const deviceId = PedalProProviderFactory.getDeviceIdentity(device);

        switch (deviceId.model) {
            case PedalProDeviceModel.PedalPro:
            return new PedalProProvider(device);

            case PedalProDeviceModel.PedalProEx:
            return new PedalProExProvider(device);

            default:
            throw new Error(`Device ${deviceId.name}, version ${deviceId.version} is not supported.`);
        }
    }

    private static getDeviceIdentity(device: PedalProDevice): DeviceIdentity {
        const reader = new ReadDeviceIdentity(device);
        const identity = reader.read();
        return identity;
    }
}