/// <reference types="express" />
import * as express from "express";
export default interface ApiHandler {
    readonly uri: string;
    readonly router: express.Router;
}
