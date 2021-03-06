import * as React from "react";
import { Theme, MuiThemeProvider, createMuiTheme, withStyles } from "@material-ui/core/styles";
import { indigo, amber, orange } from "@material-ui/core/colors";

// TODO: load Application.theme.json
const appTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: indigo,
        secondary: amber,
        error: orange,
    },
    typography: {
        useNextVariants: true
    },
    overrides: {
        MuiCheckbox: {
            checked: {
                color: "#FFC107"
            }
        },
        MuiBadge: {
            badge: {
                top: "0px",
                right: "0px"
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