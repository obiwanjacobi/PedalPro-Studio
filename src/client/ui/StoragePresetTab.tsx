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

export interface StoragePresetTabProps {}
export interface StoragePresetTabStoreProps {
    banks: StorageBank[];
    presets: Preset[];    
}
export interface StoragePresetTabState {}
export type StoragePresetTabActions = 
    ChangePresets & ChangeBanks & 
    LoadStorageBanks & LoadBankPresets &
    SavePresets & CopyPresets & MovePreset & UpdateScreen & DeletePresets;

export type StoragePresetTabAllProps = StoragePresetTabProps & StoragePresetTabStoreProps & StoragePresetTabActions;

export class StoragePresetTab extends React.Component<StoragePresetTabAllProps, StoragePresetTabState> {
    public constructor(props: StoragePresetTabAllProps) {
        super(props);
        this.download = this.download.bind(this);
    }

    public render() {
        return (
            <FlexContainer vertical={true}>
                <PresetToolbar 
                    enableCopy={true}
                    onCopy={this.dummy}
                    enablePaste={true}
                    onPaste={this.dummy}
                    enableDelete={true}
                    onDelete={this.dummy}
                    enableDownload={true}
                    onDownload={this.download}
                    enableSelectAll={true}
                    statusSelectAll={SelectAllButtonStatus.NoneSelected}
                    onSelectAllChanged={this.dummy}
                    enableUpload={true}
                    onUpload={this.dummy}
                />
                <FlexContainer vertical={false}>
                    <FlexContainer vertical={true}>
                        <Typography style={{padding: 8}} variant="subheading">Banks</Typography>
                        <StorageBankList 
                            items={this.props.banks}
                            changeBanks={this.props.changeBanks}
                            loadBankPresets={this.props.loadBankPresets}
                        />
                    </FlexContainer>
                    <PresetView 
                        filterEmpty={false}
                        presets={this.bankPresets}
                        readonly={false}
                        changePresets={this.actions.changePresets}
                        // editPreset={this.actions.editPreset}
                        // movePreset={this.actions.movePreset}
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
        return this.props.presets;
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
        return  { banks: state.banks, presets: state.storage };
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