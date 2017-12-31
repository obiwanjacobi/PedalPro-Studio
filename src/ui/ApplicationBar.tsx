import * as React from "react";
import { AppBar, Toolbar, Button } from "material-ui";

export default class ApplicationBar extends React.Component {
    public render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Button>Press Me!</Button>
                </Toolbar>
            </AppBar>
        );
    }
}