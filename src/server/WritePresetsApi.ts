import * as express from "express";
import { ReadPresetsApi } from "./ReadPresetsApi";
import { createFault } from "./ApiHandler";
import { PresetResponse, PresetRequest } from "../model/Messages";

export class WritePresetsApi extends ReadPresetsApi {
    public constructor() {
        super();
        this.writePreset = this.writePreset.bind(this);
        this.writePresets = this.writePresets.bind(this);
        this.deletePreset = this.deletePreset.bind(this);

        this.router.put("/", this.writePresets);
        this.router.put("/:presetIndex", this.writePreset);
        this.router.delete("/:presetIndex", this.deletePreset);
    }

    private writePreset(request: express.Request, response: express.Response) {
        const msg = <PresetResponse> { };
        const presetIndex: number = request.params.presetIndex;

        try {
            const presetRequest = <PresetRequest> request.body;
            if (presetRequest.presets && presetRequest.presets.length === 1) {
                const provider = this.createProvider();
                const preset = presetRequest.presets[0];
                preset.index = Number(presetIndex); // override preset index with url param value
                provider.putPreset(preset);
                msg.presets = [provider.getPreset(preset.index)];
            } else {
                response.status(400); // invalid request
                throw new Error("Expect exactly one preset.");
            }
        } catch (error) {
            msg.fault = createFault(error.message);
        }

        response.json(msg);
    }

    private writePresets(request: express.Request, response: express.Response) {
        const msg = <PresetResponse> { };

        try {
            const presetRequest = <PresetRequest> request.body;
            if (presetRequest.presets && presetRequest.presets.length > 0) {
                const provider = this.createProvider();
                provider.putPresets(presetRequest.presets);

                msg.presets = presetRequest.presets;
            } else {
                response.status(400); // invalid request
                throw new Error("Expect one or more presets.");
            }
        } catch (error) {
            msg.fault = createFault(error.message);
        }

        response.json(msg);
    }

    private deletePreset(request: express.Request, response: express.Response) {
        const msg = <PresetResponse> { };
        const presetIndex: number = request.params.presetIndex;

        try {
            const provider = this.createProvider();
            msg.presets = [provider.deletePreset(Number(presetIndex))];
        } catch (error) {
            msg.fault = createFault(error.message);
        }

        response.json(msg);
    }
}