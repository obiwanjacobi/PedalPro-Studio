import * as React from "react";
import { Grid, AppBar, Tabs, Tab, Collapse } from "material-ui";

import { PresetCollectionType } from "../client/ApplicationDocument";

import DevicePresetTab from "./DevicePresetTab";
import StoragePresetTab from "./StoragePresetTab";
import FactoryPresetTab from "./FactoryPresetTab";

export interface PresetScreenProps { }
export interface PresetScreenState {
    selectedTab: number;
}

export default class PresetScreen extends React.PureComponent<PresetScreenProps, PresetScreenState> {
    public constructor(props: PresetScreenProps) {
        super(props);
        // bind event handlers
        this.changePageHandler = this.changePageHandler.bind(this);
    }

    public render(): React.ReactNode {
        return (
            <Grid container={true} direction="column" spacing={8}>
                <Grid item={true} xs={12}>
                        <Collapse in={this.selectedTab === 0}>
                            <DevicePresetTab />
                        </Collapse>
                        <Collapse in={this.selectedTab === 1} >
                            <StoragePresetTab />
                        </Collapse>
                        <Collapse in={this.selectedTab === 2} >
                            <FactoryPresetTab />
                        </Collapse>
                </Grid>
                <Grid item={true} xs={12}>
                    <AppBar position="static">
                        <Tabs fullWidth={true} value={this.selectedTab} onChange={this.changePageHandler}>
                            <Tab label="Device" />
                            <Tab label="Storage" />
                            <Tab label="Factory" />
                        </Tabs>
                    </AppBar>
                </Grid>
            </Grid>
        );
    }

    private changePageHandler(event: React.ChangeEvent<{}>, value: number) {
        this.activatePage(value);
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