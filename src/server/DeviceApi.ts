import * as express from "express";
import { ApiHandler, createFault } from "./ApiHandler";
import { FactoryApi } from "./FactoryApi";
import { WritePresetsApi } from "./WritePresetsApi";
import { PedalProDevice } from "../pedalpro/PedalProDevice";
import { PedalProProviderFactory } from "../pedalpro/PedalProProviderFactory";
import { DeviceResponse } from "../model/Messages";
import { Environment } from "../Environment";

export class DeviceApi implements ApiHandler {
    public readonly uri: string = "/device";
    public readonly router: express.Router = express.Router();

    private readonly factoryApi = new FactoryApi();
    private readonly presetsApi = new WritePresetsApi();

    public constructor() {
        this.factoryApi = new FactoryApi();

        this.router.use(this.factoryApi.uri, this.factoryApi.router);
        this.router.use(this.presetsApi.uri, this.presetsApi.router);
        this.router.get("/", this.getDeviceIdentity);
    }

    private getDeviceIdentity(_: express.Request, response: express.Response) {
        const msg = <DeviceResponse> { };

        try {
            const device = new PedalProDevice();
            const deviceInfo = PedalProProviderFactory.getDeviceIdentity(device, Environment.isProduction);
            if (deviceInfo) {
                msg.device = deviceInfo;
            } else {
                msg.device = {
                    vendor: "Offline",
                    device: "PedalPro-Ex",
                    version: "",
                    supported: true,
                    presetCount: 400
                };
            }
        } catch (error) {
            msg.fault = createFault(error.message);
        }

        response.json(msg);
    }
}