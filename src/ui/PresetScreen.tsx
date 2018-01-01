import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { Grid, AppBar, Tabs, Tab } from "material-ui";
// @ts-ignore: no d.ts available
import SplitterLayout from "react-splitter-layout";
import SwipableView from "react-swipeable-views";

import Preset from "../model/Preset";
import EntityFilter from "../model/EntityFilter";
import { createLoadPresetsAction } from "../client/LoadPresetsAction";
import ApplicationDocument from "../client/ApplicationDocument";
import { LocalPresetTab } from "./LocalPresetTab";
import DevicePresetTab from "./DevicePresetTab";
import StoragePresetTab from "./StoragePresetTab";
import FactoryPresetTab from "./FactoryPresetTab";

export interface PresetScreenProps { }
export interface PresetScreenStateProps { 
    presets: Preset[];
}
export interface PresetScreenEvents { }
export interface PresetScreenActions { 
    loadPresets(source: string, filter: EntityFilter | null): Promise<void>;
}
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
    
    public render(): React.ReactNode {
        if (!this.props.presets) { return <div>Loading...</div>; }
        const self = this;

        return (
            <Grid container={true} direction="column">
                <Grid item={true} xs={12}>
                    <SplitterLayout  primaryIndex={1} primaryMinSize={200} secondaryMinSize={200}>
                        <LocalPresetTab presets={this.props.presets} />
                        <SwipableView axis="x" index={this.selectedTab} onChangeIndex={this.activatePage} >
                            <DevicePresetTab />
                            <StoragePresetTab />
                            <FactoryPresetTab />
                        </SwipableView>
                    </SplitterLayout>
                </Grid>
                <Grid item={true} xs={12}>
                    {/* need to specify position to not output unwanted styles */}
                    <AppBar position="static" style={{ position: "absolute", bottom: 0 }} >
                        <Tabs fullWidth={true} value={this.selectedTab} onChange={(e, v) => { self.activatePage(v); }}>
                            <Tab label="Device" />
                            <Tab label="Storage" />
                            <Tab label="Factory" />
                        </Tabs>
                    </AppBar>
                </Grid>
            </Grid>
        );
    }
    
    private get actions(): PresetScreenActions {
        return this.props;
    }

    componentWillMount() {
        this.actions.loadPresets("device", null);
    }

    private activatePage(index: number) {
        this.setState({ selectedTab: index });
    }
}

const extractComponentPropsFromState: MapStateToProps<PresetScreenStateProps, PresetScreenProps, ApplicationDocument> = 
    (state: ApplicationDocument, props: PresetScreenProps): PresetScreenStateProps => {
        return  { presets: state.device, ...props };    
};

const mapDispatchToProps: MapDispatchToPropsFunction<PresetScreenActions, PresetScreenProps> =
    (dispatch: Dispatch<ApplicationDocument>, props: PresetScreenProps): PresetScreenActions => {
        return {
            loadPresets: (source: string, filter: EntityFilter)  => {
                return createLoadPresetsAction(dispatch, source, filter);
            }
        };
};

export default connect(extractComponentPropsFromState, mapDispatchToProps)(PresetScreen);