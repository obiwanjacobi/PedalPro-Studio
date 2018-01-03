import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import iassign from "immutable-assign";

import Environment from "./Environment";
import ApplicationStore from "./client/ApplicationStore";
import ApplicationTheme from "./ui/ApplicationTheme";
import Layout from "./ui/Layout";

export class Application extends React.Component {
    private appStore: ApplicationStore = new ApplicationStore();

    public static run(appElementId: string) {
        if (!Environment.isProduction) {
            iassign.freeze = true;
        }

        ReactDOM.render(<Application />, document.getElementById(appElementId));
    }

    public render() {
        return (
            <ApplicationTheme>
                <Provider store={this.appStore.store}>
                    <Layout />
                </Provider>
            </ApplicationTheme>
        );
    }
}