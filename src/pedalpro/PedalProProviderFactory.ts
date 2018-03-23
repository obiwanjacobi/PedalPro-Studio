import PedalProProvider from "./standard/PedalProProvider";
import PedalProDevice from "./PedalProDevice";
import ReadDeviceIdentity from "./ReadDeviceIdentity";
import PedalProDeviceIdentity, { PedalProDeviceModel } from "./PedalProDeviceIdentity";
import PedalProExProvider from "./extended/PedalProExProvider";
import PresetProvider from "../server/PresetProvider";

export default class PedalProProviderFactory {
    public static create(): PresetProvider {
        const device = new PedalProDevice();
        const deviceId = PedalProProviderFactory.getDeviceIdentity(device);

        switch (deviceId.model) {
            case PedalProDeviceModel.PedalPro:
            return new PedalProProvider(device);

            case PedalProDeviceModel.PedalProEx:
            return new PedalProExProvider(device);

            default:
            throw new Error(`Device ${deviceId.device}, version ${deviceId.version} is not supported.`);
        }
    }

    public static getDeviceIdentity(device: PedalProDevice): PedalProDeviceIdentity {
        const reader = new ReadDeviceIdentity(device);
        return reader.read();
    }
}