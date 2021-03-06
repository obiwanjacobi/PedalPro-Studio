import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { Download } from "mdi-material-ui";

import { fulfillPromise } from "../../PromiseExtensions";
import { Preset } from "../preset/Preset";
import { ItemUI } from "../ItemUI";
import { SelectedView } from "../controls/SelectedView";
import { ChangedView } from "../controls/ChangedView";
import { FlexContainer } from "../controls/FlexContainer";
import { SelectAllButtonStatus } from "../controls/SelectAllButton";
import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { LoadPresets, dispatchLoadPresetsAction } from "../preset/LoadPresetsAction";
import { ChangePresets, createChangePresetsAction } from "../preset/ChangePresetsAction";
import { CopyPresets, createCopyPresetsAction } from "../preset/CopyPresetsAction";
import { EditPreset, createEditPresetAction } from "../preset/EditPresetAction";
import { MovePresets, createMovePresetsAction } from "../preset/MovePresetsAction";
import { SavePresets, dispatchSavePresetsAction } from "../preset/SavePresetsAction";
import { UpdateScreen, createUpdateScreenAction } from "../screen/UpdateScreenAction";
import { DeletePresets, createDeletePresetsAction } from "../preset/DeletePresetsAction";
import { EditEffects, createEditEffectsAction } from "../effects/EditEffectsAction";
import { ScreenState } from "../screen/ScreenState";
import { PresetToolbar } from "../preset/PresetToolbar";
import { PresetView } from "../preset/PresetView";
import DevicePastePage from "./DevicePastePage";
import { calcSelectAllStatus, getPresetsToSelect } from "../controls/SelectedChanged";
import DeviceMovePage from "./DeviceMovePage";
import { InteractiveOptions, Interactive, InteractiveIcon } from "../notification/Interactive";
import { SetInteractive, createSetInteractiveAction } from "../notification/SetInteractiveAction";

export interface DevicePresetTabProps { }
export interface DevicePresetTabStoreProps {
    presets: Preset[];
    hasClipboard: boolean;
    maxPresetCount: number;
    moveOpen: boolean;
    pasteOpen: boolean;
    downloadConfirmation?: InteractiveOptions;
}
export type DevicePresetTabActions =
    ChangePresets & EditEffects & SetInteractive &
    LoadPresets & SavePresets & CopyPresets & EditPreset & MovePresets & UpdateScreen & DeletePresets;
export type DevicePresetTabAllProps =
    DevicePresetTabProps & DevicePresetTabStoreProps & DevicePresetTabActions;
export interface DevicePresetTabState { }

export class DevicePresetTab extends React.Component<DevicePresetTabAllProps, DevicePresetTabState> {
    private selection: SelectedView<Preset>;
    private changes: ChangedView;

    public constructor(props: DevicePresetTabAllProps) {
        super(props);
        this.selection = new SelectedView(props.presets);
        this.changes = new ChangedView(props.presets);

        // bind event handlers
        this.onCopySelected = this.onCopySelected.bind(this);
        this.pasteClipboard = this.pasteClipboard.bind(this);
        this.onMoveSelected = this.onMoveSelected.bind(this);
        this.onDeleteSelected = this.onDeleteSelected.bind(this);
        this.download = this.download.bind(this);
        this.upload = this.upload.bind(this);
        this.toggleSelectAll = this.toggleSelectAll.bind(this);
        this.canMoveDown = this.canMoveDown.bind(this);
    }

    public render() {
        return (
            <FlexContainer vertical={true}>
                <PresetToolbar
                    enableCopy={this.selection.anySelected}
                    onCopy={this.onCopySelected}
                    enablePaste={this.props.hasClipboard}
                    onPaste={this.pasteClipboard}
                    enableMove={this.selection.anySelected}
                    onMove={this.onMoveSelected}
                    enableDelete={this.selection.anySelected}
                    onDelete={this.onDeleteSelected}
                    enableDownload={true}
                    onDownload={this.download}
                    enableSelectAll={!this.selection.isEmpty}
                    statusSelectAll={this.selectAllStatus}
                    onSelectAllChanged={this.toggleSelectAll}
                    uploadCount={this.changedCount}
                    onUpload={this.upload}
                />
                <PresetView
                    filterEmpty={true}
                    filterFlagged={true}
                    presets={this.props.presets}
                    editEffects={this.props.editEffects}
                    changePresets={this.actions.changePresets}
                    editPreset={this.actions.editPreset}
                    movePresets={this.actions.movePresets}
                    deletePresets={this.actions.deletePresets}
                    canMoveDown={this.canMoveDown}
                    empty={<Typography variant="body2">
                        Press <Download /> to retrieve the presets.
                    </Typography>}
                />
                {this.props.moveOpen && <DeviceMovePage />}
                {this.props.pasteOpen && <DevicePastePage />}
            </FlexContainer>
        );
    }

    public shouldComponentUpdate(nextProps: DevicePresetTabAllProps): boolean {
        return (this.props.presets !== nextProps.presets ||
            this.props.hasClipboard !== nextProps.hasClipboard ||
            this.props.pasteOpen !== nextProps.pasteOpen ||
            this.props.moveOpen !== nextProps.moveOpen ||
            this.props.downloadConfirmation !== nextProps.downloadConfirmation
        );
    }

    public componentWillReceiveProps(newProps: DevicePresetTabAllProps) {
        this.selection = new SelectedView(newProps.presets);
        this.changes = new ChangedView(newProps.presets);
        this.continueDownload(newProps);
    }

    protected get actions(): Readonly<DevicePresetTabActions> {
        return this.props;
    }

    private canMoveDown(preset: Preset): boolean {
        return preset.index < this.props.maxPresetCount;
    }

    private onCopySelected() {
        const selectedPresets = this.selection.selected;
        if (selectedPresets.length > 0) {
            this.actions.copyPresets(selectedPresets);
        }
    }

    private get selectAllStatus(): SelectAllButtonStatus {
        return calcSelectAllStatus(this.selection, this.changes);
    }

    private toggleSelectAll(status: SelectAllButtonStatus) {
        const presetsToSelect = getPresetsToSelect(this.changes, status);

        this.actions.changePresets(this.props.presets, PresetCollectionType.device, { selected: false });
        if (presetsToSelect.length) {
            this.actions.changePresets(presetsToSelect, PresetCollectionType.device, { selected: true });
        }
    }

    private pasteClipboard() {
        this.props.updateScreen({ pasteOpen: true });
    }

    private onMoveSelected() {
        this.props.updateScreen({ moveOpen: true });
    }

    private onDeleteSelected() {
        const selectedPresets = this.selection.selected;
        if (selectedPresets.length > 0) {
            this.actions.deletePresets(PresetCollectionType.device, selectedPresets);
        }
    }

    private download() {
        if (this.changes.anyChanged) {
            this.askConfirmation();
        } else {
            this.actions.loadPresets(PresetCollectionType.device);
        }
    }

    private continueDownload(props: DevicePresetTabStoreProps) {
        if (props.downloadConfirmation) {
            const action = props.downloadConfirmation;
            this.actions.setInteractive(undefined);

            if (action === InteractiveOptions.Ok) {
                this.actions.loadPresets(PresetCollectionType.device);
            }
        }
    }

    private askConfirmation() {
        const interactive: Interactive = {
            icon: InteractiveIcon.Question,
            caption: "Download Presets from Device",
            message: "There are unsaved changes. Are you sure you want to overwrite them?",
            buttons: InteractiveOptions.OkCancel
        };
        this.actions.setInteractive(interactive);
    }

    private upload() {
        const changedPresets = this.changes.changed;
        this.actions.savePresets(PresetCollectionType.device, changedPresets);
    }

    private get changedCount(): number {
        return this.changes.changed.length;
    }
}

const extractComponentPropsFromState = (state: ApplicationDocument): DevicePresetTabStoreProps => {
    const interactive = state.notification.interactive ? state.notification.interactive.action : undefined;

    return {
        presets: state.device,
        hasClipboard: state.clipboard.length > 0,
        maxPresetCount: state.deviceInfo ? state.deviceInfo.presetCount : 0,
        moveOpen: state.screen.moveOpen,
        pasteOpen: state.screen.pasteOpen,
        downloadConfirmation: interactive
    };
};

const createActionObject = (dispatch: Dispatch): DevicePresetTabActions => {
    return {
        loadPresets: (source: PresetCollectionType): void => {
            fulfillPromise(dispatchLoadPresetsAction(dispatch, source));
        },
        savePresets: (source: PresetCollectionType, presets: Preset[]): void => {
            fulfillPromise(dispatchSavePresetsAction(dispatch, source, presets));
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
        movePresets: (presets: Preset[], targetIndex: number): void => {
            dispatch(createMovePresetsAction(presets, targetIndex));
        },
        deletePresets: (source: PresetCollectionType, presets: Preset[]): void => {
            dispatch(createDeletePresetsAction(source, presets));
        },
        updateScreen: (state: Partial<ScreenState>): void => {
            dispatch(createUpdateScreenAction(state));
        },
        editEffects: (preset: Preset): void => {
            dispatch(createEditEffectsAction(preset));
        },
        setInteractive: (interactive?: Interactive): void => {
            dispatch(createSetInteractiveAction(interactive));
        }
    };
};

export default connect(extractComponentPropsFromState, createActionObject)(DevicePresetTab);