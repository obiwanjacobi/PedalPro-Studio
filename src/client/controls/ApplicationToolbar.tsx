import * as React from "react";
import { AppBar, Toolbar } from "@material-ui/core";

export class ApplicationToolbar extends React.Component {
    public render() {
        return (
            <AppBar position="static">
                <Toolbar disableGutters={true}>
                    {this.props.children}
                </Toolbar>
            </AppBar>
        );
    }
}
