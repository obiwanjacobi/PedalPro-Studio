import * as TypedRestClient from "typed-rest-client/RestClient";

import { PresetCollectionType } from "./ApplicationDocument";
import { Preset } from "./Preset";
import * as ModelPreset from "../model/Preset";
import * as Storage from "../model/Storage";
import { PresetResponse, PresetRequest, DeviceResponse, BankResponse, ResponseMessage } from "../model/Messages";
import { DeviceIdentity } from "../model/DeviceIdentity";
import { StorageBank } from "./StorageBank";

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
            this.throwIfErrorPreset(response);
            // @ts-ignore:[ts] Object is possibly 'null'.
            results[i] = this.extendPreset(response.result.presets[0]);
        }
        return results;
    }

    public async replacePresets(presets: Preset[]): Promise<Preset[]> {
        const msg = <PresetRequest> { presets: presets.map(this.unextendPreset) };
        const response = await this.typedRest.replace<PresetRequest>(`${this.baseUrl}/presets/`, msg);
        this.throwIfErrorPreset(response);
        // @ts-ignore:[ts] Object is possibly 'null'.
        return response.result.presets.map(this.extendPreset);
    }

    public async getPresets(): Promise<Preset[]> {
        const response = await this.typedRest.get<PresetResponse>(`${this.baseUrl}/presets/`);
        this.throwIfErrorPreset(response);
        // @ts-ignore:[ts] Object is possibly 'null'.
        return response.result.presets.map(this.extendPreset);
    }

    public async getPresetsPaged(page: number, size: number): Promise<Preset[]> {
        const response = await this.typedRest.get<PresetResponse>(`${this.baseUrl}/presets/?page=${page}&size=${size}`);
        this.throwIfErrorPreset(response);
        // @ts-ignore:[ts] Object is possibly 'null'.
        return response.result.presets.map(this.extendPreset);
    }

    public async getPreset(presetIndex: number): Promise<Preset> {
        const response = await this.typedRest.get<PresetResponse>(`${this.baseUrl}/presets/${presetIndex}`);
        this.throwIfErrorPreset(response);
        // @ts-ignore:[ts] Object is possibly 'null'.
        const modelPreset = response.result.presets[0];
        return this.extendPreset(modelPreset);
    }

    public async getBanks(): Promise<StorageBank[]> {
        if (this.collection !== PresetCollectionType.storage) {
            throw new Error("Invalid Operation: getBanks can only be called on Storage.");
        }
        const response = await this.typedRest.get<BankResponse>(`${this.baseUrl}/`);
        this.throwIfErrorBank(response);
        // @ts-ignore:[ts] Object is possibly 'null'.
        return response.result.banks.map(this.extendBank);
    }

    public async getDeviceInfo(): Promise<DeviceIdentity> {
        const response = await this.typedRest.get<DeviceResponse>(this.baseUrl);
        this.throwIfErrorMessage(response);
        // @ts-ignore:[ts] Object is possibly 'null'.
        return response.result.device;
    }

    public async getEmptyPreset(): Promise<ModelPreset.Preset> {
        const response = await this.typedRest.get<PresetResponse>(`${this.baseUrl}/presets/empty`);
        this.throwIfErrorPreset(response);
        // @ts-ignore:[ts] Object is possibly 'null'.
        return response.result.presets[0];  // not extended!
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

    private extendBank(bank: Storage.Bank): StorageBank {
        const clientBank: StorageBank = {
            bank: bank.name, 
            ui: { expanded: false, selected: false, markedDeleted: false }
        };
        return clientBank;
    }

    private throwIfErrorBank(response: TypedRestClient.IRestResponse<BankResponse>) {
        this.throwIfErrorMessage(response);
        // @ts-ignore: possibly null
        if (!response.result.banks || response.result.banks.length === 0) {
            throw new Error("No banks were retrieved.");
        }
    }

    private throwIfErrorPreset(response: TypedRestClient.IRestResponse<PresetResponse>) {
        this.throwIfErrorMessage(response);
        // @ts-ignore: possibly null
        if (!response.result.presets || response.result.presets.length === 0) {
            throw new Error("No presets were retrieved.");
        }
    }

    private throwIfErrorMessage(response: TypedRestClient.IRestResponse<ResponseMessage>) {
        if (response.statusCode !== 200) {
            throw new Error(`Internal Error: ${response.statusCode}.`);
        }
        if (!response.result) {
            throw new Error("No Result.");
        }
        if (response.result.fault) {
            throw response.result.fault;
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