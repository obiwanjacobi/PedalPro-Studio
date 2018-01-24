import * as React from "react";
import { AppBar, Toolbar } from "material-ui";

// const styles = theme => ({
//     checkbox: {
        
//     }
// });

export default class ApplicationToolbar extends React.PureComponent {
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

// export default withStyles(styles)(ApplicationToolbar);