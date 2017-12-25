import * as TypedRestClient from "typed-rest-client/RestClient";
import Preset from "../model/Preset";

export default class Client {
    private readonly typedRest: TypedRestClient.RestClient;

    public constructor(baseUrl: string = "http://localhost:3000") {
        this.typedRest = new TypedRestClient.RestClient("internal", baseUrl);
    }
    
    public async getPreset(presetIndex: number): Promise<Preset> {
        const response = await this.typedRest.get<Preset>("/presets/" + presetIndex);
        if (response && response.result) {
            return response.result;
        }

        throw new RangeError("The specified preset index is invalid: " + presetIndex);
    }
}