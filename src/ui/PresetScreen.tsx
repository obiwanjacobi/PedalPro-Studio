import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { Grid, AppBar, Tabs, Tab } from "material-ui";
// @ts-ignore: no d.ts available
import SplitterLayout from "react-splitter-layout";
import SwipableView from "react-swipeable-views";

import Preset from "../client/Preset";
import ApplicationDocument, { ScreenState, PresetCollection } from "../client/ApplicationDocument";
import { LoadPresets, createLoadPresetsAction } from "../client/LoadPresetsAction";
import { SelectPresets, createSelectPresetsAction } from "../client/SelectPresetsAction";
import { CopyPresets, createCopyPresetsAction } from "../client/CopyPresetsAction";
import { UpdateScreen, createUpdateScreenAction } from "../client/UpdateScreenAction";

import { LocalPresetTab } from "./LocalPresetTab";
// import { LocalPresetFrame } from "./LocalPresetFrame";
import DevicePresetTab from "./DevicePresetTab";
import StoragePresetTab from "./StoragePresetTab";
import FactoryPresetTab from "./FactoryPresetTab";
import { toBool } from "../Extensions";

export interface PresetScreenProps { }
export interface PresetScreenStateProps {
    local: Preset[];
    device: Preset[];
    dialogIsOpen: boolean;
}
export interface PresetScreenEvents { }
export type PresetScreenActions = LoadPresets & SelectPresets & CopyPresets & UpdateScreen;
export interface PresetScreenState {
    selectedTab: number;
}

export type PresetScreenAllProps = PresetScreenProps & PresetScreenStateProps 
                    & PresetScreenActions & PresetScreenEvents;

export class PresetScreen extends React.Component<PresetScreenAllProps, PresetScreenState> {

    public render(): React.ReactNode {
        return (
            <Grid container={true} direction="column">
                <Grid item={true} xs={12}>
                    <SplitterLayout  primaryIndex={1} primaryMinSize={200} secondaryMinSize={160}>
                        <LocalPresetTab
                            activeCollection={this.activeCollection}
                            presets={this.props.local}
                            selectPresets={this.actions.selectPresets}
                            copyPresets={this.actions.copyPresets}
                            dialogIsOpen={this.props.dialogIsOpen}
                            updateScreen={this.actions.updateScreen}
                        />
                        <SwipableView axis="x" index={this.selectedTab} onChangeIndex={this.activatePage} >
                            <DevicePresetTab
                                presets={this.props.device}
                                loadPresets={this.actions.loadPresets}
                                selectPresets={this.actions.selectPresets}
                                copyPresets={this.actions.copyPresets}
                            />
                            <StoragePresetTab />
                            <FactoryPresetTab />
                        </SwipableView>
                    </SplitterLayout>
                </Grid>
                <Grid item={true} xs={12}>
                    {/* need to specify position to not output unwanted styles */}
                    <AppBar position="static" style={{ position: "absolute", bottom: 0 }} >
                        <Tabs fullWidth={true} value={this.selectedTab} onChange={(e, v) => { this.activatePage(v); }}>
                            <Tab label="Device" />
                            <Tab label="Storage" />
                            <Tab label="Factory" />
                        </Tabs>
                    </AppBar>
                </Grid>
            </Grid>
        );
    }

    private get selectedTab(): number {
        if (!this.state) { return 0; }
        
        return this.state.selectedTab;
    }
    
    private get actions(): PresetScreenActions {
        return this.props;
    }

    private get activeCollection(): PresetCollection {
        switch (this.selectedTab) {
            default:
            case 0:
            return PresetCollection.device;
            case 1:
            return PresetCollection.storage;
            case 2:
            return PresetCollection.factory;
        }
    }
    
    private activatePage(index: number) {
        this.setState({ selectedTab: index });
    }
}

const extractComponentPropsFromState: MapStateToProps<PresetScreenStateProps, PresetScreenProps, ApplicationDocument> = 
    (state: ApplicationDocument, props: PresetScreenProps): PresetScreenStateProps => {
        return  { 
            device: state.device, 
            local: state.local, 
            dialogIsOpen: toBool(state.screen.targetPresetDialogOpen),
            ...props };
};

const createActionObject: MapDispatchToPropsFunction<PresetScreenActions, PresetScreenProps> =
    (dispatch: Dispatch<ApplicationDocument>, props: PresetScreenProps): PresetScreenActions => {
        return {
            loadPresets: (source: PresetCollection)  => {
                return createLoadPresetsAction(dispatch, source);
            },
            selectPresets: (presets: Preset[], selected: boolean): void => {
                dispatch(createSelectPresetsAction(presets, selected));
            },
            copyPresets: (presets: Preset[], target: PresetCollection): void => {
                dispatch(createCopyPresetsAction(presets, target));
            },
            updateScreen: (screen: ScreenState): void => {
                dispatch(createUpdateScreenAction(screen));
            }
        };
};

export default connect(extractComponentPropsFromState, createActionObject)(PresetScreen);