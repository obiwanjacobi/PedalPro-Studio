import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

import { ChangeEffects } from "../ChangeEffectsAction";
import { Percent, TempoSpeed } from "../../../model/Types";
import { PercentSlider } from "../PercentSlider";
import { TempoSpeedSlider } from "../TempoSpeedSlider";
import { Flanger, ModulationWaveForm, Harmonics } from "../../../model/Modulation";
import { ModulationWaveFormOptions } from "./ModulationWaveFormOptions";
import { FlangerHarmonicsOptions } from "./FlangerHarmonicsOptions";

type FlangerSettingsProps = {
    flanger: Flanger;
};
type FlangerSettingsActions = ChangeEffects;
type FlangerSettingsAllProps = FlangerSettingsProps & FlangerSettingsActions;

export class FlangerSettings extends React.Component<FlangerSettingsAllProps> {

    public constructor(props: FlangerSettingsAllProps) {
        super(props);
        this.onChangeHarmonics = this.onChangeHarmonics.bind(this);
        this.onChangeDepth = this.onChangeDepth.bind(this);
        this.onChangeFeedback = this.onChangeFeedback.bind(this);
        this.onChangeWet = this.onChangeWet.bind(this);
        this.onChangeDelay = this.onChangeDelay.bind(this);
        this.onChangeTempo = this.onChangeTempo.bind(this);
        this.onChangeWave = this.onChangeWave.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="h5">Flanger</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <FlangerHarmonicsOptions 
                        harmonics={this.props.flanger.harmonics} 
                        onChange={this.onChangeHarmonics}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <TempoSpeedSlider value={this.props.flanger.tempo} onChange={this.onChangeTempo} />
                </Grid>
                <Grid item={true} xs={12}>
                    <ModulationWaveFormOptions wave={this.props.flanger.wave} onChange={this.onChangeWave} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider label="Depth" value={this.props.flanger.depth} onChange={this.onChangeDepth} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider 
                        label="Feedback" 
                        value={this.props.flanger.feedback} 
                        onChange={this.onChangeFeedback}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider 
                        label="Manual Delay" 
                        value={this.props.flanger.delay} 
                        onChange={this.onChangeDelay} 
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider label="Wet" value={this.props.flanger.wet} onChange={this.onChangeWet} />
                </Grid>
            </Grid>
        );
    }

    private onChangeHarmonics(harmonics: Harmonics) {
        this.props.changeEffects({ modulation: { flanger: { harmonics: harmonics } } });
    }

    private onChangeDepth(depth: Percent) {
        this.props.changeEffects({ modulation: { flanger: { depth: depth } } });
    }

    private onChangeFeedback(feedback: Percent) {
        this.props.changeEffects({ modulation: { flanger: { feedback: feedback } } });
    }

    private onChangeWet(wet: Percent) {
        this.props.changeEffects({ modulation: { flanger: { wet: wet } } });
    }

    private onChangeDelay(delay: Percent) {
        this.props.changeEffects({ modulation: { flanger: { delay: delay } } });
    }

    private onChangeWave(wave: ModulationWaveForm) {
        this.props.changeEffects({ modulation: { flanger: { wave: wave } } });
    }

    private onChangeTempo(tempo: TempoSpeed) {
        this.props.changeEffects({ modulation: { flanger: { tempo: tempo } } });
    }
}
