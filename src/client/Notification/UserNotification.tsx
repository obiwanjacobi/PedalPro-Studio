import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { Drawer, Divider, IconButton, Typography } from "material-ui";
import { ExpandMore } from "material-ui-icons";

import ApplicationDocument from "../ApplicationDocument";

import Notification from "./Notification";
import UserNotificationItem from "./UserNotificationItem";
import { RemoveNotification, createRemoveNotificationAction } from "./RemoveNotificationAction";

export interface UserNotificationProps {}
export interface UserNotificationStateProps {
    notifications: Notification[];
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
        if (this.state.count < newProps.notifications.length &&
            !this.state.open) { 
            this.setState({ open: true, count: newProps.notifications.length });
        }
        if (newProps.notifications.length === 0 &&
            this.state.open) {
            this.setState({ open: false, count: 0 });
        }
    }

    public render() {
        return (
            <Drawer
                anchor="bottom"
                open={this.state.open}
            >
                <header 
                    style={{
                        display: "flex", 
                        flexDirection: "row", 
                        flexWrap: "nowrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16 0 0 12"}}
                >
                    <Typography type="title" align="left" gutterBottom={true}>
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
        return this.props.notifications.map(this.renderNotification);
    }

    private renderNotification(item: Notification, index: number) {
        return (
            <UserNotificationItem notification={item} key={index} removeNotification={this.removeNotification}/>
        );
    }

    private removeNotification(notification: Notification) {
        this.props.removeNotification(notification);
        this.setState({ open: this.state.open, count: this.state.count - 1});
    }

    private close() {
        this.setState({ open: false, count: this.state.count });
    }    
}

const extractComponentPropsFromState: MapStateToProps<
        UserNotificationStateProps, UserNotificationProps, ApplicationDocument
    > = (state: ApplicationDocument, _: UserNotificationProps): UserNotificationStateProps => {
        return  { notifications: state.notifications };
};

const createActionObject: MapDispatchToPropsFunction<UserNotificationActions, UserNotificationProps> =
    (dispatch: Dispatch<ApplicationDocument>, _: UserNotificationProps): UserNotificationActions => {
        return {
            removeNotification: (notification: Notification): void => {
                dispatch(createRemoveNotificationAction(notification));
            }
        };
};

export default connect(extractComponentPropsFromState, createActionObject)(UserNotification);
