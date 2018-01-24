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
        // capture our this for callbacks to use
        const self = this;

        this.router.get("/", async (request: express.Request, response: express.Response) => {
            return self.allPresets(request, response);
        });
        this.router.get("/:presetIndex", async (request: express.Request, response: express.Response) => {
            return self.getPreset(request.params.presetIndex, request, response);
        });
        this.router.post("/", async (request: express.Request, response: express.Response) => {
            return self.newPreset(request, response);
        });
    }

    private async allPresets(_: express.Request, response: express.Response) {
        const preset = await this.provider.getPresets();
        response.json(preset);
    }

    private async getPreset(presetIndex: number, _: express.Request, response: express.Response) {
        const preset = await this.provider.getPreset(presetIndex);
        response.json(preset);
    }

    private async newPreset(_: express.Request, response: express.Response) {
        response.json({ message: "new preset"});
    }
}