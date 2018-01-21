import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
// @ts-ignore
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";

import Environment from "./Environment";
import ApplicationStore from "./client/ApplicationStore";

import ApplicationTheme from "./ui/ApplicationTheme";
import PresetScreen from "./ui/PresetScreen";

export class Application extends React.Component {
    private appStore: ApplicationStore = new ApplicationStore();

    public static run(appElementId: string) {
        if (!Environment.isProduction) {
            this.installDevTools();
        }

        ReactDOM.render(<Application />, document.getElementById(appElementId));
    }

    private static installDevTools() {
        installExtension(REACT_DEVELOPER_TOOLS)  
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
    }

    public render() {
        return (
            <ApplicationTheme>
                <Provider store={this.appStore.store}>
                    <PresetScreen />
                </Provider>
            </ApplicationTheme>
        );
    }
}