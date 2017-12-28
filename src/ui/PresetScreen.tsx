import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { Grid, AppBar, Tabs, Tab } from "material-ui";

import Preset from "../model/Preset";
import { PresetList } from "./PresetList";
import { createLoadPresetsAction } from "../client/LoadPresetsAction";
import EntityFilter from "../model/EntityFilter";
import ApplicationDocument from "../client/ApplicationDocument";

export interface PresetScreenProps { }
export interface PresetScreenStateProps { 
    presets: Preset[]; 
}
export interface PresetScreenActions { 
    loadPresets(source: string, filter: EntityFilter | null): Promise<void>;
}
export interface PresetScreenState { }

export type PresetScreenAllProps = PresetScreenProps & PresetScreenStateProps & PresetScreenActions;

export class PresetScreen extends React.Component<PresetScreenAllProps, PresetScreenState> {
    public render(): React.ReactNode {
        if (!this.props.presets) { return <div>Loading...</div>; }

        return (
            <Grid container={true} spacing={16}>
                <Grid item={true} xs={12}>
                    <PresetList presets={this.props.presets}/>
                </Grid>
                <Grid item={true} xs={12}>
                    <AppBar position="static">
                        <Tabs fullWidth={true} onChange={this.activatePage}>
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

    private activatePage() {
        // TODO
    }
}

const extractComponentPropsFromState: MapStateToProps<PresetScreenStateProps, PresetScreenProps, ApplicationDocument> = 
    (state: ApplicationDocument, props: PresetScreenProps): PresetScreenStateProps => {
        return  { presets: state.device };
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