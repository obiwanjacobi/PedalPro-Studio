import * as express from "express";
import { ApiHandler, createFault } from "./ApiHandler";
import { PresetResponse } from "../model/Messages";
import { PedalProProviderFactory } from "./pedalpro/PedalProProviderFactory";
import { Environment } from "../Environment";
import { PedalProDevice } from "./pedalpro/PedalProDevice";

export class EmptyApi implements ApiHandler {
    public readonly uri: string = "/empty";
    public readonly router: express.Router = express.Router();

    public constructor() {
        this.router.get("/", this.getEmptyPreset);
    }

    private getEmptyPreset(_: express.Request, response: express.Response) {
        const msg = <PresetResponse> {};

        try {
            const provider = PedalProProviderFactory.create(Environment.isProduction);
            msg.presets = [provider.getEmptyPreset()];

        } catch (error) {
            msg.fault = createFault(error.message);
        }

        response.json(msg);

        PedalProDevice.release();
    }
}