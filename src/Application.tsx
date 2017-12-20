import * as React from "react";
import * as ReactDOM from "react-dom";

export class Application extends React.Component {
    static run(appElementId: string) {
        ReactDOM.render(<Application />, document.getElementById(appElementId));
    }

    render() {
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
