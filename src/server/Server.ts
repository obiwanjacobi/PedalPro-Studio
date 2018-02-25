import * as express from "express";
import * as morgan from "morgan";

import PresetsApi from "./PresetsApi";

import PedalProProvider from "../pedalpro/PedalProProvider";
const pedalProProvider = new PedalProProvider();
const pedalProPresetsApi = new PresetsApi(pedalProProvider);

// test - no real usb
// import TestPresetProvider from "../_tests/TestPresetProvider";
// const pedalProPresetsApi = new PresetsApi(new TestPresetProvider());

export default class Server {
    static readonly expressApp: express.Application = express();

    private readonly port: number;

    public constructor(port: number) {
            this.port = port;
    }

    public run(): void {
        Server.expressApp.use(morgan("dev"));

        // TODO: add source
        Server.expressApp.get("/", function(_: express.Request, response: express.Response) {
            response.json({ message: "TODO: Sources" });
        });

        Server.expressApp.use(pedalProPresetsApi.uri, pedalProPresetsApi.router);

        // Last: crude error handler
        Server.expressApp.get("*", (request: express.Request, respsonse: express.Response, _: express.NextFunction) => {
            respsonse.status(404).json({ request: request.url, text: "Not found."});
        });
        Server.expressApp.use(
            (error: any, _: express.Request, respsonse: express.Response, __: express.NextFunction) => {
                respsonse.status(500).json(error);
        });

        Server.expressApp.listen(this.port);
    }
}