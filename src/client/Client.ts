import * as TypedRestClient from "typed-rest-client/RestClient";
import { PresetCollection } from "./ApplicationDocument";
import Preset from "./Preset";

export default class Client {
    private readonly typedRest: TypedRestClient.RestClient;

    public constructor(baseUrl: string = "http://localhost:3000") {
        this.typedRest = new TypedRestClient.RestClient("internal", baseUrl);
    }
    
    public async getPresets(): Promise<Preset[]> {
        const response = await this.typedRest.get<Preset[]>("/presets/");
        if (response && response.result) {
            response.result.forEach((item: Preset) => {
                item.source = PresetCollection.device;
                item.selected = false;
            });
            return response.result;
        }

        throw new RangeError(`The presets could not be retrieved (${response.statusCode}).`);
    }

    public async getPreset(presetIndex: number): Promise<Preset> {
        const response = await this.typedRest.get<Preset>("/presets/" + presetIndex);
        if (response && response.result) {
            response.result.source = PresetCollection.device;
            response.result.selected = false;
            return response.result;
        }

        throw new RangeError("The specified preset index is invalid: " + presetIndex);
    }
}