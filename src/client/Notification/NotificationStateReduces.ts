import { RemoveNotificationAction } from "./RemoveNotificationAction";
import { Notification } from "./Notification";
import { ApplicationDocumentBuilder } from "../ApplicationDocumentBuilder";
import { ApplicationDocument } from "../ApplicationDocument";
import { SetInteractiveAction, SetInteractiveActionKey } from "./SetInteractiveAction";
import { NotificationArrayBuilder, NotificationBuilder } from "./NotificationArrayBuilder";
import { NotificationState } from "./NotificationState";
import { Interactive } from "./Interactive";

// all actions this reducer handles
export type NotificationAction = SetInteractiveAction | RemoveNotificationAction;

function reduceRemoveNotification(state: NotificationState, notification: Notification): NotificationState {
    const builder = new NotificationBuilder(state);
    const arrayBuilder = new NotificationArrayBuilder(builder.mutable.notifications);
    arrayBuilder.remove(notification);
    builder.setNotifications(arrayBuilder.detach());
    return builder.detach();
}

function reduceSetInteractive(state: NotificationState, interactive?: Interactive): NotificationState {
    const builder = new NotificationBuilder(state);
    builder.setInteractive(interactive);
    return builder.detach();
}

export function reduce(state: ApplicationDocument, action: NotificationAction): ApplicationDocument {

    const builder = new ApplicationDocumentBuilder(state);
    let notification = state.notification;

    switch (action.type) {
        case SetInteractiveActionKey.value:
            notification = reduceSetInteractive(notification, action.interactive);
            break;

        case "D/notification/":
            notification = reduceRemoveNotification(notification, action.notification);
            break;

        default:
            return state;
    }

    builder.mutable.notification = notification;
    return builder.detach();
}