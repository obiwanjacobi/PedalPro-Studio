import * as React from "react";
import * as ReactDOM from "react-dom";
import Client from "./client/Client";

export class Application extends React.Component {
    public static run(appElementId: string) {
        ReactDOM.render(<Application />, document.getElementById(appElementId));
    }

    componentWillMount() {
        const client = new Client("http://localhost:3000");
        client.getPreset(0)
            .then((preset) => {
                const name = preset.name;
            }).catch((reason) => {
                throw reason;
            });
    }

    public render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src="./logo.svg" className="App-logo" alt="logo" />
                    <h2>Welcome to Electron + React in TypeScript.</h2>
                </div>
                <p className="App-intro">
                    This code is located in the <code>src/Application.tsx</code> file.
                </p>
            </div>
        );
    }
}
