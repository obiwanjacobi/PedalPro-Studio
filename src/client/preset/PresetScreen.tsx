import * as React from "react";
import { AppBar, Grid, Tabs, Tab } from "@material-ui/core";

import UserNotification from "../notification/UserNotification";
import ProgressBar from "../screen/ProgressBar";
import StoragePresetTab from "../storage/StoragePresetTab";
import DevicePresetTab from "../device/DevicePresetTab";
import FactoryPresetTab from "../factory/FactoryPresetTab";
import EffectsPage from "../effect/EffectsPage";

export interface PresetScreenProps { }
export interface PresetScreenState {
    selectedTab: number;
}

const containerStyles: React.CSSProperties = {
    height: "100%",
    display: "flex",
    flexDirection: "column"
};

export class PresetScreen extends React.PureComponent<PresetScreenProps, PresetScreenState> {
    public constructor(props: PresetScreenProps) {
        super(props);
        // bind event handlers
        this.changePageHandler = this.changePageHandler.bind(this);
    }

    public render(): React.ReactNode {
        return (
            <div id="PresetScreen" style={containerStyles}>
                <div style={{flex: "1 1 auto", display: "flex"}}>
                    {this.selectedTab === 0 && <DevicePresetTab />}
                    {this.selectedTab === 1 && <StoragePresetTab />}
                    {this.selectedTab === 2 && <FactoryPresetTab />}
                </div>
                <AppBar position="static" style={{ flex: "0 1 auto" }}>
                    <Grid container={true}>
                        <Grid item={true} xs={12}>
                            <Tabs fullWidth={true} value={this.selectedTab} onChange={this.changePageHandler}>
                                <Tab label="Device" />
                                <Tab label="Storage" />
                                <Tab label="Factory" />
                            </Tabs>
                        </Grid>
                    
                        {/* <Grid item={true} xs={1}>
                            <IconButton>
                                <NotificationsNone />
                            </IconButton>
                        </Grid> */}
                    </Grid>
                </AppBar>
                <EffectsPage />
                <UserNotification />
                <ProgressBar />
            </div>
        );
    }

    private changePageHandler(_: React.ChangeEvent<{}>, value: number) {
        this.activatePage(value);
    }
    
    private get selectedTab(): number {
        if (!this.state) { return 0; }
        return this.state.selectedTab;
    }
    
    private activatePage(index: number) {
        this.setState({ selectedTab: index });
    }
}