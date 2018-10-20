import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Drawer, Divider, IconButton, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

import { ApplicationDocument } from "../ApplicationDocument";
import { NotificationState } from "./NotificationState";
import { Notification } from "./Notification";
import { UserNotificationItem } from "./UserNotificationItem";
import { RemoveNotification, createRemoveNotificationAction } from "./RemoveNotificationAction";
import UserInteractive from "./UserInteractive";

export interface UserNotificationProps { }
export interface UserNotificationStateProps {
    notification: NotificationState;
}
export interface UserNotificationState {
    open: boolean;
    count: number;
}
export type UserNotificationActions = RemoveNotification;
export type UserNotificationAllProps = UserNotificationProps & UserNotificationStateProps & UserNotificationActions;

export class UserNotification extends React.Component<UserNotificationAllProps, UserNotificationState> {
    public constructor(props: UserNotificationAllProps) {
        super(props);
        this.state = { open: false, count: 0 };

        this.renderNotification = this.renderNotification.bind(this);
        this.removeNotification = this.removeNotification.bind(this);
        this.close = this.close.bind(this);
    }

    public componentWillReceiveProps(newProps: UserNotificationAllProps) {
        if (newProps.notification.interactive && !this.state.open) {
            this.setState({ open: true, count: newProps.notification.notifications.length });
        } else if (this.state.count < newProps.notification.notifications.length &&
            !this.state.open) {
            this.setState({ open: true, count: newProps.notification.notifications.length });
        } else if (newProps.notification.notifications.length === 0 &&
            this.state.open) {
            this.setState({ open: false, count: 0 });
        }
    }

    public render() {
        if (this.props.notification.interactive && this.state.open) {
            return (<UserInteractive />);
        }

        return (
            <Drawer anchor="bottom" open={this.state.open}>
                <header
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "nowrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16 0 0 12"
                    }}
                >
                    <Typography variant="h6" align="left" gutterBottom={true} style={{ paddingLeft: "16px" }}>
                        Notifications
                    </Typography>
                    <IconButton onClick={this.close}>
                        <ExpandMore />
                    </IconButton>
                </header>
                <Divider />
                {this.renderNotifications()}
            </Drawer>
        );
    }

    private renderNotifications() {
        return this.props.notification.notifications.map(this.renderNotification);
    }

    private renderNotification(item: Notification, index: number) {
        return (
            <UserNotificationItem notification={item} key={index} removeNotification={this.removeNotification} />
        );
    }

    private removeNotification(notification: Notification) {
        this.props.removeNotification(notification);
        this.setState({ count: this.state.count - 1 });
    }

    private close() {
        this.setState({ open: false });
    }
}

const extractComponentPropsFromState = (state: ApplicationDocument): UserNotificationStateProps => {
    return { notification: state.notification };
};

const createActionObject = (dispatch: Dispatch): UserNotificationActions => {
    return {
        removeNotification: (notification: Notification): void => {
            dispatch(createRemoveNotificationAction(notification));
        }
    };
};

export default connect(extractComponentPropsFromState, createActionObject)(UserNotification);
