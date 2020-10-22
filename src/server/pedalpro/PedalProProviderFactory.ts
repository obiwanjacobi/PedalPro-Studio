import * as Path from "path";

import { Program } from "../../Program";
import { Configuration } from "../../Configuration";
import { PresetProvider } from "../PresetProvider";
import { DevicePresetProvider } from "./DevicePresetProvider";
import { PedalProDevice } from "./PedalProDevice";
import { ReadDeviceIdentity } from "./ReadDeviceIdentity";
import { PedalProDeviceIdentity, PedalProDeviceModel } from "./PedalProDeviceIdentity";
import { PedalProProvider } from "./standard/PedalProProvider";
import { PedalProExProvider } from "./extended/PedalProExProvider";

import { OfflinePresetProvider } from "./_tests/OfflinePresetProvider";
import { OfflinePresetProviderEx } from "./_tests/OfflinePresetProviderEx";

export class PedalProProviderFactory {
    public static offlineProvider?: DevicePresetProvider;

    public static create(throwOnError: boolean): PresetProvider {
        const device = new PedalProDevice();
        const deviceId = PedalProProviderFactory.getDeviceIdentityInternal(device, throwOnError);

        if (!deviceId) {
            if (!this.offlineProvider) {
                if (Configuration.development.simulate === PedalProDeviceModel.PedalPro) {
                    const filePath = Path.join(Program.locations.application, Configuration.pedalpro.factoryFile);
                    this.offlineProvider = new OfflinePresetProvider(filePath);
                } else if (Configuration.development.simulate === PedalProDeviceModel.PedalProEx) {
                    const filePathEx = Path.join(Program.locations.application, Configuration.pedalpro.factoryFileEx);
                    this.offlineProvider = new OfflinePresetProviderEx(filePathEx);
                }
            }

            if (this.offlineProvider) {
                return this.offlineProvider;
            }

            throw new Error("No Device was connected and no Simulation configuration settings was found.");
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
        const deviceId = PedalProProviderFactory.getDeviceIdentityInternal(device, throwOnError);
        
        if (!deviceId && !throwOnError) {
            if (Configuration.development.simulate === PedalProDeviceModel.PedalPro) {
                return {
                    vendor: "Development",
                    device: "Offline",
                    version: "0.0",
                    model: PedalProDeviceModel.PedalPro,
                    supported: true,
                    presetCount: 500
                };
            } else if (Configuration.development.simulate === PedalProDeviceModel.PedalProEx) {
                return {
                    vendor: "Development",
                    device: "Offline",
                    version: "0.0",
                    model: PedalProDeviceModel.PedalProEx,
                    supported: true,
                    presetCount: 400
                };
            }
        }

        if (deviceId) {
            return deviceId;
        }

        throw new Error("No Device was connected and no Simulation configuration settings was found.");
    }

    private static getDeviceIdentityInternal(
        device: PedalProDevice, throwOnError: boolean): PedalProDeviceIdentity | undefined {

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