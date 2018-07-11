import { ArrayBuilder } from "../StateBuilder";
import { Notification } from "../notification/Notification";

export class NotificationArrayBuilder extends ArrayBuilder<Notification> {
    public constructor(notifications: Notification[]) {
        super(notifications);
    }
}