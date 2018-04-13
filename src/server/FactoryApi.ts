import * as express from "express";
import { ApiHandler } from "./ApiHandler";
import { ReadPresetsApi } from "./ReadPresetsApi";
import { PresetProvider } from "./PresetProvider";
import { FactoryProvider } from "../pedalpro/standard/FactoryProvider";
import { FactoryProviderEx } from "../pedalpro/extended/FactoryProviderEx";
import { PedalProDevice } from "../pedalpro/PedalProDevice";
import { PedalProProviderFactory } from "../pedalpro/PedalProProviderFactory";
import { PedalProDeviceModel } from "../pedalpro/PedalProDeviceIdentity";
import { Environment } from "../Environment";
import { Configuration } from "../Configuration";

export class FactoryPresetApi extends ReadPresetsApi {
    protected createProvider(): PresetProvider {
        const device = new PedalProDevice();
        const deviceInfo = PedalProProviderFactory.getDeviceIdentity(device, Environment.isProduction);
        if (!deviceInfo) { throw new Error("Device could not be determined."); }

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

export class FactoryApi implements ApiHandler {
    public readonly uri: string = "/factory";
    public readonly router: express.Router = express.Router();

    private readonly presetApi = new FactoryPresetApi();

    public constructor() {
        this.router.use(this.presetApi.uri, this.presetApi.router);
    }
}