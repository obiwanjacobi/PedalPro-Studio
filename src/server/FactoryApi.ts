import * as express from "express";
import * as Path from "path";

import { ApiHandler } from "./ApiHandler";
import { ReadPresetsApi } from "./ReadPresetsApi";
import { PresetProvider } from "./PresetProvider";
import { FactoryProvider } from "./pedalpro/standard/FactoryProvider";
import { FactoryProviderEx } from "./pedalpro/extended/FactoryProviderEx";
import { PedalProDeviceModel } from "./pedalpro/PedalProDeviceIdentity";
import { Configuration } from "../Configuration";
import { getDeviceInfo } from "./DeviceApi";
import { Program } from "../Program";

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
            case PedalProDeviceModel.PedalPro:
                const filePath = Path.join(Program.locations.application, Configuration.pedalpro.factoryFile);
                return new FactoryProvider(filePath);
            case PedalProDeviceModel.PedalProEx:
                const filePathEx = Path.join(Program.locations.application, Configuration.pedalpro.factoryFileEx);
                return new FactoryProviderEx(filePathEx);
            default:
                throw new Error("Device has no Factory presets.");
        }
    }
}