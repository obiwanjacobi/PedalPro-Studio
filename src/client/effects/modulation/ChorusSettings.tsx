import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

import { ChangeEffects } from "../ChangeEffectsAction";
import { Percent, TempoSpeed, PhaseShift } from "../../../model/Types";
import { PercentSlider } from "../PercentSlider";
import { PhaseShiftOptions } from "../PhaseShiftOptions";
import { TempoSpeedSlider } from "../TempoSpeedSlider";
import { Chorus, ModulationWaveForm } from "../../../model/Modulation";
import { ModulationWaveFormOptions } from "./ModulationWaveFormOptions";
import { ToggleSwitch } from "../ToggleSwitch";

type ChorusSettingsProps = {
    chorus: Chorus;
};
type ChorusSettingsActions = ChangeEffects;
type ChorusSettingsAllProps = ChorusSettingsProps & ChorusSettingsActions;

export class ChorusSettings extends React.Component<ChorusSettingsAllProps> {

    public constructor(props: ChorusSettingsAllProps) {
        super(props);
        this.onChangeBright = this.onChangeBright.bind(this);
        this.onChangeDepth = this.onChangeDepth.bind(this);
        this.onChangeLevel = this.onChangeLevel.bind(this);
        this.onChangeWet = this.onChangeWet.bind(this);
        this.onChangePhase = this.onChangePhase.bind(this);
        this.onChangeTempo = this.onChangeTempo.bind(this);
        this.onChangeWave = this.onChangeWave.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="h5">Chorus</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <ToggleSwitch label="Bright" checked={this.props.chorus.bright} onChange={this.onChangeBright} />
                </Grid>
                <Grid item={true} xs={12}>
                    <TempoSpeedSlider value={this.props.chorus.tempo} onChange={this.onChangeTempo} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PhaseShiftOptions phase={this.props.chorus.phase} onChange={this.onChangePhase} />
                </Grid>
                <Grid item={true} xs={12}>
                    <ModulationWaveFormOptions wave={this.props.chorus.wave} onChange={this.onChangeWave} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider label="Input Level" value={this.props.chorus.level} onChange={this.onChangeLevel} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider label="Depth" value={this.props.chorus.depth} onChange={this.onChangeDepth} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider label="Wet" value={this.props.chorus.wet} onChange={this.onChangeWet} />
                </Grid>
            </Grid>
        );
    }

    private onChangeBright(enabled: boolean) {
        this.props.changeEffects({ modulation: { chorus: { bright: enabled } } });
    }

    private onChangeDepth(depth: Percent) {
        this.props.changeEffects({ modulation: { chorus: { depth: depth } } });
    }

    private onChangeLevel(level: Percent) {
        this.props.changeEffects({ modulation: { chorus: { level: level } } });
    }

    private onChangeWet(wet: Percent) {
        this.props.changeEffects({ modulation: { chorus: { wet: wet } } });
    }

    private onChangePhase(phase: PhaseShift) {
        this.props.changeEffects({ modulation: { chorus: { phase: phase } } });
    }

    private onChangeWave(wave: ModulationWaveForm) {
        this.props.changeEffects({ modulation: { chorus: { wave: wave } } });
    }

    private onChangeTempo(tempo: TempoSpeed) {
        this.props.changeEffects({ modulation: { chorus: { tempo: tempo } } });
    }
}
