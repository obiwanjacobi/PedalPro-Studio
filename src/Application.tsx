import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { ApplicationStore } from "./client/ApplicationStore";

import { ApplicationTheme } from "./ui/ApplicationTheme";
import { PresetScreen } from "./ui/PresetScreen";

export class Application extends React.PureComponent {
    private appStore: ApplicationStore = new ApplicationStore();

    public static run(appElementId: string) {
        ReactDOM.render(<Application />, document.getElementById(appElementId));
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
