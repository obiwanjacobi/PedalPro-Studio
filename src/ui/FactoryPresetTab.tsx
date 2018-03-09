import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";

import Preset from "../client/Preset";
import { SelectedView } from "../client/controls/SelectedView";
import ApplicationDocument, { PresetCollectionType } from "../client/ApplicationDocument";
import { LoadPresets, createLoadPresetsAction } from "../client/LoadPresetsAction";
import { SelectPresets, createSelectPresetsAction } from "../client/SelectPresetsAction";
import { CopyPresets, createCopyPresetsAction } from "../client/CopyPresetsAction";
import { EditPreset, createEditPresetAction } from "../client/EditPresetAction";
import { MovePreset, createMovePresetAction } from "../client/MovePresetAction";

import { PresetToolbar } from "./PresetToolbar";
import { PresetView } from "./PresetView";

export interface FactoryPresetTabProps { }
export interface FactoryPresetTabStateProps { 
    presets: Preset[];
}
export type FactoryPresetTabActions = SelectPresets & LoadPresets & CopyPresets & EditPreset & MovePreset;
export type FactoryPresetTabAllProps = 
    FactoryPresetTabProps & FactoryPresetTabStateProps & FactoryPresetTabActions;

const conatinerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
};

export class FactoryPresetTab extends React.Component<FactoryPresetTabAllProps> {
    private selection: SelectedView<Preset>;

    public constructor(props: FactoryPresetTabAllProps) {
        super(props);
        this.selection = new SelectedView(props.presets);
        // bind event handlers
        this.onCopySelected = this.onCopySelected.bind(this);
        this.download = this.download.bind(this);
        this.toggleSelectAll = this.toggleSelectAll.bind(this);
    }

    public render() {
        return (
            <div id="FactoryPresetTab" style={conatinerStyles}>
                <PresetToolbar 
                    enableCopy={this.selection.anySelected}
                    onCopy={this.onCopySelected}
                    enableDownload={true}
                    onDownload={this.download}
                    enableUpload={!this.selection.isEmpty}
                    enableSelectAll={!this.selection.isEmpty}
                    valueSelectAll={this.selection.toValue()}
                    onSelectAll={this.toggleSelectAll}
                />
                <PresetView 
                    presets={this.props.presets}
                    selectPresets={this.actions.selectPresets}
                    editPreset={this.actions.editPreset}
                    movePreset={this.actions.movePreset}
                />
            </div>
        );
    }

    public shouldComponentUpdate(nextProps: FactoryPresetTabAllProps, _: {}): boolean {
        return this.props.presets !== nextProps.presets;
    }

    public componentWillReceiveProps(newProps: FactoryPresetTabAllProps) {
        this.selection = new SelectedView(newProps.presets);
    }

    protected get actions(): FactoryPresetTabActions {
        return this.props;
    }

    private onCopySelected() {
        const selectedPresets = this.selection.selected;
        if (selectedPresets.length > 0) {
            this.actions.copyPresets(selectedPresets, PresetCollectionType.storage);
        }
    }

    private toggleSelectAll() {
        this.actions.selectPresets(this.props.presets, {selected: !this.selection.allSelected});
    }

    private download() {
        this.actions.loadPresets(PresetCollectionType.factory);
    }
}

const extractComponentPropsFromState: MapStateToProps<
        FactoryPresetTabStateProps, FactoryPresetTabProps, ApplicationDocument
    > = (state: ApplicationDocument, _: FactoryPresetTabProps): FactoryPresetTabStateProps => {
        return  { presets: state.factory };
};

const createActionObject: MapDispatchToPropsFunction<FactoryPresetTabActions, FactoryPresetTabProps> =
    (dispatch: Dispatch<ApplicationDocument>, _: FactoryPresetTabProps): FactoryPresetTabActions => {
        return {
            loadPresets: (source: PresetCollectionType): void  => {
                createLoadPresetsAction(dispatch, source);
            },
            selectPresets: (presets: Preset[], command: {selected?: boolean, expanded?: boolean}): void => {
                dispatch(createSelectPresetsAction(presets, command));
            },
            copyPresets: (presets: Preset[], target: PresetCollectionType): void => {
                dispatch(createCopyPresetsAction(presets, target));
            },
            editPreset: (preset: Preset, update: Partial<Preset>): void => {
                dispatch(createEditPresetAction(preset, update));
            },
            movePreset: (preset: Preset, displacement: number): void => {
                dispatch(createMovePresetAction(preset, displacement));
            }
        };
};

export default connect(extractComponentPropsFromState, createActionObject)(FactoryPresetTab);