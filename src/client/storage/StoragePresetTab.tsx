import * as React from "react";
import { connect, Dispatch, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { Typography } from "@material-ui/core";
import { FileDownload } from "@material-ui/icons";

import { fulfillPromise } from "../../PromiseExtensions";
import { SelectAllButtonStatus } from "../controls/SelectAllButton";
import { FlexContainer } from "../controls/FlexContainer";
import { PresetToolbar } from "../preset/PresetToolbar";
import { PresetView } from "../preset/PresetView";
import { ChangePresets, createChangePresetsAction } from "../preset/ChangePresetsAction";
import { CopyPresets, createCopyPresetsAction } from "../preset/CopyPresetsAction";
import { EditPreset, createEditPresetAction } from "../preset/EditPresetAction";
import { MovePresets, createMovePresetsAction } from "../preset/MovePresetsAction";
import { UpdateScreen, createUpdateScreenAction } from "../screen/UpdateScreenAction";
import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { SelectedView } from "../controls/SelectedView";
import { ChangedView } from "../controls/ChangedView";
import { calcSelectAllStatus, getPresetsToSelect } from "../controls/SelectedChanged";
import { ScreenState } from "../screen/ScreenState";
import { Preset } from "../preset/Preset";
import { maxPresetIndex } from "../preset/PresetOperations";
import { ItemUI } from "../ItemUI";

import { StorageBank } from "./StorageBank";
import { ChangeStorageBanks, createChangeStorageBanksAction } from "./ChangeStorageBanksAction";
import { dispatchLoadStorageBanksAction, LoadStorageBanks } from "./LoadStorageBanksAction";
import { dispatchLoadStorageBankPresetsAction, LoadStorageBankPresets } from "./LoadStorageBankPresetsAction";
import { StorageBankView } from "./StorageBankView";
import { createAddStorageBankAction, AddStorageBank } from "./AddStorageBankAction";
import StoragePastePage from "./StoragePastePage";
import { createRenameStorageBankAction, RenameStorageBank } from "./RenameStorageBankAction";
import { SaveStoragePresets, dispatchSaveStoragePresetsAction } from "./SaveStoragePresetsAction";
import { DeleteStoragePresets, createDeleteStoragePresetsAction } from "./DeleteStoragePresetsAction";
import { storagePresetsForBank, bankHasChanged } from "./BankOperations";

export interface StoragePresetTabProps {}
export interface StoragePresetTabStoreProps {
    banks?: StorageBank[];
    presets: Preset[];
    hasClipboard: boolean;
    pasteOpen: boolean;
}
export interface StoragePresetTabState {}
export type StoragePresetTabActions = 
    ChangePresets & ChangeStorageBanks & AddStorageBank & RenameStorageBank &
    LoadStorageBanks & LoadStorageBankPresets & SaveStoragePresets & 
    CopyPresets & EditPreset & MovePresets & UpdateScreen & DeleteStoragePresets;

export type StoragePresetTabAllProps = StoragePresetTabProps & StoragePresetTabStoreProps & StoragePresetTabActions;

export class StoragePresetTab extends React.Component<StoragePresetTabAllProps, StoragePresetTabState> {
    private selection: SelectedView<Preset>;
    private changes: ChangedView;
    private bankSelection: SelectedView<StorageBank>;

    public constructor(props: StoragePresetTabAllProps) {
        super(props);
        this.selection = new SelectedView(props.presets);
        this.changes = new ChangedView(props.presets);
        this.bankSelection = new SelectedView(props.banks || []);

        this.download = this.download.bind(this);
        this.upload = this.upload.bind(this);
        this.onCopySelected = this.onCopySelected.bind(this);
        this.pastePresets = this.pastePresets.bind(this);
        this.toggleSelectAll = this.toggleSelectAll.bind(this);
        this.deletePresets = this.deletePresets.bind(this);
        this.deleteSelectedPresets = this.deleteSelectedPresets.bind(this);
        this.deleteStorageBank = this.deleteStorageBank.bind(this);
        this.canMoveDown = this.canMoveDown.bind(this);
    }

    public shouldComponentUpdate(nextProps: StoragePresetTabAllProps, _: StoragePresetTabState): boolean {
        return (this.props.presets !== nextProps.presets ||
               this.props.banks !== nextProps.banks) ||
               this.props.hasClipboard !== nextProps.hasClipboard ||
               this.props.pasteOpen !== nextProps.pasteOpen;
    }

    public componentWillReceiveProps(newProps: StoragePresetTabAllProps) {
        const banks = newProps.banks || [];
        const activePresets = this.calcBankPresets(banks, newProps.presets);
        this.selection = new SelectedView(activePresets);
        this.changes = new ChangedView(activePresets);
        this.bankSelection = new SelectedView(banks);
    }

    public componentWillMount() {
        this.download();
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
                    uploadCount={this.uploadCount()}
                    onUpload={this.upload}
                />
                <FlexContainer vertical={false}>
                    <StorageBankView
                        banks={this.props.banks}
                        presets={this.props.presets}
                        addStorageBank={this.actions.addStorageBank}
                        changeStorageBanks={this.actions.changeStorageBanks}
                        loadStorageBankPresets={this.actions.loadStorageBankPresets}
                        renameStorageBank={this.actions.renameStorageBank}
                        deleteStorageBank={this.deleteStorageBank}
                    />
                    <PresetView 
                        filterEmpty={false}
                        filterFlagged={true}
                        presets={this.bankPresets}
                        changePresets={this.actions.changePresets}
                        editPreset={this.actions.editPreset}
                        movePresets={this.actions.movePresets}
                        deletePresets={this.deletePresets}
                        canMoveDown={this.canMoveDown}
                        empty={this.renderEmpty()}                
                    />
                </FlexContainer>
                {this.props.pasteOpen && <StoragePastePage />}
            </FlexContainer>
        );
    }

    protected get actions(): Readonly<StoragePresetTabActions> {
        return this.props;
    }

    private canMoveDown(preset: Preset): boolean {
        if (preset.group) {
            const bankPresets = storagePresetsForBank(this.props.presets, preset.group.name);
            const maxIndex = maxPresetIndex(bankPresets);
            return preset.index < maxIndex;
        }
        return false;
    }

    private get bankPresets(): Preset[] {
        return this.calcBankPresets(this.banks, this.props.presets);
    }

    private calcBankPresets(banks: StorageBank[], presets: Preset[]): Preset[] {
        const selectedBanks = banks.filter(b => b.ui.selected);
        // @ts-ignore: group may not be set
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
    
    private deleteStorageBank(bank: StorageBank) {
        this.actions.changeStorageBanks([bank], { markedDeleted: true });
    }

    private deleteSelectedPresets() {
        this.actions.deleteStoragePresets(this.selection.selected);
    }

    private deletePresets(source: PresetCollectionType, presets: Preset[]) {
        if (source === PresetCollectionType.storage) {
            this.actions.deleteStoragePresets(presets);
        }
    }

    private download() {
        // TODO: prompt for confirmation losing changes
        this.props.loadStorageBanks();
    }

    private uploadCount(): number {
        const banksChanged = this.bankSelection.selected.filter(bankHasChanged);
        return banksChanged.length + this.changes.changed.length;
    }

    private upload() {
        this.actions.saveStoragePresets(this.banks.filter(b => b.ui.selected), this.changes.changed);
    }

    private pastePresets() {
        this.props.updateScreen({pasteOpen: true});
    }

    private renderEmpty(): React.ReactNode {
        if (this.banks.length > 0) {
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

    private get banks(): StorageBank[] {
        return this.props.banks || [];
    }
}

type ExtractStatePropFunc = MapStateToProps<StoragePresetTabStoreProps, StoragePresetTabProps, ApplicationDocument>;
const extractComponentPropsFromState: ExtractStatePropFunc = (
    state: ApplicationDocument, _: StoragePresetTabProps): StoragePresetTabStoreProps => {
        return  { 
            banks: state.banks, 
            presets: state.storage, 
            hasClipboard: state.clipboard.length > 0,
            pasteOpen: state.screen.pasteOpen
        };
};

type ActionDispatchFunc = MapDispatchToPropsFunction<StoragePresetTabActions, StoragePresetTabProps>;
const createActionObject: ActionDispatchFunc =
    (dispatch: Dispatch, _: StoragePresetTabProps): StoragePresetTabActions => {
        return {
            loadStorageBanks: (): void  => {
                fulfillPromise(dispatchLoadStorageBanksAction(dispatch));
            },
            loadStorageBankPresets: (bank: string): void => {
                fulfillPromise(dispatchLoadStorageBankPresetsAction(dispatch, bank));
            },
            addStorageBank: (): void => {
                dispatch(createAddStorageBankAction());
            },
            renameStorageBank: (bank: StorageBank, newName: string) => {
                dispatch(createRenameStorageBankAction(bank, newName));
            },
            saveStoragePresets: (banks: StorageBank[], presets: Preset[]): void  => {
                fulfillPromise(dispatchSaveStoragePresetsAction(dispatch, banks, presets));
            },
            changePresets: (presets: Preset[], source: PresetCollectionType, ui: Partial<ItemUI>): void => {
                dispatch(createChangePresetsAction(presets, source, ui));
            },
            changeStorageBanks: (banks: StorageBank[], ui: Partial<ItemUI>): void => {
                dispatch(createChangeStorageBanksAction(banks, ui));
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
            deleteStoragePresets: (presets: Preset[]): void  => {
                dispatch(createDeleteStoragePresetsAction(presets));
            },
            updateScreen: (state: Partial<ScreenState>): void => {
                dispatch(createUpdateScreenAction(state));
            }
        };
};

export default connect(extractComponentPropsFromState, createActionObject)(StoragePresetTab);