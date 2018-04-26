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

export interface DevicePresetTabProps { }
export interface DevicePresetTabStateProps { 
    presets: Preset[];
    clipboard: Preset[];
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
                    enablePaste={this.props.clipboard.length > 0}
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
                    presets={this.props.presets}
                    readonly={false}
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
               this.props.clipboard !== nextProps.clipboard);
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
        const changed = this.changed.toValue();
        const selected = this.selection.toValue();

        if (changed === SelectAllButtonStatus.NoneSelected &&
            selected === SelectAllButtonStatus.NoneSelected) {
            return SelectAllButtonStatus.NoneSelected;
        }

        if (this.changed.changed.length === this.selection.selected.length) {
            for (let i = 0; i < this.changed.changed.length; i++) {
                if (this.changed.changed[i] !== this.selection.selected[i]) {
                    return SelectAllButtonStatus.SomeSelected;
                }
            }

            return SelectAllButtonStatus.AllChanged;
        }

        if (selected === SelectAllButtonStatus.AllSelected) {
            return SelectAllButtonStatus.AllSelected;
        }
        
        if (selected === SelectAllButtonStatus.SomeSelected) {
            return SelectAllButtonStatus.SomeSelected;
        }

        return SelectAllButtonStatus.NoneSelected;
    }

    private toggleSelectAll(status: SelectAllButtonStatus) {
        let presets = this.props.presets;
        let selectPresets = false;

        switch (status) {
            case SelectAllButtonStatus.AllChanged:
                selectPresets = true;
                if (this.changed.anyChanged) {
                    presets = this.changed.changed;
                }   // else fall back to select-all
                break;
            case SelectAllButtonStatus.AllSelected:
                selectPresets = true;
                break;
            default:
                break;
        }

        // TODO: make this one call
        this.actions.changePresets(this.props.presets, PresetCollectionType.device, {selected: false});
        if (selectPresets) {
            this.actions.changePresets(presets, PresetCollectionType.device, {selected: selectPresets});
        }
    }

    private pasteClipboard() {
        this.props.updateScreen(new ScreenState(undefined, true));
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
        return  { presets: state.device, clipboard: state.clipboard };
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