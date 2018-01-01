import * as React from "react";
import { Theme, MuiThemeProvider, createMuiTheme, withStyles } from "material-ui/styles";
import { indigo, amber } from "material-ui/colors";

// TODO: load Application.theme.json
const appTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: indigo,
      secondary: amber
    }
});

const globalStyles = (theme: Theme) => ({
    "@global": {
        html: {
            background: theme.palette.background.default,
      },
    },
});

// @ts-ignore
let ThemeWrapper = props => props.children;
// @ts-ignore
ThemeWrapper = withStyles(globalStyles)(ThemeWrapper);

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