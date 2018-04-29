import { ApplicationDocument, PresetCollectionType } from "./ApplicationDocument";
import { Fault } from "../model/Fault";
import { ApplicationDocumentBuilder } from "./ApplicationDocumentBuilder";
import { NotificationArrayBuilder } from "./notification/NotificationArrayBuilder";

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
