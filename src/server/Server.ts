import * as express from "express";
// import PresetsApi from "./PresetsApi";
// import PedalProProvider from "../pedalpro/PedalProProvider";
// import { PedalProDevice } from "../pedalpro/PedalProDevice";

// const device = PedalProDevice;
// const pedalProProvider = new PedalProProvider(device);
// static refs to all Api handlers
// const pedalProPresetsApi = new PresetsApi(pedalProProvider);

export default class Server {
    static readonly expressApp: express.Application = express();

    private port: number;

    public constructor(port: number) {
            this.port = port;
    }

    public run(): void {
        Server.expressApp.get("/", function(request: express.Request, response: express.Response) {
            response.json({ message: "TODO: Sources: " /* + device.isConnected */ });
        });

        // TODO: add source
        // Server.expressApp.use(pedalProPresetsApi.uri, pedalProPresetsApi.router);

        Server.expressApp.listen(this.port);
    }
}