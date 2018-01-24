import Preset from "./Preset";
export default class Client {
    private readonly typedRest;
    private static initPreset(preset);
    constructor(baseUrl?: string);
    getPresets(): Promise<Preset[]>;
    getPreset(presetIndex: number): Promise<Preset>;
}
