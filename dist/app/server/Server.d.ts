/// <reference types="express" />
import * as express from "express";
export default class Server {
    static readonly expressApp: express.Application;
    private readonly port;
    constructor(port: number);
    run(): void;
}
