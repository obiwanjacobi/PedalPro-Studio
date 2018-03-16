import * as express from "express";
import ApiHandler from "./ApiHandler";
import ReadPresetsApi from "./ReadPresetsApi";
import PresetProvider from "./PresetProvider";
import FactoryProviderEx from "../pedalpro/extended/FactoryProviderEx";

export class FactoryPresetApi extends ReadPresetsApi {
    protected createProvider(): PresetProvider {
        // TODO: file path!
        return new FactoryProviderEx("./src/pedalpro/_tests/PPEPreset81.vrf");
    }
}

export default class FactoryApi implements ApiHandler {
    public readonly uri: string = "/factory";
    public readonly router: express.Router = express.Router();

    private readonly presetApi = new FactoryPresetApi();

    public constructor() {
        this.router.use(this.presetApi.uri, this.presetApi.router);
    }
}