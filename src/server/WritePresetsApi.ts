import * as express from "express";
import { ReadPresetsApi, PresetProviderFactory } from "./ReadPresetsApi";
import { createFault } from "./ApiHandler";
import { PresetResponse, PresetRequest } from "../model/Messages";

export class WritePresetsApi extends ReadPresetsApi {
    public constructor(providerFactory: PresetProviderFactory) {
        super(providerFactory);
        this.writePreset = this.writePreset.bind(this);
        this.writePresets = this.writePresets.bind(this);
        this.deletePreset = this.deletePreset.bind(this);

        this.router.put("/", this.writePresets);
        this.router.put("/:presetIndex", this.writePreset);
        this.router.delete("/:presetIndex", this.deletePreset);
    }

    private writePreset(request: express.Request, response: express.Response) {
        const msg = <PresetResponse> { };
        const presetIndex: number = Number(request.params.presetIndex);

        try {
            this.throwIfNaN(presetIndex);
            const presetRequest = <PresetRequest> request.body;
            if (presetRequest.presets && presetRequest.presets.length === 1) {
                const provider = this.createProvider(request.params);
                const preset = presetRequest.presets[0];
                preset.index = presetIndex; // override preset index with url param value
                provider.putPreset(preset);
                msg.presets = [provider.getPreset(presetIndex)];
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
                const provider = this.createProvider(request.params);
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
        const presetIndex: number = Number(request.params.presetIndex);

        try {
            this.throwIfNaN(presetIndex);
            const provider = this.createProvider(request.params);
            msg.presets = [provider.deletePreset(presetIndex)];
        } catch (error) {
            msg.fault = createFault(error.message);
        }

        response.json(msg);
    }
}