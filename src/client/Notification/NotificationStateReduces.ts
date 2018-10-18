import { RemoveNotificationAction } from "./RemoveNotificationAction";
import { Notification } from "./Notification";
import { ApplicationDocumentBuilder } from "../ApplicationDocumentBuilder";
import { ApplicationDocument } from "../ApplicationDocument";

// all actions this reducer handles
export type NotificationAction = RemoveNotificationAction;

const reduceRemoveNotification = (state: Notification[], notification: Notification): Notification[] => {
    const index = state.indexOf(notification);
    if (index === -1) { return state; }

    const newState = state.slice();
    newState.splice(index, 1);
    return newState;
};

export function reduce(state: ApplicationDocument, action: NotificationAction): ApplicationDocument {

    const builder = new ApplicationDocumentBuilder(state);

    let notifications = state.notification.notifications;

    switch (action.type) {
        case "D/notification/":
            notifications = reduceRemoveNotification(state.notification.notifications, action.notification);
            break;

        default:
            return state;
    }

    builder.mutable.notification.notifications = notifications;
    return builder.detach();
}