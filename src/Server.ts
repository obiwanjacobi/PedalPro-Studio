import * as express from 'express';

export default class Server {
    static expressApp: express.Application;
    static run() {
        Server.expressApp = express();

        Server.expressApp.get("/", function(request, response) {
            response.json({ message: "HELLO WORLD" });
        });
        
        Server.expressApp.listen(3000);
    }
}