import * as express from "express";
import ApiHandler from "./ApiHandler";
import PresetProvider from "../model/PresetProvider";

export default class PresetsApi implements ApiHandler {
    public readonly uri: string = "/presets";
    public readonly router: express.Router = express.Router();
    private readonly provider: PresetProvider;

    public constructor(provider: PresetProvider) {
        this.provider = provider;
        this.allPresets = this.allPresets.bind(this);
        this.getPreset = this.getPreset.bind(this);

        this.initRoutes();
    }
    
    private initRoutes() {
        this.router.get("/", this.allPresets);
        this.router.get("/:presetIndex", this.getPreset);
    }

    private async allPresets(_: express.Request, response: express.Response) {
        const presets = await this.provider.getPresets();
        response.json(presets);
    }

    private async getPreset(request: express.Request, response: express.Response) {
        const presetIndex: number = request.params.presetIndex;

        try {
            const preset = await this.provider.getPreset(presetIndex);
            response.json(preset);
        } catch (error) {
            // TODO: this does not work - exception is lost
            // error is undefined
            response.json(error);
        }
    }
}