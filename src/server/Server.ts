import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";

import { DeviceApi } from "./DeviceApi";
import { StorageApi } from "./StorageApi";

export class Server {
    private readonly expressApp: express.Application = express();
    private readonly deviceApi = new DeviceApi();
    private readonly storageApi = new StorageApi();

    public run(port: number): void {
        this.expressApp.use(morgan("dev"));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(this.deviceApi.uri, this.deviceApi.router);
        this.expressApp.use(this.storageApi.uri, this.storageApi.router);

        // Last: crude error handler
        this.expressApp.get("*", (request: express.Request, respsonse: express.Response, _: express.NextFunction) => {
            respsonse.status(404).json({ request: request.url, text: "Not found."});
        });
        this.expressApp.use(
            (error: Error, _: express.Request, respsonse: express.Response, __: express.NextFunction) => {
                respsonse.status(500).json(error);
        });

        this.expressApp.listen(port);
    }
}

/**
 * localhost:1240
 *  /device
 *      { device: <device identification> } | { fault: <error> }
 *      /presets
 *          { presets: [<all device presets>] } | { fault: <error> }
 *      /presets/empty
 *          { presets: [<one empty preset>] } | { fault: <error> }
 *      /presets/[presetIndex]
 *          { presets: [<one device preset>] } | { fault: <error> }
 *      /factory/presets
 *          { presets: [<all factory presets>] } | { fault: <error> }
 *      /factory/presets/[presetIndex]
 *          { presets: [<one factory presets>] } | { fault: <error> }
 *  /storage
 *      { banks: [<stored preset banks>] } | { fault: <error> }
 *  /storage/[bank]
 *      { presets: [<all bank presets>] } | { fault: <error> }
 *  /storage/[bank]/[presetIndex]
 *      { presets: [<one bank preset>] } | { fault: <error> }
 * 
 */