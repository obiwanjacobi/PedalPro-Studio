import * as express from "express";
import ApiHandler from "./ApiHandler";
import PresetProvider from "./PresetProvider";
import PedalProProviderFactory from "../pedalpro/PedalProProviderFactory";

// test - no real usb
// import TestPresetProvider from "../_tests/TestPresetProvider";
// const pedalProPresetsApi = new PresetsApi(new TestPresetProvider());

export default class PresetsApi implements ApiHandler {
    public readonly uri: string = "/presets";
    public readonly router: express.Router = express.Router();

    public constructor() {
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
            const provider = this.createProvider();
            const presets = provider.getPresets();
            response.json({ presets: presets });
        } catch (error) {
            response.json({fault: { error: error.message}});
        }
    }

    private getPreset(request: express.Request, response: express.Response) {
        const presetIndex: number = request.params.presetIndex;

        try {
            const provider = this.createProvider();
            const preset = provider.getPreset(presetIndex);
            response.json({presets: [preset]});
        } catch (error) {
            response.json({ fault: {error: error.message}});
        }
    }

    private createProvider(): PresetProvider {
        return PedalProProviderFactory.create();
    }
}