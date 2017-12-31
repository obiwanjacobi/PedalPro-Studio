import * as React from "react";
import { MuiThemeProvider, createMuiTheme, withStyles } from "material-ui/styles";
import { green, red } from "material-ui/colors";

// TODO: load Application.theme.json
const appTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: green,
      secondary: red
    }
});

// https://github.com/mui-org/material-ui/blob/8ccef39aca3c518b8f55be34b082d79823a976be/examples/nextjs/components/withRoot.js#L6-L17
const styles = theme => ({
    "@global": {
        html: {
            background: theme.palette.background.default,
      },
    },
});

let ThemeWrapper = props => props.children;
ThemeWrapper = withStyles(styles)(ThemeWrapper);

export default class ApplicationTheme extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={appTheme}>
                <ThemeWrapper>
                    {this.props.children}
                </ThemeWrapper>
            </MuiThemeProvider>
        );
    }
}