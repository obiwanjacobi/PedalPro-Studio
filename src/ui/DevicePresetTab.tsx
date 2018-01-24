import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";

import Preset from "../client/Preset";
import { SelectedView } from "../client/SelectedView";
import ApplicationDocument, { PresetCollectionType } from "../client/ApplicationDocument";
import { LoadPresets, createLoadPresetsAction } from "../client/LoadPresetsAction";
import { SelectPresets, createSelectPresetsAction } from "../client/SelectPresetsAction";
import { CopyPresets, createCopyPresetsAction } from "../client/CopyPresetsAction";
import { EditPreset, createEditPresetAction } from "../client/EditPresetAction";
import { MovePreset, createMovePresetAction } from "../client/MovePresetAction";

import { PresetToolbar } from "./PresetToolbar";
import { PresetView } from "./PresetView";

export interface DevicePresetTabProps { }
export interface DevicePresetTabStateProps { 
    presets: Preset[];
}
export type DevicePresetTabActions = SelectPresets & LoadPresets & CopyPresets & EditPreset & MovePreset;
export type DevicePresetTabAllProps = 
    DevicePresetTabProps & DevicePresetTabStateProps & DevicePresetTabActions;

export class DevicePresetTab extends React.PureComponent<DevicePresetTabAllProps> {
    private selection: SelectedView<Preset>;

    public constructor(props: DevicePresetTabAllProps) {
        super(props);
        this.selection = new SelectedView(props.presets);
        // bind event handlers
        this.onCopySelected = this.onCopySelected.bind(this);
        this.download = this.download.bind(this);
        this.toggleSelectAll = this.toggleSelectAll.bind(this);
    }

    public render() {
        return (
            <div>
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

    public shouldComponentUpdate(nextProps: DevicePresetTabAllProps, _: {}): boolean {
        return this.props.presets !== nextProps.presets;
    }

    public componentWillReceiveProps(newProps: DevicePresetTabAllProps) {
        this.selection = new SelectedView(newProps.presets);
    }

    protected get actions(): DevicePresetTabActions {
        return this.props;
    }

    private onCopySelected() {
        const selectedPresets = this.selection.selected;
        if (selectedPresets.length > 0) {
            this.actions.copyPresets(selectedPresets, PresetCollectionType.storage);
        }
    }

    private toggleSelectAll() {
        this.actions.selectPresets(this.props.presets, !this.selection.allSelected);
    }

    private download() {
        this.actions.loadPresets(PresetCollectionType.device);
    }
}

const extractComponentPropsFromState: MapStateToProps<
        DevicePresetTabStateProps, DevicePresetTabProps, ApplicationDocument
    > = (state: ApplicationDocument, _: DevicePresetTabProps): DevicePresetTabStateProps => {
        return  { presets: state.device };
};

const createActionObject: MapDispatchToPropsFunction<DevicePresetTabActions, DevicePresetTabProps> =
    (dispatch: Dispatch<ApplicationDocument>, _: DevicePresetTabProps): DevicePresetTabActions => {
        return {
            loadPresets: (source: PresetCollectionType)  => {
                return createLoadPresetsAction(dispatch, source);
            },
            selectPresets: (presets: Preset[], selected: boolean): void => {
                dispatch(createSelectPresetsAction(presets, selected));
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

export default connect(extractComponentPropsFromState, createActionObject)(DevicePresetTab);