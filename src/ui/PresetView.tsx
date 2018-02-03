import * as React from "react";
import { Grid, IconButton } from "material-ui";
import Input, { InputAdornment } from "material-ui/Input";
import Clear from "material-ui-icons/Clear";
import { AutoSizer } from "react-virtualized";

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

export class PresetView extends React.PureComponent<PresetViewAllProps, PresetViewState> {
    public constructor(props: PresetViewAllProps) {
        super(props);
        this.state = { searchKey: "" };
        // bind event handlers
        this.searchHandler = this.searchHandler.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }

    public render() {
        if (!this.props.presets) { return <div className="loading">Loading...</div>; }

        return (
            <div style={{height: "100%"}}>
                <Input 
                    placeholder="Type to Filter Presets"
                    value={this.state.searchKey}
                    disabled={this.props.presets.length === 0}
                    onChange={this.searchHandler}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={this.clearSearch}>
                                <Clear/>
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <div/>
                <AutoSizer>
                    {({height, width}) => (
                        <div id="PresetListContainer" style={{height: height, width: width}}>
                        <PresetList
                            presets={this.props.presets}
                            selectPresets={this.props.selectPresets}
                            editPreset={this.props.editPreset}
                            movePreset={this.props.movePreset}
                            filter={this.state.searchKey}
                        />
                        </div>
                    )}
                </AutoSizer>
            </div>
        );
    }

    private clearSearch() {
        this.search("");
    }
    
    private searchHandler(e: React.ChangeEvent<HTMLInputElement>) {
        this.search(e.target.value);
    }

    private search(value: string) {
        if (value.length > 10) { return; }
        if (this.state.searchKey !== value) {
            this.setState( { searchKey: value });
        }
    }
}