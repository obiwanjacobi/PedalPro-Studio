import * as express from "express";
import ApiHandler from "./ApiHandler";
import FactoryApi from "./FactoryApi";
import PresetsApi from "./PresetsApi";

export default class DeviceApi implements ApiHandler {
    public readonly uri: string = "/device";
    public readonly router: express.Router = express.Router();

    private readonly factoryApi = new FactoryApi();
    private readonly presetsApi = new PresetsApi();

    public constructor() {
        this.factoryApi = new FactoryApi();

        this.router.use(this.factoryApi.uri, this.factoryApi.router);
        this.router.use(this.presetsApi.uri, this.presetsApi.router);
    }
}