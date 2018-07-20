import * as Path from "path";

import { Program } from "../../Program";
import { PedalProProvider } from "./standard/PedalProProvider";
import { PedalProDevice } from "./PedalProDevice";
import { ReadDeviceIdentity } from "./ReadDeviceIdentity";
import { PedalProDeviceIdentity, PedalProDeviceModel } from "./PedalProDeviceIdentity";
import { PedalProExProvider } from "./extended/PedalProExProvider";
import { PresetProvider } from "../PresetProvider";
import { OfflinePresetProviderEx } from "./_tests/OfflinePresetProviderEx";
import { Configuration } from "../../Configuration";

export class PedalProProviderFactory {
    public static offlineProvider?: OfflinePresetProviderEx;

    public static create(throwOnError: boolean): PresetProvider {
        const device = new PedalProDevice();
        const deviceId = PedalProProviderFactory.getDeviceIdentity(device, throwOnError);

        if (!deviceId) {
            if (!this.offlineProvider) {
                const filePathEx = Path.join(Program.locations.application, Configuration.pedalpro.factoryFileEx);
                this.offlineProvider = new OfflinePresetProviderEx(filePathEx);
            }
            return this.offlineProvider;
        }

        switch (deviceId.model) {
            case PedalProDeviceModel.PedalPro:
            return new PedalProProvider(device, deviceId);

            case PedalProDeviceModel.PedalProEx:
            return new PedalProExProvider(device, deviceId);

            default:
            throw new Error(`Device ${deviceId.device}, version ${deviceId.version} is not supported.`);
        }
    }

    public static getDeviceIdentity(device: PedalProDevice, throwOnError: boolean): PedalProDeviceIdentity | undefined {
        try {
            const reader = new ReadDeviceIdentity(device);
            return reader.read();
        } catch (error) {
            if (!throwOnError) {
                return undefined;
            }
            throw error;
        }
    }
}