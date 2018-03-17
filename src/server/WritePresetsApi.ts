import * as express from "express";
import ReadPresetsApi from "./ReadPresetsApi";
import { createFault } from "./ApiHandler";
import { PresetResponse, PresetRequest } from "../model/Messages";
import Preset from "../model/Preset";

export default class WritePresetsApi extends ReadPresetsApi {
    public constructor() {
        super();
        this.writePreset = this.writePreset.bind(this);
        this.writePresets = this.writePresets.bind(this);

        this.router.put("/", this.writePresets);
        this.router.put("/:presetIndex", this.writePreset);
    }

    private writePreset(request: express.Request, response: express.Response) {
        const msg = <PresetResponse> { };
        const presetIndex: number = request.params.presetIndex;

        try {
            const presetRequest = <PresetRequest> request.body;
            if (presetRequest.presets && presetRequest.presets.length === 1) {
                const provider = this.createProvider();
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
                const provider = this.createProvider();

                msg.presets = new Array<Preset>();
                
                for (let i = 0; i < presetRequest.presets.length; i++) {
                    const preset = presetRequest.presets[i];
                    provider.putPreset(preset);
                    
                    // msg.presets.push(provider.getPreset(preset.index));
                    msg.presets.push(preset);
                }
            } else {
                response.status(400); // invalid request
                throw new Error("Expect one or more presets.");
            }
        } catch (error) {
            msg.fault = createFault(error.message);
        }

        response.json(msg);
    }
}