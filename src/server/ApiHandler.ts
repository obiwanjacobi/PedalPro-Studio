import * as express from "express";
import { Fault } from "../model/Fault";

export interface ApiHandler {
    readonly uri: string;
    readonly router: express.Router;
}

export function createFault(message: string): Fault {
    return { message: message };
}