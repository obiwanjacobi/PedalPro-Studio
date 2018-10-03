import * as React from "react";

import { Phaser } from "./Phaser";
import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { PercentSlider } from "../PercentSlider";
import { Grid, Typography } from "@material-ui/core";
import { Percent, TempoSpeed, PhaseShift, WaveForm } from "../../../model/Types";
import { WaveFormOptions } from "../WaveFormOptions";
import { PhaseShiftOptions } from "../PhaseShiftOptions";
import { TempoSpeedSlider } from "../TempoSpeedSlider";

type PhaserSettingsProps = {
    phaser: Phaser;
};
type PhaserSettingsActions = ChangeEffectsEx;
type PhaserSettingsAllProps = PhaserSettingsProps & PhaserSettingsActions;
type PhaserSettingsState = {};

export class PhaserSettings extends React.Component<PhaserSettingsAllProps, PhaserSettingsState> {

    public constructor(props: PhaserSettingsAllProps) {
        super(props);
        this.onChangeTempo = this.onChangeTempo.bind(this);
        this.onChangeManual = this.onChangeManual.bind(this);
        this.onChangeDepth = this.onChangeDepth.bind(this);
        this.onChangePhase = this.onChangePhase.bind(this);
        this.onChangeWave = this.onChangeWave.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Phaser</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <TempoSpeedSlider value={this.props.phaser.tempo} onChange={this.onChangeTempo} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider label="Manual" value={this.props.phaser.manual} onChange={this.onChangeManual} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider label="Depth" value={this.props.phaser.depth} onChange={this.onChangeDepth} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PhaseShiftOptions phase={this.props.phaser.phase} onChange={this.onChangePhase} />
                </Grid>
                <Grid item={true} xs={12}>
                    <WaveFormOptions wave={this.props.phaser.wave} onChange={this.onChangeWave} />
                </Grid>
            </Grid>
        );
    }

    private onChangeTempo(value: TempoSpeed) {
        this.props.changeEffectsEx({ phaser: { tempo: value } });
    }

    private onChangeManual(value: Percent) {
        this.props.changeEffectsEx({ phaser: { manual: value } });
    }

    private onChangeDepth(value: Percent) {
        this.props.changeEffectsEx({ phaser: { depth: value } });
    }

    private onChangePhase(value: PhaseShift) {
        this.props.changeEffectsEx({ phaser: { phase: value } });
    }

    private onChangeWave(value: WaveForm) {
        this.props.changeEffectsEx({ phaser: { wave: value } });
    }
}
