import { ArrayBuilder, ItemBuilder, CopyOption } from "../StateBuilder";
import { Notification } from "./Notification";
import { NotificationState } from "./NotificationState";
import { Interactive } from "./Interactive";

export class NotificationBuilder extends ItemBuilder<NotificationState> {
    public constructor(state: NotificationState, option: CopyOption = CopyOption.ByVal) {
        super();
        this.state = option === CopyOption.ByVal ? { ...state } : state;
    }

    public setNotifications(notifications: Notification[]) {
        this.mutable.notifications = notifications;
    }

    public setInteractive(interactive?: Interactive) {
        this.mutable.interactive = interactive;
    }
}

export class NotificationArrayBuilder extends ArrayBuilder<Notification> {
    public constructor(notifications: Notification[]) {
        super(notifications);
    }

    public remove(notification: Notification) {
        const index = this.mutable.indexOf(notification);
        if (index === -1) { return; }

        this.mutable.splice(index, 1);
    }
}