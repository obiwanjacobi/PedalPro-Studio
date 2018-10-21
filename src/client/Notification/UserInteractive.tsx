import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import { Error as ErrorIcon, Help as HelpIcon } from "@material-ui/icons";

import { ApplicationDocument } from "../ApplicationDocument";
import { Interactive, InteractiveOptions, InteractiveIcon } from "./Interactive";
import { SetInteractive, createSetInteractiveAction } from "./SetInteractiveAction";

type UserInteractiveStoreProps = {
    interactive: Interactive;
};
type UserInteractiveActions = SetInteractive;
type UserInteractiveAllProps = UserInteractiveStoreProps & UserInteractiveActions;

class UserInteractive extends React.Component<UserInteractiveAllProps> {
    public constructor(props: UserInteractiveAllProps) {
        super(props);
        this.close = this.close.bind(this);
        this.ok = this.ok.bind(this);
    }

    public render(): React.ReactNode {
        return (
            <Dialog open={true}>
                <DialogTitle>{this.props.interactive.caption}</DialogTitle>
                <DialogContent>
                    {this.renderIcon()}
                    <DialogContentText>{this.props.interactive.message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* tslint:disable-next-line:no-bitwise */}
                    {(this.props.interactive.buttons & InteractiveOptions.Ok) &&
                        <Button onClick={this.ok}>Ok</Button>}
                    {/* tslint:disable-next-line:no-bitwise */}
                    {(this.props.interactive.buttons & InteractiveOptions.Cancel) &&
                        <Button onClick={this.close}>Cancel</Button>}
                </DialogActions>
            </Dialog>
        );
    }

    private renderIcon(): React.ReactNode {
        // if (this.props.interactive.icon) {
        //     switch (this.props.interactive.icon) {
        //         case InteractiveIcon.Question:
        //             return <HelpIcon />;
        //         case InteractiveIcon.Exclamation:
        //             return <ErrorIcon />;
        //         default:
        //             break;
        //     }
        // }
        return null;
    }

    private ok() {
        this.props.setInteractive({ ...this.props.interactive, action: InteractiveOptions.Ok });
    }

    private close() {
        this.props.setInteractive({ ...this.props.interactive, action: InteractiveOptions.Cancel });
    }
}

const extractComponentPropsFromState = (state: ApplicationDocument): UserInteractiveStoreProps => {
    if (state.notification.interactive) {
        return { interactive: state.notification.interactive };
    }
    throw new Error("UserInteractive control active without state.");
};

const createActionObject = (dispatch: Dispatch): UserInteractiveActions => {
    return {
        setInteractive: (interactive: Interactive) => {
            dispatch(createSetInteractiveAction(interactive));
        }
    };
};

export default connect(extractComponentPropsFromState, createActionObject)(UserInteractive);
