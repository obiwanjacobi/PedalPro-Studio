import * as React from "react";
import { IconButton, Typography } from "material-ui";
import Input, { InputAdornment } from "material-ui/Input";
import { Clear } from "material-ui-icons";
import { 
    CheckboxMultipleMarkedCircleOutline, CheckboxMultipleMarkedCircle, 
    Flag, FlagOutline, 
    Square, SquareOutline 
} from "mdi-material-ui";

import { PresetList } from "./PresetList";
import { Preset, presetHasChanged } from "../client/Preset";
import { SelectPresets } from "../client/SelectPresetsAction";
import { EditPreset } from "../client/EditPresetAction";
import { MovePreset } from "../client/MovePresetAction";
import { SelectedView } from "../client/controls/SelectedView";
import { ChangedView } from "../client/controls/ChangedView";

export interface PresetViewStateProps { 
    presets: Preset[];
    readonly: boolean;
    empty: React.ReactNode;
}

export interface PresetViewState {
    searchKey: string;
    enableShowEmpty: boolean;
    showEmpty: boolean;
    enableShowSelected: boolean;
    showSelected: boolean;
    enableShowChanged: boolean;
    showChanged: boolean;
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
        this.state = { 
            searchKey: "", 
            enableShowEmpty: false, 
            showEmpty: false, 
            enableShowChanged: false,
            showChanged: false, 
            enableShowSelected: false,
            showSelected: false
        };
        // bind event handlers
        this.searchHandler = this.searchHandler.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.filteredPresets = this.filteredPresets.bind(this);
        this.isVisible = this.isVisible.bind(this);
        this.toggleShowEmpty = this.toggleShowEmpty.bind(this);
        this.toggleShowSelected = this.toggleShowSelected.bind(this);
        this.toggleShowChanged = this.toggleShowChanged.bind(this);
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
                        disabled={!this.isEnabled}
                        onChange={this.searchHandler}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={this.clearSearch} disabled={!this.isEnabled}>
                                    <Clear/>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <IconButton onClick={this.toggleShowSelected} disabled={!this.state.enableShowSelected}>
                        {this.state.showSelected ? 
                            <CheckboxMultipleMarkedCircle/> : <CheckboxMultipleMarkedCircleOutline/>}
                    </IconButton>
                    {!this.props.readonly &&
                        <IconButton onClick={this.toggleShowChanged} disabled={!this.state.enableShowChanged}>
                            {this.state.showChanged ? <Flag/> : <FlagOutline/>}
                        </IconButton>}
                    {!this.props.readonly &&
                        <IconButton onClick={this.toggleShowEmpty} disabled={!this.state.enableShowEmpty}>
                            {this.state.showEmpty ? <Square/> : <SquareOutline/>}
                        </IconButton>}
                </div>
                <PresetList
                    presets={this.filteredPresets()}
                    selectPresets={this.props.selectPresets}
                    editPreset={this.props.editPreset}
                    movePreset={this.props.movePreset}
                    empty={this.hasNoSearchResult ? this.renderNoResults() : this.props.empty}
                />
            </div>
        );
    }

    public componentWillReceiveProps(props: PresetViewAllProps, newState: PresetViewState) {
        const isEnabled = props.presets.length > 0;
        const changedState = { ...newState };

        changedState.enableShowChanged = isEnabled && ChangedView.areAnyChanged(props.presets);
        if (!changedState.enableShowChanged) {
            changedState.showChanged = false;
        }
        
        changedState.enableShowSelected = isEnabled && SelectedView.areAnySelected(props.presets);
        if (!changedState.enableShowSelected) {
            changedState.showSelected = false;
        }
        
        changedState.enableShowEmpty = isEnabled && !(changedState.showChanged || changedState.showSelected);
        if (!changedState.enableShowEmpty) {
            changedState.showEmpty = false;
        }

        this.setState(changedState);
    }

    private get isEnabled(): boolean {
        return this.props.presets.length > 0;
    }

    private filteredPresets(): Preset[] {
        return  this.props.presets.filter(this.isVisible);
    }

    private isVisible(preset: Preset): boolean {
        if (!this.state.searchKey || this.state.searchKey.length === 0) {
            return this.isShown(preset);
        }

        let isMatch = preset.name.toUpperCase().search(this.state.searchKey.toUpperCase()) >= 0;
        const searchForIndex = Number(this.state.searchKey);
        if (!isNaN(searchForIndex)) {
            isMatch = preset.index.toString().search(this.state.searchKey) >= 0;
        }

        return isMatch && this.isShown(preset);
    }

    private isShown(preset: Preset): boolean {
        const isChanged = presetHasChanged(preset);
        const isSelected = preset.uiSelected;
        const isEmpty = preset.traits.empty;

        let shown = this.state.showEmpty ? true : !isEmpty;

        if (this.state.showSelected) {
            shown = isSelected;
            if (this.state.showChanged) {
                shown = isChanged || shown;
            }
        } else if (this.state.showChanged) {
            shown = isChanged;
        }
        return shown;
    }

    private toggleShowEmpty() {
        this.setNewState({ showEmpty: !this.state.showEmpty });
    }

    private toggleShowSelected() {
        this.setNewState({ showSelected: !this.state.showSelected });
    }

    private toggleShowChanged() {
        this.setNewState({ showChanged: !this.state.showChanged });
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
            this.setNewState({ searchKey: value });
        }
    }

    private renderNoResults() {
        return (
            <Typography>
                No results, adjust filter.
            </Typography>
        );
    }
    private get hasNoSearchResult(): boolean {
        return this.filteredPresets.length === 0 && this.props.presets.length > 0;
    }

    private setNewState(newState: Partial<PresetViewState>) {
        this.setState({ ...this.state, ...newState });
    }
}