import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";

import { toBool } from "../Extensions";

import Preset from "../client/Preset";
import { SelectedView } from "../client/SelectedView";
import ApplicationDocument, { ScreenState } from "../client/ApplicationDocument";
import { SelectPresets, createSelectPresetsAction } from "../client/SelectPresetsAction";
import { UpdateScreen, createUpdateScreenAction } from "../client/UpdateScreenAction";

import { PresetView } from "./PresetView";
import { LocalPresetToolbar } from "./LocalPresetToolbar";
import { TargetPresetsScreen } from "./TargetPresetsScreen";

export interface LocalPresetTabProps {
    activeCollection: string;
}
export interface LocalPresetTabStateProps {
    dialogIsOpen: boolean;
    presets: Preset[];
}
export type LocalPresetTabActions = SelectPresets & UpdateScreen;
export type LocalPresetTabAllProps = LocalPresetTabProps & LocalPresetTabStateProps & LocalPresetTabActions;
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
                    onCopy={() => this.openDialog(true)}
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

    private toggleSelectAll() {
        this.actions.selectPresets(this.props.presets, !this.selection.allSelected);
    }

    private openDialog(open: boolean) {
        this.props.updateScreen(new ScreenState(open));
    }
}

const extractComponentPropsFromState: MapStateToProps<
    LocalPresetTabStateProps, LocalPresetTabProps, ApplicationDocument
    > = (state: ApplicationDocument, props: LocalPresetTabProps): LocalPresetTabStateProps => {
        return  { 
            presets: state.local, 
            dialogIsOpen: toBool(state.screen.targetPresetDialogOpen)
        };
};

const createActionObject: MapDispatchToPropsFunction<LocalPresetTabActions, LocalPresetTabProps> =
    (dispatch: Dispatch<ApplicationDocument>, props: LocalPresetTabProps): LocalPresetTabActions => {
        return {
            selectPresets: (presets: Preset[], selected: boolean): void => {
                dispatch(createSelectPresetsAction(presets, selected));
            },
            updateScreen: (screen: ScreenState): void => {
                dispatch(createUpdateScreenAction(screen));
            }
        };
};

export default connect(extractComponentPropsFromState, createActionObject)(LocalPresetTab);