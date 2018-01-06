import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { Grid, AppBar, Tabs, Tab } from "material-ui";
// @ts-ignore: no d.ts available
import SplitterLayout from "react-splitter-layout";
import SwipableView from "react-swipeable-views";

import Preset from "../client/Preset";
import { createLoadPresetsAction } from "../client/LoadPresetsAction";
import { createSelectPresetsAction } from "../client/SelectPresetsAction";
import { createCopyPresetsAction } from "../client/CopyPresetsAction";
import ApplicationDocument from "../client/ApplicationDocument";

import * as PresetActions from "./CommonPresetActions";
import { LocalPresetTab } from "./LocalPresetTab";
import DevicePresetTab from "./DevicePresetTab";
import StoragePresetTab from "./StoragePresetTab";
import FactoryPresetTab from "./FactoryPresetTab";

export interface PresetScreenProps { }
export interface PresetScreenStateProps {
    local: Preset[];
    device: Preset[];
}
export interface PresetScreenEvents { }
export type PresetScreenActions = 
    PresetActions.LoadPresets & PresetActions.SelectPresets & PresetActions.CopyPresets;
export interface PresetScreenState {
    selectedTab: number;
}

export type PresetScreenAllProps = PresetScreenProps & PresetScreenStateProps 
                    & PresetScreenActions & PresetScreenEvents;

export class PresetScreen extends React.Component<PresetScreenAllProps, PresetScreenState> {
    private get selectedTab(): number {
        if (!this.state) { return 0; }
        
        return this.state.selectedTab;
    }
    
    private get actions(): PresetScreenActions {
        return this.props;
    }

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

    private get activeCollection(): string {
        switch(this.selectedTab) {
            default:
            case 0:
            return "device";
            case 1:
            return "storage";
            case 2:
            return "factory";
        }
    }
    private activatePage(index: number) {
        this.setState({ selectedTab: index });
    }
}

const extractComponentPropsFromState: MapStateToProps<PresetScreenStateProps, PresetScreenProps, ApplicationDocument> = 
    (state: ApplicationDocument, props: PresetScreenProps): PresetScreenStateProps => {
        return  { device: state.device, local: state.local, ...props };
};

const createActionObject: MapDispatchToPropsFunction<PresetScreenActions, PresetScreenProps> =
    (dispatch: Dispatch<ApplicationDocument>, props: PresetScreenProps): PresetScreenActions => {
        return {
            loadPresets: (source: string)  => {
                return createLoadPresetsAction(dispatch, source);
            },
            selectPresets: (presets: Preset[], selected: boolean): void => {
                dispatch(createSelectPresetsAction(presets, selected));
            },
            copyPresets: (presets: Preset[], target: string): void => {
                dispatch(createCopyPresetsAction(presets, target));
            }
        };
};

export default connect(extractComponentPropsFromState, createActionObject)(PresetScreen);