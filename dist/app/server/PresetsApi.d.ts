/// <reference types="express" />
import * as express from "express";
import ApiHandler from "./ApiHandler";
import PresetProvider from "../model/PresetProvider";
export default class PresetsApi implements ApiHandler {
    readonly uri: string;
    readonly router: express.Router;
    private readonly provider;
    constructor(provider: PresetProvider);
    private initRoutes();
    private allPresets(_, response);
    private getPreset(presetIndex, _, response);
    private newPreset(_, response);
}
