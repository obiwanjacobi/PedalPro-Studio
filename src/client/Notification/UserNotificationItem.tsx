import * as React from "react";
import { IconButton, Typography } from "@material-ui/core";
import { Clear, Error, ErrorOutline, Warning, Info, Healing } from "@material-ui/icons";

import { Notification, NotificationType } from "./Notification";
import { RemoveNotification } from "./RemoveNotificationAction";

export interface UserNotificationItemProps {
    notification: Notification;
}
export type UserNotificationItemActions = RemoveNotification;
export type UserNotificationItemAllProps = UserNotificationItemProps & UserNotificationItemActions;
export interface UserNotificationItemState { }

export class UserNotificationItem extends
    React.Component<UserNotificationItemAllProps, UserNotificationItemState> {

    constructor(props: UserNotificationItemAllProps) {
        super(props);
        this.remove = this.remove.bind(this);
    }

    public render() {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingLeft: "16px"
                }}
            >
                {this.renderNotificationType(this.props.notification)}
                <Typography variant="body2">{this.props.notification.message}</Typography>
                <Typography variant="body2">{this.props.notification.context}</Typography>
                <IconButton onClick={this.remove}>
                    <Clear />
                </IconButton>
            </div>
        );
    }

    private renderNotificationType(item: Notification) {
        if (!item || !item.type) { return <ErrorOutline color="error" />; }

        switch (item.type) {
            case NotificationType.Info:
                return <Info color="error" />;
            case NotificationType.Warning:
                return <Warning color="error" />;
            case NotificationType.Error:
                return <Error color="error" />;
            case NotificationType.Critical:
                return <Healing color="error" />;
            default:
                return <ErrorOutline color="error" />;
        }
    }

    private remove() {
        this.props.removeNotification(this.props.notification);
    }
}