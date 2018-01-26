import * as express from "express";
import * as morgan from "morgan";
import PresetsApi from "./PresetsApi";
// import PedalProProvider from "../pedalpro/PedalProProvider";
// import { PedalProDevice } from "../pedalpro/PedalProDevice";
// const device = PedalProDevice;
// const pedalProProvider = new PedalProProvider(device);
// // static refs to all Api handlers
// const pedalProPresetsApi = new PresetsApi(pedalProProvider);

// test - no real usb
import TestPresetProvider from "../_tests/TestPresetProvider";
const pedalProPresetsApi = new PresetsApi(new TestPresetProvider());

export default class Server {
    static readonly expressApp: express.Application = express();

    private readonly port: number;

    public constructor(port: number) {
            this.port = port;
    }

    public run(): void {
        Server.expressApp.use(morgan("dev"));

        Server.expressApp.get("/", function(_: express.Request, response: express.Response) {
            response.json({ message: "TODO: Sources" });
        });

        // TODO: add source
        Server.expressApp.use(pedalProPresetsApi.uri, pedalProPresetsApi.router);

        Server.expressApp.listen(this.port);
    }
}