import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { Typography } from "material-ui";
import { FileDownload } from "material-ui-icons";

import { SelectAllButtonStatus } from "../controls/SelectAllButton";
import { FlexContainer } from "../controls/FlexContainer";
import { PresetToolbar } from "./PresetToolbar";
import { ChangePresets, createChangePresetsAction } from "../ChangePresetsAction";
import { ChangeBanks, createChangeBanksAction } from "../ChangeBanksAction";
import { SavePresets, createSavePresetsAction } from "../SavePresetsAction";
import { CopyPresets, createCopyPresetsAction } from "../CopyPresetsAction";
import { MovePreset, createMovePresetAction } from "../MovePresetAction";
import { UpdateScreen, createUpdateScreenAction } from "../screen/UpdateScreenAction";
import { DeletePresets, createDeletePresetsAction } from "../DeletePresetsAction";
import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { StorageBank } from "../StorageBank";
import { Preset } from "../Preset";
import { ItemUI } from "../ItemUI";
import { ScreenState } from "../screen/ScreenState";
import { StorageBankList } from "./StorageBankList";
import { PresetView } from "./PresetView";
import { dispatchLoadBanksAction, LoadStorageBanks } from "../LoadBanksAction";
import { dispatchLoadBankPresetsAction, LoadBankPresets } from "../LoadBankPresetsAction";
import { SelectedView } from "../controls/SelectedView";
import { ChangedView } from "../controls/ChangedView";
import { calcSelectAllStatus, getPresetsToSelect } from "../controls/SelectedChanged";

export interface StoragePresetTabProps {}
export interface StoragePresetTabStoreProps {
    banks: StorageBank[];
    presets: Preset[];
    hasClipboard: boolean;
}
export interface StoragePresetTabState {}
export type StoragePresetTabActions = 
    ChangePresets & ChangeBanks & 
    LoadStorageBanks & LoadBankPresets &
    SavePresets & CopyPresets & MovePreset & UpdateScreen & DeletePresets;

export type StoragePresetTabAllProps = StoragePresetTabProps & StoragePresetTabStoreProps & StoragePresetTabActions;

export class StoragePresetTab extends React.Component<StoragePresetTabAllProps, StoragePresetTabState> {
    private selection: SelectedView;
    private changed: ChangedView;

    public constructor(props: StoragePresetTabAllProps) {
        super(props);
        this.selection = new SelectedView(props.presets);
        this.changed = new ChangedView(props.presets);

        this.download = this.download.bind(this);
        this.toggleSelectAll = this.toggleSelectAll.bind(this);
    }

    public shouldComponentUpdate(nextProps: StoragePresetTabAllProps, _: StoragePresetTabState): boolean {
        return (this.props.presets !== nextProps.presets ||
               this.props.banks !== nextProps.banks) ||
               this.props.hasClipboard !== nextProps.hasClipboard;
    }

    public componentWillReceiveProps(newProps: StoragePresetTabAllProps) {
        const activePresets = this.calcBankPresets(newProps.banks, newProps.presets);
        this.selection = new SelectedView(activePresets);
        this.changed = new ChangedView(activePresets);
    }

    public render() {
        return (
            <FlexContainer vertical={true}>
                <PresetToolbar 
                    enableCopy={this.selection.anySelected}
                    onCopy={this.onCopySelected}
                    enablePaste={this.props.hasClipboard}
                    onPaste={this.dummy}
                    enableDelete={this.selection.anySelected}
                    onDelete={this.dummy}
                    enableDownload={true}
                    onDownload={this.download}
                    enableSelectAll={!this.selection.isEmpty}
                    statusSelectAll={this.selectAllStatus}
                    onSelectAllChanged={this.toggleSelectAll}
                    enableUpload={this.changed.anyChanged}
                    onUpload={this.dummy}
                />
                <FlexContainer vertical={false}>
                    <FlexContainer vertical={true}>
                        <Typography style={{padding: 8}} variant="subheading">Banks</Typography>
                        <StorageBankList 
                            items={this.props.banks}
                            changeBanks={this.actions.changeBanks}
                            loadBankPresets={this.actions.loadBankPresets}
                        />
                    </FlexContainer>
                    <PresetView 
                        filterEmpty={false}
                        filterFlagged={true}
                        presets={this.bankPresets}
                        changePresets={this.actions.changePresets}
                        // editPreset={this.actions.editPreset}
                        movePreset={this.actions.movePreset}
                        deletePresets={this.actions.deletePresets}
                        empty={this.renderEmpty()}                
                    />
                </FlexContainer>
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
        return presets.filter(p => p.group && selectedBanks.findIndex(b => b.bank === p.group.name) !== -1);
    }

    private get selectAllStatus(): SelectAllButtonStatus {
        return calcSelectAllStatus(this.selection, this.changed);
    }

    private toggleSelectAll(status: SelectAllButtonStatus) {
        const presetsToSelect = getPresetsToSelect(this.changed, status);

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
    
    private download() {
        this.props.loadStorageBanks();
    }

    // tslint:disable-next-line:no-empty
    private dummy() {
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
        return  { banks: state.banks, presets: state.storage, hasClipboard: state.clipboard.length > 0 };
};

type ActionDispatchFunc = MapDispatchToPropsFunction<StoragePresetTabActions, StoragePresetTabProps>;
const createActionObject: ActionDispatchFunc =
    (dispatch: Dispatch<ApplicationDocument>, _: StoragePresetTabProps): StoragePresetTabActions => {
        return {
            loadStorageBanks: (): void  => {
                dispatchLoadBanksAction(dispatch);
            },
            loadBankPresets: (bank: string): void => {
                dispatchLoadBankPresetsAction(dispatch, bank);
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

export default connect(extractComponentPropsFromState, createActionObject)(StoragePresetTab);