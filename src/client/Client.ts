import * as TypedRestClient from "typed-rest-client/RestClient";

import { PresetCollectionType } from "./ApplicationDocument";
import Preset from "./Preset";
import * as ModelPreset from "../model/Preset";
import PresetResponse from "../model/PresetResponse";

export class PresetsClient {
    private readonly typedRest: TypedRestClient.RestClient;
    private readonly baseUrl: string;
    private readonly collection: PresetCollectionType;

    public constructor(typedRest: TypedRestClient.RestClient, collection: PresetCollectionType, baseUrl: string) {
        this.typedRest = typedRest;
        this.collection = collection;
        this.baseUrl = baseUrl;
    }

    public async getPresets(): Promise<Preset[]> {
        const response = await this.typedRest.get<PresetResponse>(`${this.baseUrl}/presets/`);
        this.throwIfError(response);

        const modelPresets = response.result.presets;
        const presets = new Array<Preset>(modelPresets.length);
        
        for (let i = 0; i < modelPresets.length; i++) {
            presets[i] = this.createPreset(modelPresets[i]);
        }

        return presets;
    }

    public async getPreset(presetIndex: number): Promise<Preset> {
        const response = await this.typedRest.get<PresetResponse>(`${this.baseUrl}/presets/${presetIndex}`);
        this.throwIfError(response);
        
        const modelPreset = response.result.presets[0];
        return this.createPreset(modelPreset);
    }

    private createPreset(preset: ModelPreset.default): Preset {
        const clientPreset: Preset = { 
            ...preset, 
            origin: preset,
            source: this.collection,
            uiExpanded: false,
            uiSelected: false
        };
        return clientPreset;
    }

    private throwIfError(response: TypedRestClient.IRestResponse<PresetResponse>) {
        if (response.statusCode !== 200) {
            throw new Error(`Internal Error: ${response.statusCode}.`);
        }
        if (response.result.fault) {
            throw response.result.fault;
        }
        if (!response.result.device.supported) {
            // tslint:disable:max-line-length
            throw new Error(`The connected device ${response.result.device.device} version ${response.result.device.version} is not supported. Please upgrade the device.`);
        }
        if (!response.result.presets || response.result.presets.length === 0) {
            throw new Error("No presets were retrieved.");
        }
    }
}

export default class Client {
    private readonly typedRest: TypedRestClient.RestClient;
    
    public constructor(port: number) {
        this.typedRest = new TypedRestClient.RestClient("internal", `http://localhost:${port}`);
    }

    public getSource(source: PresetCollectionType) {
        switch (source) {
            case PresetCollectionType.device:
                return new PresetsClient(this.typedRest, source, "/device");
            case PresetCollectionType.factory:
                return new PresetsClient(this.typedRest, source, "/device/factory");
            case PresetCollectionType.storage:
                return new PresetsClient(this.typedRest, source, "/storage");
            default:
                throw new RangeError("Invlid source type (PresetCollectionType).");
        }
    }
}