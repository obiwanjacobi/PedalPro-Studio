import { RemoveNotificationAction } from "./RemoveNotificationAction";
import { Notification } from "./Notification";

// all actions this reducer handles
export type NotificationAction = RemoveNotificationAction;

const reduceRemoveNotification = (state: Notification[], notification: Notification): Notification[] => {
    const index = state.indexOf(notification);
    if (index === -1) { return state; }

    const newState = state.slice();
    newState.splice(index, 1);
    return newState;
};

export const reduce = (state: Notification[] = Array<Notification>(), action: NotificationAction): Notification[] => {
    switch (action.type) {
        case "D/notification/":
        return reduceRemoveNotification(state, action.notification);

        default:
        return state;
    }
};