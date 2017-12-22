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
        const self = this;

        this.router.get("/", this.allPresets);
        this.router.get("/:presetIndex", async (request: express.Request, response: express.Response) => {
            const preset = await self.provider.getPreset(request.params.presetIndex);
            response.json(preset);
        });
        this.router.post("/", this.newPreset);
    }

    private allPresets(request: express.Request, response: express.Response) {
        response.json({ message: "all presets"});
    }

    // private getPreset(request: express.Request, response: express.Response) {
    //     // param: presetIndex
    //     this.provider.getPreset(request.params.presetIndex)
    //         .then((preset) => {
    //             response.json(preset);
    //             // response.json({ message: "get preset: " + request.params.presetIndex});
    //         });
    // }

    private newPreset(request: express.Request, response: express.Response) {
        response.json({ message: "new preset"});
    }
}