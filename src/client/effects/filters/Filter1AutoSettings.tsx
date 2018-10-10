import * as React from "react";
import { Grid } from "@material-ui/core";

import { ChangeEffects } from "../ChangeEffectsAction";
import { AutoFilter1, Frequency1, FilterWaveForm } from "../../../model/Filters";
import { Frequency1Slider } from "./Frequency1Slider";
import { PhaseShiftOptions } from "../PhaseShiftOptions";
import { PhaseShift } from "../../../model/Types";
import { TempoSpeedSlider } from "../TempoSpeedSlider";
import { FilterWaveFromOptions } from "./FilterWaveFormOptions";

type Filter1AutoSettingsProps = {
    auto: AutoFilter1;
};
type Filter1AutoSettingsActions = ChangeEffects;
type Filter1AutoSettingsAllProps = Filter1AutoSettingsProps & Filter1AutoSettingsActions;

export class Filter1AutoSettings extends React.Component<Filter1AutoSettingsAllProps> {

    public constructor(props: Filter1AutoSettingsAllProps) {
        super(props);
        this.onChangeMinFrequency = this.onChangeMinFrequency.bind(this);
        this.onChangeMaxFrequency = this.onChangeMaxFrequency.bind(this);
        this.onChangePhase = this.onChangePhase.bind(this);
        this.onChangeWave = this.onChangeWave.bind(this);
        this.onChangeTempo = this.onChangeTempo.bind(this);
    }
    
    public render(): React.ReactNode {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Frequency1Slider 
                        label="Min Frequency" 
                        frequency={this.props.auto.minFrequency} 
                        onChange={this.onChangeMinFrequency} 
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <Frequency1Slider 
                        label="Max Frequency" 
                        frequency={this.props.auto.maxFrequency} 
                        onChange={this.onChangeMaxFrequency} 
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PhaseShiftOptions phase={this.props.auto.phase} onChange={this.onChangePhase} />
                </Grid>
                <Grid item={true} xs={12}>
                    <TempoSpeedSlider value={this.props.auto.tempo} onChange={this.onChangeTempo} />
                </Grid>
                <Grid item={true} xs={12}>
                    <FilterWaveFromOptions wave={this.props.auto.wave} onChange={this.onChangeWave} />
                </Grid>
            </Grid>
        );
    }

    private onChangeMinFrequency(value: Frequency1) {
        const max = Math.max(value, this.props.auto.maxFrequency);
        this.props.changeEffects({ filters: { filter1: { auto: { minFrequency: value, maxFrequency: max } } } });
    }

    private onChangeMaxFrequency(value: Frequency1) {
        const min = Math.min(value, this.props.auto.minFrequency);
        this.props.changeEffects({ filters: { filter1: { auto: { minFrequency: min, maxFrequency: value } } } });
    }

    private onChangePhase(value: PhaseShift) {
        this.props.changeEffects({ filters: { filter1: { auto: { phase: value } } } });
    }

    private onChangeWave(value: FilterWaveForm) {
        this.props.changeEffects({ filters: { filter1: { auto: { wave: value } } } });
    }

    private onChangeTempo(value: PhaseShift) {
        this.props.changeEffects({ filters: { filter1: { auto: { tempo: value } } } });
    }
}
