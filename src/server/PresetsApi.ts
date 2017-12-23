import * as express from "express";
import ApiHandler from "./ApiHandler";
import PresetProvider from "../model/PresetProvider";
import EntityFilter from "../model/EntityFilter";

export default class PresetsApi implements ApiHandler {
    public readonly uri: string = "/presets";
    public readonly router: express.Router = express.Router();
    private readonly provider: PresetProvider;

    // tslint:disable-next-line:no-any
    private static filterFrom(query: any): EntityFilter {
        const filter = new EntityFilter();

        return filter;
    }

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

    private async allPresets(request: express.Request, response: express.Response) {
        const filter = PresetsApi.filterFrom(request.query);
        const preset = await this.provider.getPresets(filter);
        response.json(preset);
    }

    private async getPreset(presetIndex: number, request: express.Request, response: express.Response) {
        const preset = await this.provider.getPreset(presetIndex);
        response.json(preset);
    }

    private async newPreset(request: express.Request, response: express.Response) {
        response.json({ message: "new preset"});
    }
}