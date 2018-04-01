import { PedalProProvider } from "./standard/PedalProProvider";
import { PedalProDevice } from "./PedalProDevice";
import { ReadDeviceIdentity } from "./ReadDeviceIdentity";
import { PedalProDeviceIdentity, PedalProDeviceModel } from "./PedalProDeviceIdentity";
import { PedalProExProvider } from "./extended/PedalProExProvider";
import { PresetProvider } from "../server/PresetProvider";
import { Environment } from "../Environment";
import { OfflinePresetProviderEx } from "./_tests/OfflinePresetProviderEx";

export class PedalProProviderFactory {
    public static create(): PresetProvider {
        const device = new PedalProDevice();
        const deviceId = PedalProProviderFactory.getDeviceIdentity(device);

        if (!deviceId) {
            return new OfflinePresetProviderEx("./src/pedalpro/_tests/PPEPreset81.vrf");
        }

        switch (deviceId.model) {
            case PedalProDeviceModel.PedalPro:
            return new PedalProProvider(device);

            case PedalProDeviceModel.PedalProEx:
            return new PedalProExProvider(device);

            default:
            throw new Error(`Device ${deviceId.device}, version ${deviceId.version} is not supported.`);
        }
    }

    public static getDeviceIdentity(device: PedalProDevice): PedalProDeviceIdentity | undefined {
        try {
            const reader = new ReadDeviceIdentity(device);
            return reader.read();
        } catch (error) {
            if (!Environment.isProduction) {
                return undefined;
            }
            throw error;
        }
    }
}