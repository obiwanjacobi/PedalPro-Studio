import * as React from "react";
import * as ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import Client from "./client/Client";
import Preset from "./model/Preset";
import { PresetList } from "./ui/PresetList";

// TODO: load ApplicationTheme.json
const appTheme = createMuiTheme({
    palette: {
      type: "dark",
    }
  });

export interface ApplicationProps { }

export interface ApplicationState {
    presets: Preset[];
}

export class Application extends React.Component<ApplicationProps, ApplicationState> {
    public static run(appElementId: string) {
        ReactDOM.render(<Application />, document.getElementById(appElementId));
    }

    public componentWillMount() {
        this.getPresets()
            .then((result) => { this.setState({ presets: result }); });
    }

    public render() {
        if (!this.state) { return <div/>; }

        return (
            <MuiThemeProvider theme={appTheme} >
                {/*<PresetList presets={this.state.presets}/>*/}
                <div>HELLO WORLD</div>
            </MuiThemeProvider>
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
