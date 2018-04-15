import * as express from "express";

import { Program } from "../Program";
import { ApiHandler, createFault } from "./ApiHandler";
import { StorageManager } from "./storage/StorageManager";
import { BankResponse } from "../model/Messages";

export class StorageApi implements ApiHandler {
    public readonly uri: string = "/storage";
    public readonly router: express.Router = express.Router();

    private readonly manager: StorageManager = new StorageManager(Program.locations.documents);

    public constructor() {
        this.router.get("/", this.getBanks);

        this.getBanks = this.getBanks.bind(this);
    }

    private getBanks(_: express.Request, response: express.Response): void {
        const msg = <BankResponse> { };

        try {
            msg.banks = this.manager.listBanks();
        } catch (error) {
            msg.fault = createFault(error);
        }
        response.json(msg);
    }
}