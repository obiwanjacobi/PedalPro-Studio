import * as React from "react";
import { Grid, IconButton } from "material-ui";
import Input, { InputAdornment } from "material-ui/Input";
import Clear from "material-ui-icons/Clear";

import { PresetList } from "./PresetList";
import Preset from "../client/Preset";
import { SelectPresets } from "../client/SelectPresetsAction";
import { EditPreset } from "../client/EditPresetAction";
import { MovePreset } from "../client/MovePresetAction";

export interface PresetViewStateProps { 
    presets: Preset[];
}

export interface PresetViewState {
    searchKey: string;
}

export type PresetViewAllProps = PresetViewStateProps & SelectPresets & EditPreset & MovePreset;

export class PresetView extends React.Component<PresetViewAllProps, PresetViewState> {
    public constructor(props: PresetViewAllProps) {
        super(props);
        this.state = { searchKey: "" };
    }

    public render() {
        if (!this.props.presets) { return <div>Loading...</div>; }

        return (
            <Grid container={true}>
                <Grid xs={1} item={true} hidden={{only: "xs"}}/>
                <Grid xs={6} item={true}>
                    <Input 
                        placeholder="Type to Filter Presets"
                        value={this.state.searchKey}
                        disabled={this.props.presets.length === 0}
                        onChange={(e) => this.search(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={() => this.search("")}>
                                    <Clear/>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Grid>
                <Grid xs={12} item={true}>
                    <PresetList
                        presets={this.props.presets}
                        selectPresets={this.props.selectPresets}
                        editPreset={this.props.editPreset}
                        movePreset={this.props.movePreset}
                        filter={this.state.searchKey}
                    />
                </Grid>
            </Grid>
        );
    }

    private search(value: string) {
        if (value.length > 10) { return; }
        this.setState( { searchKey: value });
    }
}