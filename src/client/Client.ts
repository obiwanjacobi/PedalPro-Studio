import * as TypedRestClient from "typed-rest-client/RestClient";

import { PresetCollectionType } from "./ApplicationDocument";
import Preset from "./Preset";
import * as ModelPreset from "../model/Preset";
import { PresetResponse, PresetRequest } from "../model/Messages";

export class PresetsClient {
    private readonly typedRest: TypedRestClient.RestClient;
    private readonly baseUrl: string;
    private readonly collection: PresetCollectionType;

    public constructor(typedRest: TypedRestClient.RestClient, collection: PresetCollectionType, baseUrl: string) {
        this.typedRest = typedRest;
        this.collection = collection;
        this.baseUrl = baseUrl;

        this.extendPreset = this.extendPreset.bind(this);
        this.unextendPreset = this.unextendPreset.bind(this);
    }

    public async replacePresets(presets: Preset[]): Promise<Preset[]> {
        const msg = <PresetRequest> { presets: presets.map(this.unextendPreset) };
        const response = await this.typedRest.replace<PresetRequest>(`${this.baseUrl}/presets/`, msg);
        this.throwIfError(response);

        return response.result.presets.map(this.extendPreset);
    }

    public async getPresets(): Promise<Preset[]> {
        const response = await this.typedRest.get<PresetResponse>(`${this.baseUrl}/presets/`);
        this.throwIfError(response);

        return response.result.presets.map(this.extendPreset);
    }

    public async getPreset(presetIndex: number): Promise<Preset> {
        const response = await this.typedRest.get<PresetResponse>(`${this.baseUrl}/presets/${presetIndex}`);
        this.throwIfError(response);
        
        const modelPreset = response.result.presets[0];
        return this.extendPreset(modelPreset);
    }

    private extendPreset(preset: ModelPreset.default): Preset {
        const clientPreset: Preset = {
            ...preset, 
            origin: preset,
            source: this.collection,
            uiExpanded: false,
            uiSelected: false
        };
        return clientPreset;
    }

    private unextendPreset(clientPreset: Preset): ModelPreset.default {
        const preset: ModelPreset.default = {
            name: clientPreset.name,
            index: clientPreset.index,
            traits: clientPreset.traits,
            effects: clientPreset.effects,
        };
        return preset;
    }

    private throwIfError(response: TypedRestClient.IRestResponse<PresetResponse>) {
        if (response.statusCode !== 200) {
            throw new Error(`Internal Error: ${response.statusCode}.`);
        }
        if (response.result.fault) {
            throw response.result.fault;
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
                throw new RangeError("Invalid source type (PresetCollectionType).");
        }
    }
}