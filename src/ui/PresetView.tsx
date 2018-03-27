import * as React from "react";
import { IconButton } from "material-ui";
import Input, { InputAdornment } from "material-ui/Input";
import Clear from "material-ui-icons/Clear";
import { Square, SquareOutline } from "mdi-material-ui";

import { PresetList } from "./PresetList";
import { Preset } from "../client/Preset";
import { SelectPresets } from "../client/SelectPresetsAction";
import { EditPreset } from "../client/EditPresetAction";
import { MovePreset } from "../client/MovePresetAction";

export interface PresetViewStateProps { 
    presets: Preset[];
}

export interface PresetViewState {
    searchKey: string;
    showEmpty: boolean;
}

export type PresetViewAllProps = PresetViewStateProps & SelectPresets & Partial<EditPreset> & Partial<MovePreset>;

const containerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
};

export class PresetView extends React.PureComponent<PresetViewAllProps, PresetViewState> {
    public constructor(props: PresetViewAllProps) {
        super(props);
        this.state = { searchKey: "", showEmpty: false };
        // bind event handlers
        this.searchHandler = this.searchHandler.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.filteredPresets = this.filteredPresets.bind(this);
        this.isVisible = this.isVisible.bind(this);
        this.toggleShowEmpty = this.toggleShowEmpty.bind(this);
    }

    public render() {
        if (!this.props.presets) { return <div className="loading" style={containerStyles}>Loading...</div>; }

        return (
            <div id="PresetView" style={containerStyles}>
                <div>
                    <Input 
                        style={{paddingLeft: 16}}
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
                    <IconButton onClick={this.toggleShowEmpty}>
                        {this.state.showEmpty ? <Square/> : <SquareOutline/>}
                    </IconButton>
                </div>
                <PresetList
                    presets={this.filteredPresets()}
                    selectPresets={this.props.selectPresets}
                    editPreset={this.props.editPreset}
                    movePreset={this.props.movePreset}
                    filter={this.state.searchKey}
                />
            </div>
        );
    }

    private filteredPresets(): Preset[] {
        return  this.props.presets.filter(this.isVisible);
    }

    private isVisible(preset: Preset): boolean {
        if (!this.state.searchKey || this.state.searchKey.length === 0) {
            return this.isShowEmpty(preset);
        }

        let isMatch = preset.name.toUpperCase().search(this.state.searchKey.toUpperCase()) >= 0;
        const searchForIndex = Number(this.state.searchKey);
        if (!isNaN(searchForIndex)) {
            isMatch = preset.index.toString().search(this.state.searchKey) >= 0;
        }
        return isMatch && this.isShowEmpty(preset);
    }

    private isShowEmpty(preset: Preset): boolean {
        if (this.state.showEmpty) {
            return true;
        }

        return !preset.traits.empty;
    }

    private toggleShowEmpty() {
        this.setState({ searchKey: this.state.searchKey, showEmpty: !this.state.showEmpty });
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