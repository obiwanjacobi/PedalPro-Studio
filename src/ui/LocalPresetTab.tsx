import * as React from "react";

import Preset from "../client/Preset";
import { SelectedView } from "../client/SelectedView";
import { SelectPresets } from "../client/SelectPresetsAction";
import { CopyPresets } from "../client/CopyPresetsAction";
import { UpdateScreen } from "../client/UpdateScreenAction";
import { ScreenState } from "../client/ApplicationDocument";

import { PresetView } from "./PresetView";
import { LocalPresetToolbar } from "./LocalPresetToolbar";
import { TargetPresetsScreen } from "./TargetPresetsScreen";

export interface LocalPresetTabProps {
    dialogIsOpen: boolean;
    activeCollection: string;
    presets: Preset[];
}
export type LocalPresetTabActions = SelectPresets & CopyPresets & UpdateScreen;
export type LocalPresetTabAllProps = LocalPresetTabProps & LocalPresetTabActions;

export interface LocalPresetTabState { }

export class LocalPresetTab extends React.Component<LocalPresetTabAllProps, LocalPresetTabState> {
    private selection: SelectedView<Preset>;
    
    public constructor(props: LocalPresetTabAllProps) {
        super(props);
        this.selection = new SelectedView(props.presets);
        this.state = { openDialog: false };
    }

    public render() {
        return (
            <div>
                <LocalPresetToolbar
                    enableCopy={this.enableCopy}
                    onCopy={() => this.onCopySelected()}
                    enableSelectAll={!this.selection.isEmpty}
                    valueSelectAll={this.selection.toValue()}
                    onSelectAll={() => this.toggleSelectAll()}
                />
                <PresetView 
                    presets={this.props.presets}
                    selectPresets={this.actions.selectPresets}
                />
                <TargetPresetsScreen open={this.props.dialogIsOpen} updateScreen={this.actions.updateScreen} />
            </div>
        );
    }

    public componentWillReceiveProps(newProps: LocalPresetTabAllProps) {
        this.selection = new SelectedView(newProps.presets);
    }

    private get actions(): Readonly<LocalPresetTabActions> {
        return this.props;
    }
    
    private get enableCopy(): boolean {
        if (this.props.activeCollection === "factory") { return false; }
        return this.selection.anySelected;
    }

    private onCopySelected() {
        this.openDialog(true);
        // const selectedPresets = this.selection.selected;
        // if (selectedPresets.length > 0) {
        //     this.actions.copyPresets(selectedPresets, this.props.activeCollection);
        // }
    }

    private toggleSelectAll() {
        this.actions.selectPresets(this.props.presets, !this.selection.allSelected);
    }

    private openDialog(open: boolean) {
        this.props.updateScreen(new ScreenState(open));
    }
}