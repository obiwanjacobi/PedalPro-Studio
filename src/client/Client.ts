import * as TypedRestClient from "typed-rest-client/RestClient";

import Fault from "../model/Fault";
import { PresetCollectionType } from "./ApplicationDocument";
import Preset from "./Preset";

export default class Client {
    private readonly typedRest: TypedRestClient.RestClient;

    private static initPreset(preset: Preset): void {
        preset.origin = {
            collection: PresetCollectionType.device,
            index: preset.index,
            name: preset.name,
        };
        preset.source = PresetCollectionType.device;
        preset.uiSelected = false;
        preset.uiExpanded = false;
    }

    public constructor(baseUrl: string = "http://localhost:3000") {
        this.typedRest = new TypedRestClient.RestClient("internal", baseUrl);
    }

    public async getPresets(): Promise<Preset[]> {
        const response = await this.typedRest.get<Object>("/presets/");
        this.throwIfError(response);

        const presets = response.result as Preset[];
        presets.forEach((preset: Preset) => {
            Client.initPreset(preset);
        });

        return presets;
    }

    public async getPreset(presetIndex: number): Promise<Preset> {
        const response = await this.typedRest.get<Object>("/presets/" + presetIndex);
        this.throwIfError(response);
        
        const preset = response.result as Preset;
        Client.initPreset(preset);
        return preset;
    }

    private throwIfError(response: TypedRestClient.IRestResponse<Object>) {
        // @ts-ignore: Fault
        if (response.result.error) {
            // @ts-ignore: Fault
            throw { message: response.result.error };
        }
    }
}