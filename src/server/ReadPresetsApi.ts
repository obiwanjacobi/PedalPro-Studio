import * as Express from "express";
import { ApiHandler, createFault } from "./ApiHandler";
import { PresetProvider } from "./PresetProvider";
import { PresetResponse } from "../model/Messages";

// tslint:disable-next-line:no-any
export type PresetProviderFactory = (params: any) => PresetProvider;

export class ReadPresetsApi implements ApiHandler {
    public readonly uri: string = "/presets";
    public readonly router: Express.Router = Express.Router({ mergeParams: true });

    private readonly providerFactory: PresetProviderFactory;
    
    public constructor(providerFactory: PresetProviderFactory) {
        this.providerFactory = providerFactory;

        this.getPresets = this.getPresets.bind(this);
        this.getPreset = this.getPreset.bind(this);

        this.router.get("/", this.getPresets);
        this.router.get("/:presetIndex", this.getPreset);
    }

    // tslint:disable-next-line:no-any
    protected createProvider(params: any): PresetProvider {
        return this.providerFactory(params);
    }

    protected throwIfNaN(presetIndex: number) {
        if (isNaN(presetIndex)) {
            throw new Error("Expected Preset Index is not a number.");
        }
    }

    private getPresets(request: Express.Request, response: Express.Response) {
        const page = request.query.page;
        const size = request.query.size;
        const msg = <PresetResponse> { };

        try {
            const provider = this.createProvider(request.params);
            if (page && size) {
                msg.presets = provider.getPresetsPaged(Number(page), Number(size));
            } else {
                msg.presets = provider.getPresets();
            }
        } catch (error) {
            msg.fault = createFault(error.message);
        }

        response.json(msg);
    }

    private getPreset(request: Express.Request, response: Express.Response) {
        const msg = <PresetResponse> { };
        const presetIndex: number = Number(request.params.presetIndex);

        try {
            this.throwIfNaN(presetIndex);
            const provider = this.createProvider(request.params);
            msg.presets = [provider.getPreset(presetIndex)];
        } catch (error) {
            msg.fault = createFault(error.message);
        }
        response.json(msg);
    }
}