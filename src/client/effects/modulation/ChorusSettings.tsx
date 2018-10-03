import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

import { ChangeEffectsEx } from "../ChangeEffectsAction";
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
type ChorusSettingsActions = ChangeEffectsEx;
type ChorusSettingsAllProps = ChorusSettingsProps & ChorusSettingsActions;
type ChorusSettingsState = {};

export class ChorusSettings extends React.Component<ChorusSettingsAllProps, ChorusSettingsState> {

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
                    <Typography variant="headline">Chorus</Typography>
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
        this.props.changeEffectsEx({ modulation: { chorus: { bright: enabled } } });
    }

    private onChangeDepth(depth: Percent) {
        this.props.changeEffectsEx({ modulation: { chorus: { depth: depth } } });
    }

    private onChangeLevel(level: Percent) {
        this.props.changeEffectsEx({ modulation: { chorus: { level: level } } });
    }

    private onChangeWet(wet: Percent) {
        this.props.changeEffectsEx({ modulation: { chorus: { wet: wet } } });
    }

    private onChangePhase(phase: PhaseShift) {
        this.props.changeEffectsEx({ modulation: { chorus: { phase: phase } } });
    }

    private onChangeWave(wave: ModulationWaveForm) {
        this.props.changeEffectsEx({ modulation: { chorus: { wave: wave } } });
    }

    private onChangeTempo(tempo: TempoSpeed) {
        this.props.changeEffectsEx({ modulation: { chorus: { tempo: tempo } } });
    }
}
