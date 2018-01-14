import Preset from "../model/Preset";

export enum TargetOperation {
    None,
    Replace,
    AddToEnd
}

export default class TargetPreset {
    source: Preset;
    target: Preset;
    operation: TargetOperation;
}
