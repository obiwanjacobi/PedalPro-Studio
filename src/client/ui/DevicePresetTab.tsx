import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { Typography } from "material-ui";
import { FileDownload } from "material-ui-icons";

import { Preset } from "../Preset";
import { ItemUI } from "../ItemUI";
import { SelectedView } from "../controls/SelectedView";
import { ChangedView } from "../controls/ChangedView";
import { FlexContainer } from "../controls/FlexContainer";
import { SelectAllButtonStatus } from "../controls/SelectAllButton";
import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { LoadPresets, dispatchLoadPresetsAction } from "../LoadPresetsAction";
import { ChangePresets, createChangePresetsAction } from "../ChangePresetsAction";
import { CopyPresets, createCopyPresetsAction } from "../CopyPresetsAction";
import { EditPreset, createEditPresetAction } from "../EditPresetAction";
import { MovePreset, createMovePresetAction } from "../MovePresetAction";
import { SavePresets, createSavePresetsAction } from "../SavePresetsAction";
import { UpdateScreen, createUpdateScreenAction } from "../screen/UpdateScreenAction";
import { DeletePresets, createDeletePresetsAction } from "../DeletePresetsAction";
import { ScreenState } from "../screen/ScreenState";
import { PresetToolbar } from "./PresetToolbar";
import { PresetView } from "./PresetView";
import PastePage from "./PastePage";
import { calcSelectAllStatus, getPresetsToSelect } from "../controls/SelectedChanged";

export interface DevicePresetTabProps { }
export interface DevicePresetTabStateProps { 
    presets: Preset[];
    hasClipboard: boolean;
}
export type DevicePresetTabActions = 
    ChangePresets & LoadPresets & SavePresets & CopyPresets & EditPreset & MovePreset & UpdateScreen & DeletePresets;
export type DevicePresetTabAllProps = 
    DevicePresetTabProps & DevicePresetTabStateProps & DevicePresetTabActions;
export interface DevicePresetTabState {}

export class DevicePresetTab extends React.Component<DevicePresetTabAllProps, DevicePresetTabState> {
    private selection: SelectedView;
    private changed: ChangedView;

    public constructor(props: DevicePresetTabAllProps) {
        super(props);
        this.selection = new SelectedView(props.presets);
        this.changed = new ChangedView(props.presets);

        // bind event handlers
        this.onCopySelected = this.onCopySelected.bind(this);
        this.pasteClipboard = this.pasteClipboard.bind(this);
        this.onDeleteSelected = this.onDeleteSelected.bind(this);
        this.download = this.download.bind(this);
        this.upload = this.upload.bind(this);
        this.toggleSelectAll = this.toggleSelectAll.bind(this);
    }

    public render() {
        return (
            <FlexContainer vertical={true}>
                <PresetToolbar 
                    enableCopy={this.selection.anySelected}
                    onCopy={this.onCopySelected}
                    enablePaste={this.props.hasClipboard}
                    onPaste={this.pasteClipboard}
                    enableDelete={this.selection.anySelected}
                    onDelete={this.onDeleteSelected}
                    enableDownload={true}
                    onDownload={this.download}
                    enableSelectAll={!this.selection.isEmpty}
                    statusSelectAll={this.selectAllStatus}
                    onSelectAllChanged={this.toggleSelectAll}
                    enableUpload={this.changed.anyChanged}
                    onUpload={this.upload}
                />
                <PresetView 
                    filterEmpty={true}
                    filterFlagged={true}
                    presets={this.props.presets}
                    changePresets={this.actions.changePresets}
                    editPreset={this.actions.editPreset}
                    movePreset={this.actions.movePreset}
                    deletePresets={this.actions.deletePresets}
                    empty={<Typography>
                        Press <FileDownload/> to retrieve the presets.
                    </Typography>}
                />
                <PastePage />
            </FlexContainer>
        );
    }

    public shouldComponentUpdate(nextProps: DevicePresetTabAllProps, _: DevicePresetTabState): boolean {
        return (this.props.presets !== nextProps.presets ||
               this.props.hasClipboard !== nextProps.hasClipboard);
    }

    public componentWillReceiveProps(newProps: DevicePresetTabAllProps) {
        this.selection = new SelectedView(newProps.presets);
        this.changed = new ChangedView(newProps.presets);
    }

    protected get actions(): Readonly<DevicePresetTabActions> {
        return this.props;
    }

    private onCopySelected() {
        const selectedPresets = this.selection.selected;
        if (selectedPresets.length > 0) {
            this.actions.copyPresets(selectedPresets);
        }
    }

    private get selectAllStatus(): SelectAllButtonStatus {
        return calcSelectAllStatus(this.selection, this.changed);
    }

    private toggleSelectAll(status: SelectAllButtonStatus) {
        const presetsToSelect = getPresetsToSelect(this.changed, status);
        
        this.actions.changePresets(this.props.presets, PresetCollectionType.device, {selected: false});
        if (presetsToSelect.length) {
            this.actions.changePresets(presetsToSelect, PresetCollectionType.device, {selected: true});
        }
    }

    private pasteClipboard() {
        this.props.updateScreen({pasteOpen: true});
    }

    private onDeleteSelected() {
        const selectedPresets = this.selection.selected;
        if (selectedPresets.length > 0) {
            this.actions.deletePresets(PresetCollectionType.device, selectedPresets);
        }
    }

    private download() {
        this.actions.loadPresets(PresetCollectionType.device);
    }

    private upload() {
        const changedPresets = this.changed.changed;
        this.actions.savePresets(PresetCollectionType.device, changedPresets);
    }
}

type ExtractStatePropFunc = MapStateToProps<DevicePresetTabStateProps, DevicePresetTabProps, ApplicationDocument>;
const extractComponentPropsFromState: ExtractStatePropFunc = (
    state: ApplicationDocument, _: DevicePresetTabProps): DevicePresetTabStateProps => {
        return  { presets: state.device, hasClipboard: state.clipboard.length > 0 };
};

type ActionDispatchFunc = MapDispatchToPropsFunction<DevicePresetTabActions, DevicePresetTabProps>;
const createActionObject: ActionDispatchFunc =
    (dispatch: Dispatch<ApplicationDocument>, _: DevicePresetTabProps): DevicePresetTabActions => {
        return {
            loadPresets: (source: PresetCollectionType): void  => {
                dispatchLoadPresetsAction(dispatch, source);
            },
            savePresets: (source: PresetCollectionType, presets: Preset[]): void  => {
                createSavePresetsAction(dispatch, source, presets);
            },
            changePresets: (presets: Preset[], source: PresetCollectionType, ui: Partial<ItemUI>): void => {
                dispatch(createChangePresetsAction(presets, source, ui));
            },
            copyPresets: (presets: Preset[]): void => {
                dispatch(createCopyPresetsAction(presets));
            },
            editPreset: (preset: Preset, update: Partial<Preset>): void => {
                dispatch(createEditPresetAction(preset, update));
            },
            movePreset: (preset: Preset, displacement: number): void => {
                dispatch(createMovePresetAction(preset, displacement));
            },
            deletePresets: (source: PresetCollectionType, presets: Preset[]): void  => {
                dispatch(createDeletePresetsAction(source, presets));
            },
            updateScreen: (state: ScreenState): void => {
                dispatch(createUpdateScreenAction(state));
            }
        };
};

export default connect(extractComponentPropsFromState, createActionObject)(DevicePresetTab);