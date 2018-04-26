import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { Typography } from "material-ui";
import { FileDownload } from "material-ui-icons";

import { SelectAllButtonStatus } from "../controls/SelectAllButton";
import { FlexContainer } from "../controls/FlexContainer";
import { PresetToolbar } from "./PresetToolbar";
import { ChangePresets, createChangePresetsAction } from "../ChangePresetsAction";
import { LoadPresets, dispatchLoadPresetsAction } from "../LoadPresetsAction";
import { SavePresets, createSavePresetsAction } from "../SavePresetsAction";
import { CopyPresets, createCopyPresetsAction } from "../CopyPresetsAction";
import { MovePreset, createMovePresetAction } from "../MovePresetAction";
import { UpdateScreen, createUpdateScreenAction } from "../screen/UpdateScreenAction";
import { DeletePresets, createDeletePresetsAction } from "../DeletePresetsAction";
import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { Preset } from "../Preset";
import { ItemUI } from "../ItemUI";
import { ScreenState } from "../screen/ScreenState";
import { StorageBankList } from "./StorageBankList";
import { PresetView } from "./PresetView";
import { testStorageItems } from "./StorageTestData";

export interface StoragePresetTabProps {}
export interface StoragePresetTabStoreProps {}
export interface StoragePresetTabState {}
export type StoragePresetTabActions = 
    ChangePresets & LoadPresets & SavePresets & CopyPresets & MovePreset & UpdateScreen & DeletePresets;
export type StoragePresetTabAllProps = StoragePresetTabProps & StoragePresetTabStoreProps & StoragePresetTabActions;

export class StoragePresetTab extends React.Component<StoragePresetTabAllProps, StoragePresetTabState> {
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
                    onDownload={this.dummy}
                    enableSelectAll={true}
                    statusSelectAll={SelectAllButtonStatus.NoneSelected}
                    onSelectAllChanged={this.dummy}
                    enableUpload={true}
                    onUpload={this.dummy}
                />
                <FlexContainer  vertical={false}>
                    <StorageBankList 
                        items={testStorageItems}
                    />
                    <PresetView 
                        presets={this.bankPresets}
                        readonly={false}
                        changePresets={this.actions.changePresets}
                        // editPreset={this.actions.editPreset}
                        // movePreset={this.actions.movePreset}
                        deletePresets={this.actions.deletePresets}
                        empty={<Typography>
                            Press <FileDownload/> to retrieve the preset banks.
                        </Typography>}                
                    />
                </FlexContainer>
            </FlexContainer>
        );
    }

    protected get actions(): Readonly<StoragePresetTabActions> {
        return this.props;
    }

    private get bankPresets(): Preset[] {
        return testStorageItems[0].presets;
    }

    // tslint:disable-next-line:no-empty
    private dummy() {
    }
}

type ExtractStatePropFunc = MapStateToProps<StoragePresetTabStoreProps, StoragePresetTabProps, ApplicationDocument>;
const extractComponentPropsFromState: ExtractStatePropFunc = (
    state: ApplicationDocument, _: StoragePresetTabProps): StoragePresetTabStoreProps => {
        return  { presets: state.storage };
};

type ActionDispatchFunc = MapDispatchToPropsFunction<StoragePresetTabActions, StoragePresetTabProps>;
const createActionObject: ActionDispatchFunc =
    (dispatch: Dispatch<ApplicationDocument>, _: StoragePresetTabProps): StoragePresetTabActions => {
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