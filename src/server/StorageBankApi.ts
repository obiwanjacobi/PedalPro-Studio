import * as Express from "express";

import { ApiHandler } from "./ApiHandler";
import { WritePresetsApi } from "./WritePresetsApi";
import { StoragePresetProvider } from "./storage/StoragePresetProvider";
import { StorageManager } from "./storage/StorageManager";
import { BankResponse, ResponseMessage } from "../model/Messages";

export class StorageBankApi implements ApiHandler {
    public readonly uri: string = "/:bank";
    public readonly router: Express.Router = Express.Router({ mergeParams: true });

    private readonly manager: StorageManager;
    private readonly writePresetsApi: WritePresetsApi;

    public constructor(manager: StorageManager) {
        this.manager = manager;
        this.writePresetsApi = new WritePresetsApi(
            // tslint:disable-next-line:no-any
            (params: any) => new StoragePresetProvider(this.manager, params.bank));

        this.getBank = this.getBank.bind(this);
        this.deleteBank = this.deleteBank.bind(this);

        this.router.use(this.writePresetsApi.uri, this.writePresetsApi.router);
        this.router.get("/", this.getBank);
        this.router.delete("/", this.deleteBank);
    }

    private getBank(request: Express.Request, response: Express.Response) {
        const dir = this.manager.findDirectory(request.params.bank);
        if (dir) {
            const bankResponse: BankResponse = { 
                banks: [{ name: request.params.bank, files: dir.files().map(f => f.name) }]
            };
            response.json(bankResponse);
        } else {
            const errResponse: ResponseMessage = { 
                fault: { message: `The '${request.params.bank}' Bank was not found.` } 
            };
            response.json(errResponse);
        }
    }

    private deleteBank(request: Express.Request, response: Express.Response) {
        const dir = this.manager.findDirectory(request.params.bank);
        if (dir) {
            const bankResponse: BankResponse = { 
                banks: [{ name: request.params.bank, files: dir.files().map(f => f.name) }]
            };
            dir.files().forEach(f => f.delete());
            dir.delete();
            response.json(bankResponse);
        } else {
            const errResponse: ResponseMessage = { 
                fault: { message: `The '${request.params.bank}' Bank was not found.` } 
            };
            response.json(errResponse);
        }

    }
}