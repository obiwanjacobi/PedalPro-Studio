import * as React from "react";
import { Theme, MuiThemeProvider, createMuiTheme, withStyles } from "material-ui/styles";
import { indigo, amber, orange } from "material-ui/colors";

// TODO: load Application.theme.json
const appTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: indigo,
      secondary: amber,
      error: orange,
    },
    overrides: {
        MuiCheckbox: {
            checked: {
                color: "#FFC107"
            }
        }
    }
});

const globalStyles = (theme: Theme) => ({
    "@global": {
        html: {
            background: theme.palette.background.default,
            fontFamily: "Roboto, sans-serif",
      },
    },
});

// @ts-ignore
let ThemeWrapper = props => props.children;
// @ts-ignore
ThemeWrapper = withStyles(globalStyles)(ThemeWrapper);

export class ApplicationTheme extends React.PureComponent {
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