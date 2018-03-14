import * as express from "express";
import ApiHandler, { createFault } from "./ApiHandler";
import FactoryApi from "./FactoryApi";
import PresetsApi from "./PresetsApi";
import PedalProDevice from "../pedalpro/PedalProDevice";
import PedalProProviderFactory from "../pedalpro/PedalProProviderFactory";
import { DeviceResponse } from "../model/Messages";

export default class DeviceApi implements ApiHandler {
    public readonly uri: string = "/device";
    public readonly router: express.Router = express.Router();

    private readonly factoryApi = new FactoryApi();
    private readonly presetsApi = new PresetsApi();

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
            msg.device = PedalProProviderFactory.getDeviceIdentity(device);
        } catch (error) {
            msg.fault = createFault(error.message);
        }

        response.json(msg);
    }
}