import * as express from "express";
import ApiHandler from "./ApiHandler";
import PresetProvider from "./PresetProvider";

export default class PresetsApi implements ApiHandler {
    public readonly uri: string = "/presets";
    public readonly router: express.Router = express.Router();
    private readonly provider: PresetProvider;

    public constructor(provider: PresetProvider) {
        this.provider = provider;
        this.getPresets = this.getPresets.bind(this);
        this.getPreset = this.getPreset.bind(this);

        this.initRoutes();
    }
    
    private initRoutes() {
        this.router.get("/", this.getPresets);
        this.router.get("/:presetIndex", this.getPreset);
    }

    private getPresets(_: express.Request, response: express.Response) {
        try {
            const presets = this.provider.getPresets();
            response.json(presets);
        } catch (error) {
            response.json({error: error.message});
        }
    }

    private getPreset(request: express.Request, response: express.Response) {
        const presetIndex: number = request.params.presetIndex;

        try {
            const preset = this.provider.getPreset(presetIndex);
            response.json(preset);
        } catch (error) {
            response.json({error: error.message});
        }
    }
}