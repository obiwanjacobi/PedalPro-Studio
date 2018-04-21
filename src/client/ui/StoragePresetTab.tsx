import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";

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
import { Preset, ItemUI } from "../Preset";
import { ScreenState } from "../screen/ScreenState";
import { StoragePresetList } from "./StoragePresetList";

const testStorageItems = [
    { bank: "bank 1", presets: [], ui: { selected: false, expanded: false, markedDeleted: false }},
    { bank: "bank 2", presets: [], ui: { selected: false, expanded: false, markedDeleted: false }},
    { bank: "bank 3", presets: [], ui: { selected: false, expanded: false, markedDeleted: false }},
    { bank: "bank 4", presets: [], ui: { selected: false, expanded: false, markedDeleted: false }},
];

export interface StoragePresetTabProps {}
export interface StoragePresetTabStoreProps {}
export interface StoragePresetTabState {}
export type StoragePresetTabActions = 
    ChangePresets & LoadPresets & SavePresets & CopyPresets & MovePreset & UpdateScreen & DeletePresets;
export type StoragePresetTabAllProps = StoragePresetTabProps & StoragePresetTabStoreProps & StoragePresetTabActions;

export class StoragePresetTab extends React.Component<StoragePresetTabAllProps, StoragePresetTabState> {
    public render() {
        return (
            <FlexContainer>
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
                <StoragePresetList 
                    items={testStorageItems}
                />
            </FlexContainer>
        );
    }

    private dummy(){}
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