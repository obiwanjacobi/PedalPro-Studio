import * as React from "react";
import { connect, Dispatch, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { Typography } from "@material-ui/core";
import { FileDownload } from "@material-ui/icons";

import { SelectAllButtonStatus } from "../controls/SelectAllButton";
import { FlexContainer } from "../controls/FlexContainer";
import { PresetToolbar } from "../ui/PresetToolbar";
import { PresetView } from "../ui/PresetView";
import { ChangePresets, createChangePresetsAction } from "../ChangePresetsAction";
import { ChangeBanks, createChangeBanksAction } from "./ChangeBanksAction";
import { SavePresets, createSavePresetsAction } from "../SavePresetsAction";
import { CopyPresets, createCopyPresetsAction } from "../CopyPresetsAction";
import { EditPreset, createEditPresetAction } from "../EditPresetAction";
import { MovePresets, createMovePresetsAction } from "../MovePresetsAction";
import { UpdateScreen, createUpdateScreenAction } from "../screen/UpdateScreenAction";
import { DeletePresets, createDeletePresetsAction } from "../DeletePresetsAction";
import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { SelectedView } from "../controls/SelectedView";
import { ChangedView } from "../controls/ChangedView";
import { calcSelectAllStatus, getPresetsToSelect } from "../controls/SelectedChanged";
import { ScreenState } from "../screen/ScreenState";
import { Preset } from "../Preset";
import { ItemUI } from "../ItemUI";
import { StorageBank } from "./StorageBank";
import { dispatchLoadBanksAction, LoadStorageBanks } from "./LoadBanksAction";
import { dispatchLoadBankPresetsAction, LoadBankPresets } from "./LoadBankPresetsAction";
import { StorageBankView } from "./StorageBankView";
import { createAddBankAction, AddBank } from "./AddBankAction";
import StoragePastePage from "./StoragePastePage";

export interface StoragePresetTabProps {}
export interface StoragePresetTabStoreProps {
    banks: StorageBank[];
    presets: Preset[];
    hasClipboard: boolean;
    maxPresetCount: number;
}
export interface StoragePresetTabState {}
export type StoragePresetTabActions = 
    ChangePresets & ChangeBanks & AddBank &
    LoadStorageBanks & LoadBankPresets &
    SavePresets & CopyPresets & EditPreset & MovePresets & UpdateScreen & DeletePresets;

export type StoragePresetTabAllProps = StoragePresetTabProps & StoragePresetTabStoreProps & StoragePresetTabActions;

export class StoragePresetTab extends React.Component<StoragePresetTabAllProps, StoragePresetTabState> {
    private selection: SelectedView;
    private changes: ChangedView;

    public constructor(props: StoragePresetTabAllProps) {
        super(props);
        this.selection = new SelectedView(props.presets);
        this.changes = new ChangedView(props.presets);

        this.download = this.download.bind(this);
        this.upload = this.upload.bind(this);
        this.onCopySelected = this.onCopySelected.bind(this);
        this.pastePresets = this.pastePresets.bind(this);
        this.toggleSelectAll = this.toggleSelectAll.bind(this);
        this.deleteSelectedPresets = this.deleteSelectedPresets.bind(this);
    }

    public shouldComponentUpdate(nextProps: StoragePresetTabAllProps, _: StoragePresetTabState): boolean {
        return (this.props.presets !== nextProps.presets ||
               this.props.banks !== nextProps.banks) ||
               this.props.hasClipboard !== nextProps.hasClipboard;
    }

    public componentWillReceiveProps(newProps: StoragePresetTabAllProps) {
        const activePresets = this.calcBankPresets(newProps.banks, newProps.presets);
        this.selection = new SelectedView(activePresets);
        this.changes = new ChangedView(activePresets);
    }

    public render() {
        return (
            <FlexContainer vertical={true}>
                <PresetToolbar 
                    enableCopy={this.selection.anySelected}
                    onCopy={this.onCopySelected}
                    enablePaste={this.props.hasClipboard}
                    onPaste={this.pastePresets}
                    enableDelete={this.selection.anySelected}
                    onDelete={this.deleteSelectedPresets}
                    enableDownload={true}
                    onDownload={this.download}
                    enableSelectAll={!this.selection.isEmpty}
                    statusSelectAll={this.selectAllStatus}
                    onSelectAllChanged={this.toggleSelectAll}
                    enableUpload={this.changes.anyChanged}
                    onUpload={this.upload}
                />
                <FlexContainer vertical={false}>
                    <StorageBankView
                        banks={this.props.banks}
                        addBank={this.actions.addBank}
                        changeBanks={this.actions.changeBanks}
                        loadBankPresets={this.actions.loadBankPresets}
                    />
                    <PresetView 
                        filterEmpty={false}
                        filterFlagged={true}
                        presets={this.bankPresets}
                        changePresets={this.actions.changePresets}
                        editPreset={this.actions.editPreset}
                        movePresets={this.actions.movePresets}
                        deletePresets={this.actions.deletePresets}
                        maxPresetCount={this.props.maxPresetCount}
                        empty={this.renderEmpty()}                
                    />
                </FlexContainer>
                <StoragePastePage />
            </FlexContainer>
        );
    }

    protected get actions(): Readonly<StoragePresetTabActions> {
        return this.props;
    }

    private get bankPresets(): Preset[] {
        return this.calcBankPresets(this.props.banks, this.props.presets);
    }

    private calcBankPresets(banks: StorageBank[], presets: Preset[]): Preset[] {
        const selectedBanks = banks.filter(b => b.ui.selected);
        // @ts-ignore: goup may not be set
        return presets.filter(p => p.group && selectedBanks.findIndex(b => b.name === p.group.name) !== -1);
    }

    private get selectAllStatus(): SelectAllButtonStatus {
        return calcSelectAllStatus(this.selection, this.changes);
    }

    private toggleSelectAll(status: SelectAllButtonStatus) {
        const presetsToSelect = getPresetsToSelect(this.changes, status);

        this.actions.changePresets(this.bankPresets, PresetCollectionType.storage, {selected: false});
        if (presetsToSelect.length) {
            this.actions.changePresets(presetsToSelect, PresetCollectionType.storage, {selected: true});
        }
    }

    private onCopySelected() {
        const selectedPresets = this.selection.selected;
        if (selectedPresets.length > 0) {
            this.actions.copyPresets(selectedPresets);
        }
    }
    
    private deleteSelectedPresets() {
        this.actions.deletePresets(PresetCollectionType.storage, this.selection.selected);
    }

    private download() {
        const changed = new ChangedView(this.props.presets);
        if (changed.anyChanged) {
            // prompt for confirmation losing changes
        }
        this.props.loadStorageBanks();
    }

    // tslint:disable-next-line:no-empty
    private upload() {
        this.actions.savePresets(PresetCollectionType.storage, this.changes.changed);
    }

    // tslint:disable-next-line:no-empty
    private pastePresets() {
        this.props.updateScreen({pasteOpen: true});
    }

    private renderEmpty(): React.ReactNode {
        if (this.props.banks.length > 0) {
            return (
                <Typography>
                    Select a bank (left) to see its presets.
                </Typography>
            );
        } else {
            return (
                <Typography>
                    Press <FileDownload/> to retrieve the preset banks.
                </Typography>
            );
        }
    }
}

type ExtractStatePropFunc = MapStateToProps<StoragePresetTabStoreProps, StoragePresetTabProps, ApplicationDocument>;
const extractComponentPropsFromState: ExtractStatePropFunc = (
    state: ApplicationDocument, _: StoragePresetTabProps): StoragePresetTabStoreProps => {
        return  { 
            banks: state.banks, 
            presets: state.storage, 
            hasClipboard: state.clipboard.length > 0,
            maxPresetCount: state.deviceInfo ? state.deviceInfo.presetCount : 0
        };
};

type ActionDispatchFunc = MapDispatchToPropsFunction<StoragePresetTabActions, StoragePresetTabProps>;
const createActionObject: ActionDispatchFunc =
    (dispatch: Dispatch, _: StoragePresetTabProps): StoragePresetTabActions => {
        return {
            loadStorageBanks: (): void  => {
                dispatchLoadBanksAction(dispatch);
            },
            loadBankPresets: (bank: string): void => {
                dispatchLoadBankPresetsAction(dispatch, bank);
            },
            addBank: (): void => {
                dispatch(createAddBankAction());
            },
            savePresets: (source: PresetCollectionType, presets: Preset[]): void  => {
                createSavePresetsAction(dispatch, source, presets);
            },
            changePresets: (presets: Preset[], source: PresetCollectionType, ui: Partial<ItemUI>): void => {
                dispatch(createChangePresetsAction(presets, source, ui));
            },
            changeBanks: (banks: StorageBank[], ui: Partial<ItemUI>): void => {
                dispatch(createChangeBanksAction(banks, ui));
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
            deletePresets: (source: PresetCollectionType, presets: Preset[]): void  => {
                dispatch(createDeletePresetsAction(source, presets));
            },
            updateScreen: (state: Partial<ScreenState>): void => {
                dispatch(createUpdateScreenAction(state));
            }
        };
};

export default connect(extractComponentPropsFromState, createActionObject)(StoragePresetTab);