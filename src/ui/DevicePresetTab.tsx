import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { Typography } from "material-ui";
import { FileDownload } from "material-ui-icons";

import { Preset } from "../client/Preset";
import { SelectedView } from "../client/controls/SelectedView";
import { ChangedView } from "../client/controls/ChangedView";
import { ApplicationDocument, PresetCollectionType } from "../client/ApplicationDocument";
import { LoadPresets, createLoadPresetsAction } from "../client/LoadPresetsAction";
import { SelectPresets, createSelectPresetsAction } from "../client/SelectPresetsAction";
import { CopyPresets, createCopyPresetsAction } from "../client/CopyPresetsAction";
import { EditPreset, createEditPresetAction } from "../client/EditPresetAction";
import { MovePreset, createMovePresetAction } from "../client/MovePresetAction";
import { SavePresets, createSavePresetsAction } from "../client/SavePresetsAction";
import { PastePresets, createPastePresetsAction } from "../client/PastePresetsAction";

import { PresetToolbar } from "./PresetToolbar";
import { PresetView } from "./PresetView";
import { SelectAllButtonStatus } from "../client/controls/SelectAllButton";

export interface DevicePresetTabProps { }
export interface DevicePresetTabStateProps { 
    presets: Preset[];
    clipboard: Preset[];
}
export type DevicePresetTabActions = 
    SelectPresets & LoadPresets & SavePresets & CopyPresets & PastePresets & EditPreset & MovePreset;
export type DevicePresetTabAllProps = 
    DevicePresetTabProps & DevicePresetTabStateProps & DevicePresetTabActions;

const conatinerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
};

export class DevicePresetTab extends React.Component<DevicePresetTabAllProps> {
    private selection: SelectedView<Preset>;
    private changed: ChangedView;

    public constructor(props: DevicePresetTabAllProps) {
        super(props);
        this.selection = new SelectedView(props.presets);
        this.changed = new ChangedView(props.presets);

        // bind event handlers
        this.onCopySelected = this.onCopySelected.bind(this);
        this.pasteClipboard = this.pasteClipboard.bind(this);
        this.download = this.download.bind(this);
        this.upload = this.upload.bind(this);
        this.toggleSelectAll = this.toggleSelectAll.bind(this);
    }

    public render() {
        return (
            <div id="DevicePresetTab" style={conatinerStyles}>
                <PresetToolbar 
                    enableCopy={this.selection.anySelected}
                    onCopy={this.onCopySelected}
                    enablePaste={this.props.clipboard.length > 0}
                    onPaste={this.pasteClipboard}
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
                    selectPresets={this.actions.selectPresets}
                    editPreset={this.actions.editPreset}
                    movePreset={this.actions.movePreset}
                    empty={<Typography>
                        Press <FileDownload/> to retrieve the presets.
                    </Typography>}
                />
            </div>
        );
    }

    public shouldComponentUpdate(nextProps: DevicePresetTabAllProps, _: {}): boolean {
        return this.props.presets !== nextProps.presets ||
               this.props.clipboard !== nextProps.clipboard;
    }

    public componentWillReceiveProps(newProps: DevicePresetTabAllProps) {
        this.selection = new SelectedView(newProps.presets);
        this.changed = new ChangedView(newProps.presets);
    }

    protected get actions(): DevicePresetTabActions {
        return this.props;
    }

    private onCopySelected() {
        const selectedPresets = this.selection.selected;
        if (selectedPresets.length > 0) {
            this.actions.copyPresets(selectedPresets, PresetCollectionType.clipboard);
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

        this.actions.selectPresets(this.props.presets, {selected: false});
        if (selectPresets) {
            this.actions.selectPresets(presets, {selected: selectPresets});
        }
    }

    private pasteClipboard() {
        this.props.pastePresets(this.props.clipboard, PresetCollectionType.device);
    }

    private download() {
        this.actions.loadPresets(PresetCollectionType.device);
    }

    private upload() {
        const changedPresets = this.changed.changed;
        this.actions.savePresets(PresetCollectionType.device, changedPresets);
    }
}

const extractComponentPropsFromState: MapStateToProps<
        DevicePresetTabStateProps, DevicePresetTabProps, ApplicationDocument
    > = (state: ApplicationDocument, _: DevicePresetTabProps): DevicePresetTabStateProps => {
        return  { presets: state.device, clipboard: state.clipboard };
};

const createActionObject: MapDispatchToPropsFunction<DevicePresetTabActions, DevicePresetTabProps> =
    (dispatch: Dispatch<ApplicationDocument>, _: DevicePresetTabProps): DevicePresetTabActions => {
        return {
            loadPresets: (source: PresetCollectionType): void  => {
                createLoadPresetsAction(dispatch, source);
            },
            savePresets: (source: PresetCollectionType, presets: Preset[]): void  => {
                createSavePresetsAction(dispatch, source, presets);
            },
            selectPresets: (presets: Preset[], command: {selected?: boolean, expanded?: boolean}): void => {
                dispatch(createSelectPresetsAction(presets, command));
            },
            copyPresets: (presets: Preset[], target: PresetCollectionType): void => {
                dispatch(createCopyPresetsAction(presets, target));
            },
            pastePresets: (presets: Preset[], target: PresetCollectionType): void => {
                dispatch(createPastePresetsAction(presets, target));
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