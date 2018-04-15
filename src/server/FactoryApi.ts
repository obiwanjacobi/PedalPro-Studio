import * as express from "express";
import { ApiHandler } from "./ApiHandler";
import { ReadPresetsApi } from "./ReadPresetsApi";
import { PresetProvider } from "./PresetProvider";
import { FactoryProvider } from "../pedalpro/standard/FactoryProvider";
import { FactoryProviderEx } from "../pedalpro/extended/FactoryProviderEx";
import { PedalProDeviceModel } from "../pedalpro/PedalProDeviceIdentity";
import { Configuration } from "../Configuration";
import { getDeviceInfo } from "./DeviceApi";

export class FactoryApi implements ApiHandler {
    public readonly uri: string = "/factory";
    public readonly router: express.Router = express.Router();

    private readonly presetApi = new ReadPresetsApi(() => this.createProvider());

    public constructor() {
        this.router.use(this.presetApi.uri, this.presetApi.router);
    }

    private createProvider(): PresetProvider {
        const deviceInfo = getDeviceInfo();

        switch (deviceInfo.model) {
            case  PedalProDeviceModel.PedalPro:
                return new FactoryProvider(Configuration.pedalpro.factoryFile);
            case  PedalProDeviceModel.PedalProEx:
                return new FactoryProviderEx(Configuration.pedalpro.factoryFileEx);
            default:
                throw new Error("Device has no Factory presets.");
        }
    }
}