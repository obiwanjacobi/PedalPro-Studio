import * as TypedRestClient from "typed-rest-client/RestClient";
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
        const response = await this.typedRest.get<Preset[]>("/presets/");
        if (response && response.result) {
            response.result.forEach((item: Preset) => {
                Client.initPreset(item);
            });
            return response.result;
        }

        throw new RangeError(`The presets could not be retrieved (${response.statusCode}).`);
    }

    public async getPreset(presetIndex: number): Promise<Preset> {
        const response = await this.typedRest.get<Preset>("/presets/" + presetIndex);
        if (response && response.result) {
            Client.initPreset(response.result);
            return response.result;
        }

        throw new RangeError("The specified preset index is invalid: " + presetIndex);
    }
}