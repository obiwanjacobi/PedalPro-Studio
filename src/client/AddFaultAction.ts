import { Fault } from "../model/Fault";
import { PresetCollectionType } from "./ApplicationDocument";

export interface AddFaultAction {
    type: "C/fault";
    source: PresetCollectionType;
    fault: Fault;
}

export function createAddFaultAction(source: PresetCollectionType, fault: Fault): AddFaultAction {
    return { type: "C/fault", source: source, fault: fault };
}