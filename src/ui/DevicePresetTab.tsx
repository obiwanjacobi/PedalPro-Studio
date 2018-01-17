import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";

import Preset from "../client/Preset";
import ApplicationDocument, { PresetCollectionType } from "../client/ApplicationDocument";
import { LoadPresets, createLoadPresetsAction } from "../client/LoadPresetsAction";
import { SelectPresets, createSelectPresetsAction } from "../client/SelectPresetsAction";
import { CopyPresets, createCopyPresetsAction } from "../client/CopyPresetsAction";
import { EditPreset, createEditPresetAction } from "../client/EditPresetAction";
import { SelectedView } from "../client/SelectedView";

import { PresetToolbar } from "./PresetToolbar";
import { PresetView } from "./PresetView";

export interface DevicePresetTabProps { }
export interface DevicePresetTabStateProps { 
    presets: Preset[];
}
export type DevicePresetTabActions = SelectPresets & LoadPresets & CopyPresets & EditPreset;
export type DevicePresetTabAllProps = 
    DevicePresetTabProps & DevicePresetTabStateProps & DevicePresetTabActions;

export class DevicePresetTab extends React.Component<DevicePresetTabAllProps> {
    private selection: SelectedView<Preset>;

    public constructor(props: DevicePresetTabAllProps) {
        super(props);
        this.selection = new SelectedView(props.presets);
    }

    public render() {
        return (
            <div>
                <PresetToolbar 
                    enableCopy={this.selection.anySelected}
                    onCopy={() => this.onCopySelected()}
                    enableDownload={true}
                    onDownload={() => this.download()}
                    enableUpload={!this.selection.isEmpty}
                    enableSelectAll={!this.selection.isEmpty}
                    valueSelectAll={this.selection.toValue()}
                    onSelectAll={() => this.toggleSelectAll()}
                />
                <PresetView 
                    presets={this.props.presets}
                    selectPresets={this.actions.selectPresets}
                    editPreset={this.actions.editPreset}
                />
            </div>
        );
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
    > = (state: ApplicationDocument, props: DevicePresetTabProps): DevicePresetTabStateProps => {
        return  { 
            presets: state.device
        };
};

const createActionObject: MapDispatchToPropsFunction<DevicePresetTabActions, DevicePresetTabProps> =
    (dispatch: Dispatch<ApplicationDocument>, props: DevicePresetTabProps): DevicePresetTabActions => {
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
            }
        };
};

export default connect(extractComponentPropsFromState, createActionObject)(DevicePresetTab);