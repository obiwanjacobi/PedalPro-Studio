import * as React from "react";
import { Grid, AppBar, Tabs, Tab } from "material-ui";
// @ts-ignore: no d.ts available
import SplitterLayout from "react-splitter-layout";
import SwipableView from "react-swipeable-views";

import { PresetCollectionType } from "../client/ApplicationDocument";

import LocalPresetTab from "./LocalPresetTab";
import DevicePresetTab from "./DevicePresetTab";
import StoragePresetTab from "./StoragePresetTab";
import FactoryPresetTab from "./FactoryPresetTab";

export interface PresetScreenProps { }
export interface PresetScreenState {
    selectedTab: number;
}

export default class PresetScreen extends React.Component<PresetScreenProps, PresetScreenState> {

    public render(): React.ReactNode {
        return (
            <Grid container={true} direction="column">
                <Grid item={true} xs={12}>
                    <SplitterLayout  primaryIndex={1} primaryMinSize={200} secondaryMinSize={160}>
                        <LocalPresetTab activeCollection={this.activeCollection} />
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
    
    private get activeCollection(): PresetCollectionType {
        switch (this.selectedTab) {
            default:
            case 0:
            return PresetCollectionType.device;
            case 1:
            return PresetCollectionType.storage;
            case 2:
            return PresetCollectionType.factory;
        }
    }
    
    private activatePage(index: number) {
        this.setState({ selectedTab: index });
    }
}