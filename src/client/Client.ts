import * as TypedRestClient from "typed-rest-client/RestClient";

import { PresetCollectionType } from "./ApplicationDocument";
import Preset from "./Preset";
import * as ModelPreset from "../model/Preset";
import PresetResponse from "../model/PresetResponse";

export default class Client {
    private readonly typedRest: TypedRestClient.RestClient;

    private static createPreset(preset: ModelPreset.default): Preset {
        const clientPreset: Preset = { 
            ...preset, 
            origin: preset,
            source: PresetCollectionType.device,
            uiExpanded: false,
            uiSelected: false
        };
        return clientPreset;
    }

    public constructor(baseUrl: string = "http://localhost:3000") {
        this.typedRest = new TypedRestClient.RestClient("internal", baseUrl);
    }

    public async getPresets(): Promise<Preset[]> {
        const response = await this.typedRest.get<PresetResponse>("/presets/");
        this.throwIfError(response);

        const modelPresets = response.result.presets;
        const presets = new Array<Preset>(modelPresets.length);
        
        for (let i = 0; i < modelPresets.length; i++) {
            presets[i] = Client.createPreset(modelPresets[i]);
        }

        return presets;
    }

    public async getPreset(presetIndex: number): Promise<Preset> {
        const response = await this.typedRest.get<PresetResponse>("/presets/" + presetIndex);
        this.throwIfError(response);
        
        const modelPreset = response.result.presets[0];
        return Client.createPreset(modelPreset);
    }

    private throwIfError(response: TypedRestClient.IRestResponse<PresetResponse>) {
        if (response.statusCode !== 200) {
            throw new Error(`Internal Error: ${response.statusCode}.`);
        }
        if (response.result.fault) {
            throw { message: response.result.fault };
        }
        if (!response.result.presets || response.result.presets.length === 0) {
            throw new Error("No presets were retrieved.");
        }
    }
}