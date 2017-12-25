import * as React from "react";
import * as ReactDOM from "react-dom";
import Client from "./client/Client";
import Preset from "./model/Preset";
import { PresetList } from "./ui/PresetList";

export interface ApplicationProps { }

export interface ApplicationState {
    presets: Preset[];
}

export class Application extends React.Component<ApplicationProps, ApplicationState> {

    public static run(appElementId: string) {
        ReactDOM.render(<Application />, document.getElementById(appElementId));
    }

    componentWillMount() {
        this.getPresets()
            .then((result) => { this.setState({ presets: result }); });
    }

    public render() {
        if (!this.state) { return <div/>; }

        return (
            <div className="App">
                <div className="App-header">
                    <img src="./logo.svg" className="App-logo" alt="logo" />
                    <h2>Welcome to Electron + React in TypeScript.</h2>
                </div>
                <p className="App-intro">
                    This code is located in the <code>src/Application.tsx</code> file.
                </p>

                <PresetList presets={this.state.presets}/>
            </div>
        );
    }

    private async getPresets(): Promise<Preset[]> {
        const client = new Client();
        return [await client.getPreset(0), 
            await client.getPreset(1), 
            await client.getPreset(2), 
            await client.getPreset(3)];
    }
}
