import * as TypedRestClient from "typed-rest-client/RestClient";

import { PresetCollectionType } from "./ApplicationDocument";
import { Preset } from "./preset/Preset";
import * as ModelPreset from "../model/Preset";
import * as Storage from "../model/Storage";
import { PresetResponse, DeviceResponse, BankResponse, ResponseMessage } from "../model/Messages";
import { DeviceIdentity } from "../model/DeviceIdentity";
import { StorageBank } from "./storage/StorageBank";
import { distinct } from "../ArrayExtensions";
import { storagePresetsForBank } from "./storage/BankOperations";

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

    public async replacePresets(presets: Preset[]): Promise<Preset[]> {
        const banks = this.extractBankNames(presets);

        if (banks.length) {
            const replacedPresets = new Array<Preset>();
            // using simple for-loop because of await
            for (let i = 0; i < banks.length; i++) {
                const bankPresets = storagePresetsForBank(presets, banks[i]);
                const savedPresets = await this.requestSavePreset(bankPresets, banks[i]);
                replacedPresets.push(...savedPresets);
            }
            return replacedPresets;
        } else {
            return await this.requestSavePreset(presets);
        }
    }

    public async getPresets(): Promise<Preset[]> {
        const response = await this.typedRest.get<PresetResponse>(`${this.baseUrl}/presets/`);
        this.throwIfErrorMessage(response);
        // @ts-ignore:[ts] Object is possibly 'null'.
        return response.result.presets.map(this.extendPreset);
    }

    public async getPresetsPaged(page: number, size: number): Promise<Preset[]> {
        const response = await this.typedRest.get<PresetResponse>(`${this.baseUrl}/presets/?page=${page}&size=${size}`);
        this.throwIfErrorMessage(response);
        // @ts-ignore:[ts] Object is possibly 'null'.
        return response.result.presets.map(this.extendPreset);
    }

    public async getPreset(presetIndex: number): Promise<Preset> {
        const response = await this.typedRest.get<PresetResponse>(`${this.baseUrl}/presets/${presetIndex}`);
        this.throwIfErrorMessage(response);
        // @ts-ignore:[ts] Object is possibly 'null'.
        const modelPreset = response.result.presets[0];
        return this.extendPreset(modelPreset);
    }

    public async getStorageBanks(): Promise<StorageBank[]> {
        if (this.collection !== PresetCollectionType.storage) {
            throw new Error("Invalid Operation: getStorageBanks can only be called on Storage.");
        }
        const response = await this.typedRest.get<BankResponse>(`${this.baseUrl}/`);
        this.throwIfErrorMessage(response);
        // @ts-ignore:[ts] Object is possibly 'null'.
        return response.result.banks.map(this.extendBank);
    }

    public async getStorageBankPresets(bank: string): Promise<Preset[]> {
        try {
            const response = await this.typedRest.get<PresetResponse>(`${this.baseUrl}/${bank}/presets/`);
            this.throwIfErrorMessage(response);
            // @ts-ignore:[ts] Object is possibly 'null'.
            return response.result.presets.map((p: ModelPreset.Preset) => {
                const preset = this.extendPreset(p);
                preset.group = { name: bank, originName: bank };
                return preset;
            });
        } catch (error) {
            throw error;
        }
    }

    public async deleteStorageBank(bank: string): Promise<StorageBank[]> {
        const response = await this.typedRest.del<BankResponse>(`${this.baseUrl}/${bank}`);
        this.throwIfErrorMessage(response);
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
        this.throwIfErrorMessage(response);
        // @ts-ignore:[ts] Object is possibly 'null'.
        return response.result.presets[0];  // not extended!
    }

    private async requestSavePreset(presets: Preset[], bank?: string): Promise<Preset[]> {
        const url = bank ? `${this.baseUrl}/${bank}/presets/` : `${this.baseUrl}/presets/`;
        const msg = { presets: presets.map(this.unextendPreset) };
        const response = await this.typedRest.replace<PresetResponse>(url, msg);
        this.throwIfErrorMessage(response);
        // @ts-ignore:[ts] Object is possibly 'null'.
        return response.result.presets.map(this.extendPreset);
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
            name: bank.name, 
            loaded: false,
            created: true,
            empty: false,
            origin: bank,
            ui: { expanded: false, selected: false, markedDeleted: false }
        };
        return clientBank;
    }

    private extractBankNames(presets: Preset[]): string[] {
        if (presets.length) {
            return distinct(presets
                .map(p => p.group ? p.group.name : "")
                .filter(n => n.length));
        }
        return [];
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