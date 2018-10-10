import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

import { ChangeEffects } from "../ChangeEffectsAction";
import { Percent, TempoSpeed, PhaseShift } from "../../../model/Types";
import { PercentSlider } from "../PercentSlider";
import { PhaseShiftOptions } from "../PhaseShiftOptions";
import { TempoSpeedSlider } from "../TempoSpeedSlider";
import { Vibe, ModulationWaveForm } from "../../../model/Modulation";
import { ModulationWaveFormOptions } from "./ModulationWaveFormOptions";
import { ToggleSwitch } from "../ToggleSwitch";

type VibeSettingsProps = {
    vibe: Vibe;
};
type VibeSettingsActions = ChangeEffects;
type VibeSettingsAllProps = VibeSettingsProps & VibeSettingsActions;

export class VibeSettings extends React.Component<VibeSettingsAllProps> {

    public constructor(props: VibeSettingsAllProps) {
        super(props);
        this.onChangeBoost = this.onChangeBoost.bind(this);
        this.onChangeDepth = this.onChangeDepth.bind(this);
        this.onChangePhase = this.onChangePhase.bind(this);
        this.onChangeTempo = this.onChangeTempo.bind(this);
        this.onChangeWave = this.onChangeWave.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Vibe</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <ToggleSwitch label="Boost" checked={this.props.vibe.boost} onChange={this.onChangeBoost} />
                </Grid>
                <Grid item={true} xs={12}>
                    <TempoSpeedSlider value={this.props.vibe.tempo} onChange={this.onChangeTempo} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PhaseShiftOptions phase={this.props.vibe.phase} onChange={this.onChangePhase} />
                </Grid>
                <Grid item={true} xs={12}>
                    <ModulationWaveFormOptions wave={this.props.vibe.wave} onChange={this.onChangeWave} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider label="Depth" value={this.props.vibe.depth} onChange={this.onChangeDepth} />
                </Grid>
            </Grid>
        );
    }

    private onChangeBoost(enabled: boolean) {
        this.props.changeEffects({ modulation: { vibe: { boost: enabled } } });
    }

    private onChangeDepth(depth: Percent) {
        this.props.changeEffects({ modulation: { vibe: { depth: depth } } });
    }

    private onChangePhase(phase: PhaseShift) {
        this.props.changeEffects({ modulation: { vibe: { phase: phase } } });
    }

    private onChangeWave(wave: ModulationWaveForm) {
        this.props.changeEffects({ modulation: { vibe: { wave: wave } } });
    }

    private onChangeTempo(tempo: TempoSpeed) {
        this.props.changeEffects({ modulation: { vibe: { tempo: tempo } } });
    }
}
