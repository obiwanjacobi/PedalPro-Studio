import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import ApplicationTheme from "./ui/ApplicationTheme";
import ApplicationStore from "./client/ApplicationStore";
import Layout from "./ui/Layout";

export class Application extends React.Component {
    private appStore: ApplicationStore = new ApplicationStore();

    public static run(appElementId: string) {
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