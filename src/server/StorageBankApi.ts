import * as Express from "express";

import { ApiHandler } from "./ApiHandler";
import { WritePresetsApi } from "./WritePresetsApi";
import { StoragePresetProvider } from "./storage/StoragePresetProvider";
import { StorageManager } from "./storage/StorageManager";

export class StorageBankApi implements ApiHandler {
    public readonly uri: string = "/:bank";
    public readonly router: Express.Router = Express.Router({ mergeParams: true });

    private writePresetsApi: WritePresetsApi;

    public constructor(manager: StorageManager) {
        this.writePresetsApi = new WritePresetsApi(
            // tslint:disable-next-line:no-any
            (params: any) => new StoragePresetProvider(manager, params.bank));

        this.getBank = this.getBank.bind(this);

        this.router.use(this.writePresetsApi.uri, this.writePresetsApi.router);
        this.router.get("/", this.getBank);
    }

    private getBank(request: Express.Request, response: Express.Response) {
        response.json(request.params.bank);
    }
}