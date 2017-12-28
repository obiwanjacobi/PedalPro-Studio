import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import { Grid, AppBar, Toolbar, Button } from "material-ui";

import ApplicationStore from "./client/ApplicationStore";
import PresetScreen from "./ui/PresetScreen";

// TODO: load Application.theme.json
const appTheme = createMuiTheme({
    palette: {
      type: "dark", // does not work??
    }
  });

export interface ApplicationProps { }
export interface ApplicationState { }

export class Application extends React.Component<ApplicationProps, ApplicationState> {
    private appStore: ApplicationStore = new ApplicationStore();

    public static run(appElementId: string) {
        ReactDOM.render(<Application />, document.getElementById(appElementId));
    }

    public render() {
        return (
            <MuiThemeProvider theme={appTheme}>
                <Provider store={this.appStore.store}>
                    <Grid container={true} spacing={16}>
                        <Grid item={true} xs={12}>
                            <AppBar position="static">
                                <Toolbar>
                                    <Button>Press Me!</Button>
                                </Toolbar>
                            </AppBar>
                        </Grid>
                        <Grid item={true} xs={12}>
                            <PresetScreen />
                        </Grid>
                        <Grid item={true} xs={12}>
                            Line 2
                        </Grid>
                        <Grid item={true} xs={12}>
                            Line 3
                        </Grid>
                    </Grid>
                </Provider>
            </MuiThemeProvider>
        );
    }
}