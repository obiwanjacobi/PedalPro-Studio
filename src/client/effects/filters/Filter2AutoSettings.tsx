import * as React from "react";
import { Grid } from "@material-ui/core";

import { ChangeEffects } from "../ChangeEffectsAction";
import { AutoFilter2, Frequency2, FilterWaveForm } from "../../../model/Filters";
import { Frequency2Slider } from "./Frequency2Slider";
import { PhaseShiftOptions } from "../PhaseShiftOptions";
import { PhaseShift } from "../../../model/Types";
import { TempoSpeedSlider } from "../TempoSpeedSlider";
import { FilterWaveFromOptions } from "./FilterWaveFormOptions";

type Filter2AutoSettingsProps = {
    auto: AutoFilter2;
};
type Filter2AutoSettingsActions = ChangeEffects;
type Filter2AutoSettingsAllProps = Filter2AutoSettingsProps & Filter2AutoSettingsActions;
type Filter2AutoSettingsState = {};

export class Filter2AutoSettings extends React.Component<Filter2AutoSettingsAllProps, Filter2AutoSettingsState> {

    public constructor(props: Filter2AutoSettingsAllProps) {
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
                    <Frequency2Slider 
                        label="Min Frequency" 
                        frequency={this.props.auto.minFrequency} 
                        onChange={this.onChangeMinFrequency} 
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <Frequency2Slider 
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

    private onChangeMinFrequency(value: Frequency2) {
        const max = Math.max(value, this.props.auto.maxFrequency);
        this.props.changeEffects({ filters: { filter2: { auto: { minFrequency: value, maxFrequency: max } } } });
    }

    private onChangeMaxFrequency(value: Frequency2) {
        const min = Math.min(value, this.props.auto.minFrequency);
        this.props.changeEffects({ filters: { filter2: { auto: { minFrequency: min, maxFrequency: value } } } });
    }

    private onChangePhase(value: PhaseShift) {
        this.props.changeEffects({ filters: { filter2: { auto: { phase: value } } } });
    }

    private onChangeWave(value: FilterWaveForm) {
        this.props.changeEffects({ filters: { filter2: { auto: { wave: value } } } });
    }

    private onChangeTempo(value: PhaseShift) {
        this.props.changeEffects({ filters: { filter2: { auto: { tempo: value } } } });
    }
}
