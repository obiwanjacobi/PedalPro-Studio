import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { Download } from "mdi-material-ui";

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
import { EditEffects, createEditEffectsAction } from "../effects/EditEffectsAction";
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
import { Interactive, InteractiveOptions, InteractiveIcon } from "../notification/Interactive";
import { SetInteractive, createSetInteractiveAction } from "../notification/SetInteractiveAction";

export interface StoragePresetTabProps { }
export interface StoragePresetTabStoreProps {
    banks?: StorageBank[];
    presets: Preset[];
    hasClipboard: boolean;
    pasteOpen: boolean;
    downloadConfirmation?: InteractiveOptions;
}
export interface StoragePresetTabState { }
export type StoragePresetTabActions =
    EditEffects & SetInteractive &
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
            this.props.pasteOpen !== nextProps.pasteOpen ||
            this.props.downloadConfirmation !== nextProps.downloadConfirmation;
    }

    public componentWillReceiveProps(newProps: StoragePresetTabAllProps) {
        const banks = newProps.banks || [];
        const activePresets = this.calcBankPresets(banks, newProps.presets);
        this.selection = new SelectedView(activePresets);
        this.changes = new ChangedView(activePresets);
        this.bankSelection = new SelectedView(banks);
        this.continueDownload(newProps);
    }

    public componentWillMount() {
        if (!this.props.banks || this.props.banks.length === 0) {
            this.download();
        }
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
                        editEffects={this.props.editEffects}
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

        this.actions.changePresets(this.bankPresets, PresetCollectionType.storage, { selected: false });
        if (presetsToSelect.length) {
            this.actions.changePresets(presetsToSelect, PresetCollectionType.storage, { selected: true });
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
        if (this.changes.anyChanged) {
            this.askConfirmation();
        } else {
            this.props.loadStorageBanks();
        }
    }

    private continueDownload(props: StoragePresetTabStoreProps) {
        if (props.downloadConfirmation) {
            const action = props.downloadConfirmation;
            this.actions.setInteractive(undefined);

            if (action === InteractiveOptions.Ok) {
                this.props.loadStorageBanks();
            }
        }
    }

    private askConfirmation() {
        const interactive: Interactive = {
            icon: InteractiveIcon.Question,
            caption: "Download Presets from Storage",
            message: "There are unsaved changes. Are you sure you want to overwrite them?",
            buttons: InteractiveOptions.OkCancel
        };
        this.actions.setInteractive(interactive);
    }

    private uploadCount(): number {
        const banksChanged = this.bankSelection.selected.filter(bankHasChanged);
        return banksChanged.length + this.changes.changed.length;
    }

    private upload() {
        this.actions.saveStoragePresets(this.banks.filter(b => b.ui.selected), this.changes.changed);
    }

    private pastePresets() {
        this.props.updateScreen({ pasteOpen: true });
    }

    private renderEmpty(): React.ReactNode {
        if (this.banks.length > 0) {
            return (
                <Typography variant="body2">
                    Select a bank (left) to see its presets.
                </Typography>
            );
        } else {
            return (
                <Typography variant="body2">
                    Press <Download /> to retrieve the preset banks.
                </Typography>
            );
        }
    }

    private get banks(): StorageBank[] {
        return this.props.banks || [];
    }
}

const extractComponentPropsFromState = (state: ApplicationDocument): StoragePresetTabStoreProps => {

    const interactive = state.notification.interactive ? state.notification.interactive.action : undefined;
    return {
        banks: state.banks,
        presets: state.storage,
        hasClipboard: state.clipboard.length > 0,
        pasteOpen: state.screen.pasteOpen,
        downloadConfirmation: interactive
    };
};

const createActionObject = (dispatch: Dispatch): StoragePresetTabActions => {
    return {
        loadStorageBanks: (): void => {
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
        saveStoragePresets: (banks: StorageBank[], presets: Preset[]): void => {
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
        deleteStoragePresets: (presets: Preset[]): void => {
            dispatch(createDeleteStoragePresetsAction(presets));
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

export default connect(extractComponentPropsFromState, createActionObject)(StoragePresetTab);