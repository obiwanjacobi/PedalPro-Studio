import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

import { VoltageControlledAmp } from "./VoltageControlledAmp";
import { ChangeEffects } from "../ChangeEffectsAction";
import { VcaAssign } from "../../../model/VoltageControlledAmp";
import { Percent, TempoSpeed, PhaseShift, WaveForm } from "../../../model/Types";
import { VcaAssignOptions } from "./VcaAssignOptions";
import { PercentSlider } from "../PercentSlider";
import { PhaseShiftOptions } from "../PhaseShiftOptions";
import { WaveFormOptions } from "../WaveFormOptions";
import { TempoSpeedSlider } from "../TempoSpeedSlider";

type VcaSettingsProps = {
    vca: VoltageControlledAmp;
};
type VcaSettingsActions = ChangeEffects;
type VcaSettingsAllProps = VcaSettingsProps & VcaSettingsActions;
type VcaSettingsState = {};

export class VcaSettings extends React.Component<VcaSettingsAllProps, VcaSettingsState> {

    public constructor(props: VcaSettingsAllProps) {
        super(props);
        this.onChangeAssign = this.onChangeAssign.bind(this);
        this.onChangeDepth = this.onChangeDepth.bind(this);
        this.onChangePhase = this.onChangePhase.bind(this);
        this.onChangeTempo = this.onChangeTempo.bind(this);
        this.onChangeWave = this.onChangeWave.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Voltage Controlled Amplifier</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <VcaAssignOptions assign={this.props.vca.assign} onChange={this.onChangeAssign} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider label="Depth" value={this.props.vca.depth} onChange={this.onChangeDepth} />
                </Grid>
                <Grid item={true} xs={12}>
                    <TempoSpeedSlider value={this.props.vca.tempo} onChange={this.onChangeTempo} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PhaseShiftOptions phase={this.props.vca.phase} onChange={this.onChangePhase} />
                </Grid>
                <Grid item={true} xs={12}>
                    <WaveFormOptions wave={this.props.vca.wave} onChange={this.onChangeWave} />
                </Grid>
            </Grid>
        );
    }

    private onChangeAssign(assign: VcaAssign) {
        this.props.changeEffects({ vca: { assign: assign } });
    }

    private onChangeDepth(depth: Percent) {
        this.props.changeEffects({ vca: { depth: depth } });
    }

    private onChangePhase(phase: PhaseShift) {
        this.props.changeEffects({ vca: { phase: phase } });
    }

    private onChangeWave(wave: WaveForm) {
        this.props.changeEffects({ vca: { wave: wave } });
    }

    private onChangeTempo(tempo: TempoSpeed) {
        this.props.changeEffects({ vca: { tempo: tempo } });
    }
}
