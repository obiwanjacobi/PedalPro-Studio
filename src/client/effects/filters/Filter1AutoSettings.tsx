import * as React from "react";
import { Grid } from "@material-ui/core";

import { ChangeEffects } from "../ChangeEffectsAction";
import { AutoFilter1, Frequency1 } from "../../../model/Filters";
import { Frequency1Slider } from "./Frequency1Slider";
import { PhaseShiftOptions } from "../PhaseShiftOptions";
import { PhaseShift } from "../../../model/Types";
import { TempoSpeedSlider } from "../TempoSpeedSlider";

type Filter1AutoSettingsProps = {
    auto: AutoFilter1;
};
type Filter1AutoSettingsActions = ChangeEffects;
type Filter1AutoSettingsAllProps = Filter1AutoSettingsProps & Filter1AutoSettingsActions;
type Filter1AutoSettingsState = {};

export class Filter1AutoSettings extends React.Component<Filter1AutoSettingsAllProps, Filter1AutoSettingsState> {

    public constructor(props: Filter1AutoSettingsAllProps) {
        super(props);
        this.onChangeMinFrequency = this.onChangeMinFrequency.bind(this);
        this.onChangeMaxFrequency = this.onChangeMaxFrequency.bind(this);
        this.onChangePhase = this.onChangePhase.bind(this);
        this.onChangeTempo = this.onChangeTempo.bind(this);
    }
    
    public render(): React.ReactNode {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Frequency1Slider 
                        frequency={this.props.auto.minFrequency} 
                        label="Min Frequency" 
                        onChange={this.onChangeMinFrequency} 
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <Frequency1Slider 
                        frequency={this.props.auto.maxFrequency} 
                        label="Max Frequency" 
                        onChange={this.onChangeMaxFrequency} 
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PhaseShiftOptions phase={this.props.auto.phase} onChange={this.onChangePhase} />
                </Grid>
                <Grid item={true} xs={12}>
                    <TempoSpeedSlider value={this.props.auto.tempo} onChange={this.onChangeTempo} />
                </Grid>
            </Grid>
        );
    }

    private onChangeMinFrequency(value: Frequency1) {
        this.props.changeEffects({ filters: { filter1: { auto: { minFrequency: value } } } });
    }

    private onChangeMaxFrequency(value: Frequency1) {
        this.props.changeEffects({ filters: { filter1: { auto: { maxFrequency: value } } } });
    }

    private onChangePhase(value: PhaseShift) {
        this.props.changeEffects({ filters: { filter1: { auto: { phase: value } } } });
    }

    private onChangeTempo(value: PhaseShift) {
        this.props.changeEffects({ filters: { filter1: { auto: { tempo: value } } } });
    }
}
