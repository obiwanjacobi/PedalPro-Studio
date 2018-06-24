import { ApplicationDocument, PresetCollectionType } from "./ApplicationDocument";
import { Fault } from "../model/Fault";
import { ApplicationDocumentBuilder } from "./ApplicationDocumentBuilder";
import { NotificationArrayBuilder } from "./notification/NotificationArrayBuilder";
import { AddFaultAction } from "./AddFaultAction";

export const reduceFault = (
    state: ApplicationDocument, source: PresetCollectionType, fault: Fault): ApplicationDocument => {
    
    const builder = new ApplicationDocumentBuilder(state);
    const notificationBuilder = new NotificationArrayBuilder(builder.mutable.notifications);
    
    notificationBuilder.add({
        type: "warning", 
        message: fault.message, 
        context: source.toString().toUpperCase() });
    builder.mutable.notifications = notificationBuilder.detach();
    
    return builder.detach();
};

export type FaultAction = AddFaultAction;

export function reduce(state: ApplicationDocument, action: FaultAction): ApplicationDocument {
    switch (action.type) {
        case "C/fault":
        return reduceFault(state, action.source, action.fault);

        default:
        break;
    }
    return state;
}