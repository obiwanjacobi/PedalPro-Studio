import * as express from "express";

import { ApiHandler, createFault } from "./ApiHandler";
import { FactoryApi } from "./FactoryApi";
import { WritePresetsApi } from "./WritePresetsApi";
import { PedalProDevice } from "./pedalpro/PedalProDevice";
import { PedalProProviderFactory } from "./pedalpro/PedalProProviderFactory";
import { DeviceResponse } from "../model/Messages";
import { Environment } from "../Environment";
import { PedalProDeviceIdentity, PedalProDeviceModel } from "./pedalpro/PedalProDeviceIdentity";

export const getDeviceInfo = (): PedalProDeviceIdentity => {
    const device = new PedalProDevice();
    const isProd = Environment.isProduction;
    const deviceInfo = PedalProProviderFactory.getDeviceIdentity(device, isProd);

    if (!deviceInfo) {
        return {
            vendor: "<unknown>",
            device: "<unknown>",
            version: "0.0",
            model: PedalProDeviceModel.Unspecified,
            supported: false,
            presetCount: 0
        };
    }
    return deviceInfo;
};

export class DeviceApi implements ApiHandler {
    public readonly uri: string = "/device";
    public readonly router: express.Router = express.Router();

    private readonly factoryApi = new FactoryApi();
    private readonly presetsApi = new WritePresetsApi(() => PedalProProviderFactory.create(Environment.isProduction));

    public constructor() {
        this.router.use(this.factoryApi.uri, this.factoryApi.router);
        this.router.use(this.presetsApi.uri, this.presetsApi.router);

        this.router.get("/", this.getDeviceIdentity);
    }

    private getDeviceIdentity(_: express.Request, response: express.Response) {
        const msg = <DeviceResponse> {};
        try {
            msg.device = getDeviceInfo();
        } catch (error) {
            msg.fault = createFault(error.message);
        }

        response.json(msg);
    }
}