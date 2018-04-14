import * as TypedRestClient from "typed-rest-client/RestClient";

import { PresetCollectionType } from "./ApplicationDocument";
import { Preset } from "./Preset";
import * as ModelPreset from "../model/Preset";
import { PresetResponse, PresetRequest, DeviceResponse } from "../model/Messages";
import { DeviceIdentity } from "../model/DeviceIdentity";

export class PresetsClient {
    public readonly collection: PresetCollectionType;
    
    private readonly typedRest: TypedRestClient.RestClient;
    private readonly baseUrl: string;

    public constructor(typedRest: TypedRestClient.RestClient, collection: PresetCollectionType, baseUrl: string) {
        this.typedRest = typedRest;
        this.collection = collection;
        this.baseUrl = baseUrl;

        this.extendPreset = this.extendPreset.bind(this);
        this.unextendPreset = this.unextendPreset.bind(this);
    }

    public async deletePresets(presets: Preset[]): Promise<Preset[]> {
        const results = new Array<Preset>(presets.length);
        for (let i = 0; i < presets.length; i++) {
            const preset = presets[i];
            const response = await this.typedRest.del<PresetRequest>(`${this.baseUrl}/presets/${preset.index}`);
            this.throwIfError(response);
            // @ts-ignore:[ts] Object is possibly 'null'.
            results[i] = this.extendPreset(response.result.presets[0]);
        }
        return results;
    }

    public async replacePresets(presets: Preset[]): Promise<Preset[]> {
        const msg = <PresetRequest> { presets: presets.map(this.unextendPreset) };
        const response = await this.typedRest.replace<PresetRequest>(`${this.baseUrl}/presets/`, msg);
        this.throwIfError(response);
        // @ts-ignore:[ts] Object is possibly 'null'.
        return response.result.presets.map(this.extendPreset);
    }

    public async getPresets(): Promise<Preset[]> {
        const response = await this.typedRest.get<PresetResponse>(`${this.baseUrl}/presets/`);
        this.throwIfError(response);
        // @ts-ignore:[ts] Object is possibly 'null'.
        return response.result.presets.map(this.extendPreset);
    }

    public async getPresetsPaged(page: number, size: number): Promise<Preset[]> {
        const response = await this.typedRest.get<PresetResponse>(`${this.baseUrl}/presets/?page=${page}&size=${size}`);
        this.throwIfError(response);
        // @ts-ignore:[ts] Object is possibly 'null'.
        return response.result.presets.map(this.extendPreset);
    }

    public async getPreset(presetIndex: number): Promise<Preset> {
        const response = await this.typedRest.get<PresetResponse>(`${this.baseUrl}/presets/${presetIndex}`);
        this.throwIfError(response);
        // @ts-ignore:[ts] Object is possibly 'null'.
        const modelPreset = response.result.presets[0];
        return this.extendPreset(modelPreset);
    }

    public async getDeviceInfo(): Promise<DeviceIdentity> {
        const response = await this.typedRest.get<DeviceResponse>(this.baseUrl);
        if (!response.result) {
            throw new Error("No Result.");
        }
        if (response.result.fault) {
            throw response.result.fault;
        }
        
        return response.result.device;
    }

    private extendPreset(preset: ModelPreset.Preset): Preset {
        const clientPreset: Preset = {
            ...preset, 
            origin: preset,
            source: this.collection,
            ui: { expanded: false, selected: false, markedDeleted: false }
        };
        return clientPreset;
    }

    private unextendPreset(clientPreset: Preset): ModelPreset.Preset {
        const preset: ModelPreset.Preset = {
            name: clientPreset.name,
            index: clientPreset.index,
            traits: clientPreset.traits,
            effects: clientPreset.effects,
            meta: clientPreset.meta
        };
        return preset;
    }

    private throwIfError(response: TypedRestClient.IRestResponse<PresetResponse>) {
        if (response.statusCode !== 200) {
            throw new Error(`Internal Error: ${response.statusCode}.`);
        }
        if (!response.result) {
            throw new Error("No Result.");
        }
        if (response.result.fault) {
            throw response.result.fault;
        }
        if (!response.result.presets || response.result.presets.length === 0) {
            throw new Error("No presets were retrieved.");
        }
    }
}

export class Client {
    private readonly typedRest: TypedRestClient.RestClient;
    
    public constructor(port: number) {
        this.typedRest = new TypedRestClient.RestClient("internal", `http://localhost:${port}`);
    }

    public getSource(source: PresetCollectionType): PresetsClient {
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

export const DefaultClient = new Client(0x04d8);