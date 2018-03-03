import PedalProProvider from "./standard/PedalProProvider";
import PedalProDevice from "./PedalProDevice";
import ReadDeviceIdentity from "./ReadDeviceIdentity";
import PedalProDeviceIdentity, { PedalProDeviceModel } from "./PedalProDeviceIdentity";
import PedalProExProvider from "./extended/PedalProExProvider";

export default class PedalProProviderFactory {
    public static create(): PedalProProvider {
        const device = new PedalProDevice();
        device.Id = PedalProProviderFactory.getDeviceIdentity(device);

        switch (device.Id.model) {
            case PedalProDeviceModel.PedalPro:
            return new PedalProProvider(device);

            case PedalProDeviceModel.PedalProEx:
            return new PedalProExProvider(device);

            default:
            throw new Error(`Device ${device.Id.device}, version ${device.Id.version} is not supported.`);
        }
    }

    private static getDeviceIdentity(device: PedalProDevice): PedalProDeviceIdentity {
        const reader = new ReadDeviceIdentity(device);
        const identity = reader.read();
        return identity;
    }
}