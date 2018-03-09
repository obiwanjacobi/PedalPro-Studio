import * as express from "express";
import * as morgan from "morgan";

import DeviceApi from "./DeviceApi";

export default class Server {
    private readonly expressApp: express.Application = express();
    private readonly deviceApi = new DeviceApi();

    public run(port: number): void {
        this.expressApp.use(morgan("dev"));
        this.expressApp.use(this.deviceApi.uri, this.deviceApi.router);

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