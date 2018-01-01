import * as React from "react";
import { TextField } from "material-ui";

import Preset from "../model/Preset";
import { PresetList, PresetListEvents } from "./PresetList";

export interface PresetViewProps {}
export interface PresetViewStateProps { 
    presets: Preset[];
}
export interface PresetViewState {
    searchKey: string;
}

export type PresetViewAllProps = PresetViewProps & PresetViewStateProps & PresetListEvents;

export class PresetView extends React.Component<PresetViewAllProps, PresetViewState> {
    public constructor(props: PresetViewAllProps) {
        super(props);
        this.state = { searchKey: "" };
    }

    public render() {
        return (
            <div>
                <TextField placeholder="Type to Filter" fullWidth={true} value={this.state.searchKey} />
                <PresetList presets={this.props.presets} onSelectionChanged={this.props.onSelectionChanged} />
            </div>
        );
    }
}