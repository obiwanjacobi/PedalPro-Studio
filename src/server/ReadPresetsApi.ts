import * as express from "express";
import { ApiHandler, createFault } from "./ApiHandler";
import { PresetProvider } from "./PresetProvider";
import { PedalProProviderFactory } from "../pedalpro/PedalProProviderFactory";
import { PresetResponse } from "../model/Messages";

// test - no usb
// import TestPresetProvider from "../_tests/TestPresetProvider";
// const pedalProPresetsApi = new PresetsApi(new TestPresetProvider());

export class ReadPresetsApi implements ApiHandler {
    public readonly uri: string = "/presets";
    public readonly router: express.Router = express.Router();

    public constructor() {
        this.getPresets = this.getPresets.bind(this);
        this.getPreset = this.getPreset.bind(this);

        this.router.get("/", this.getPresets);
        this.router.get("/:presetIndex", this.getPreset);
    }

    protected createProvider(): PresetProvider {
        return PedalProProviderFactory.create();
    }

    private getPresets(request: express.Request, response: express.Response) {
        const page = request.query.page;
        const size = request.query.size;
        const msg = <PresetResponse> { };

        try {
            const provider = this.createProvider();
            if (page && size) {
                msg.presets = provider.getPresetsPaged(Number(page), Number(size));
            } else {
                msg.presets = provider.getPresets();
            }
        } catch (error) {
            msg.fault = createFault(error.message);
        }

        response.json(msg);
    }

    private getPreset(request: express.Request, response: express.Response) {
        const msg = <PresetResponse> { };
        const presetIndex: number = request.params.presetIndex;

        try {
            const provider = this.createProvider();
            msg.presets = [provider.getPreset(presetIndex)];
        } catch (error) {
            msg.fault = createFault(error.message);
        }
        response.json(msg);
    }
}