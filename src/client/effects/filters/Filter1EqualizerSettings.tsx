import * as React from "react";
import { Grid } from "@material-ui/core";

import { ChangeEffects } from "../ChangeEffectsAction";
import { EqFilter1, Frequency1 } from "../../../model/Filters";
import { Frequency1Slider } from "./Frequency1Slider";

type Filter1EqualizerSettingsProps = {
    eq: EqFilter1;
};
type Filter1EqualizerSettingsActions = ChangeEffects;
type Filter1EqualizerSettingsAllProps = Filter1EqualizerSettingsProps & Filter1EqualizerSettingsActions;
type Filter1EqualizerSettingsState = {};

export class Filter1EqualizerSettings 
    extends React.Component<Filter1EqualizerSettingsAllProps, Filter1EqualizerSettingsState> {

    public constructor(props: Filter1EqualizerSettingsAllProps) {
        super(props);
        this.onChangeFrequency = this.onChangeFrequency.bind(this);
    }
    
    public render(): React.ReactNode {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Frequency1Slider 
                        label="Frequency" 
                        frequency={this.props.eq.frequency} 
                        onChange={this.onChangeFrequency} 
                    />
                </Grid>
            </Grid>
        );
    }

    private onChangeFrequency(value: Frequency1) {
        this.props.changeEffects({ filters: { filter1: { eq: { frequency: value } } } });
    }
}
