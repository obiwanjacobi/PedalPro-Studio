import * as express from "express";
import ApiHandler from "./ApiHandler";
import PresetProvider from "../model/PresetProvider";

export default class PresetsApi implements ApiHandler {
    public readonly uri: string = "/presets";
    public readonly router: express.Router = express.Router();
    private readonly provider: PresetProvider;

    public constructor(provider: PresetProvider) {
        this.provider = provider;
        this.initRoutes();
    }
    
    private initRoutes() {
        this.router.get("/", this.allPresets);
        this.router.get("/:presetIndex", this.getPreset);
        this.router.post("/", this.newPreset);
    }

    private async allPresets(request: express.Request, response: express.Response) {
        response.json({ message: "all presets"});
    }

    private async getPreset(request: express.Request, response: express.Response) {
        // param: presetIndex
        const preset = await this.provider.getPreset(request.params.presetIndex);
        response.json(preset);
        // response.json({ message: "get preset: " + request.params.presetIndex});
    }

    private async newPreset(request: express.Request, response: express.Response) {
        response.json({ message: "new preset"});
    }
}