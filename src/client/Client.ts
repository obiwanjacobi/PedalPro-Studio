import * as TypedRestClient from "typed-rest-client/RestClient";

import { PresetCollectionType } from "./ApplicationDocument";
import Preset from "./Preset";
import * as ModelPreset from "../model/Preset";

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
        const response = await this.typedRest.get<Object>("/presets/");
        this.throwIfError(response);

        const modelPresets = response.result as ModelPreset.default[];
        const presets = new Array<Preset>(modelPresets.length);
        
        for (let i = 0; i < modelPresets.length; i++) {
            presets[i] = Client.createPreset(modelPresets[i]);
        }

        return presets;
    }

    public async getPreset(presetIndex: number): Promise<Preset> {
        const response = await this.typedRest.get<Object>("/presets/" + presetIndex);
        this.throwIfError(response);
        
        const preset = response.result as ModelPreset.default;
        return Client.createPreset(preset);
    }

    private throwIfError(response: TypedRestClient.IRestResponse<Object>) {
        // @ts-ignore: Fault
        if (response.result.error) {
            // @ts-ignore: Fault
            throw { message: response.result.error };
        }
    }
}