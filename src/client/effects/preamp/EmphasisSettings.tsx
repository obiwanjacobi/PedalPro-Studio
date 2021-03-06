import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { PercentSlider } from "../PercentSlider";
import { AttenuationGainSlider } from "../AttenuationGainSlider";
import { ToggleSwitch } from "../ToggleSwitch";
import { EmphasisFrequencySlider } from "./EmphasisFrequencySlider";
import { EmphasisFrequency, AttenuationGain, EmphasisResonance, PreEmphasis } from "../../../model/PreAmp";
import { Percent } from "../../../model/Types";
import { EmphasisResonanceOptions } from "./EmphasisResonanceOptions";

type EmphasisSettingsProps = {
    emphasis: PreEmphasis;
};
type EmphasisSettingsActions = ChangeEffectsEx;
type EmphasisSettingsAllProps = EmphasisSettingsProps & EmphasisSettingsActions;

export class EmphasisSettings extends React.Component<EmphasisSettingsAllProps> {
    public constructor(props: EmphasisSettingsAllProps) {
        super(props);
        this.onChangeBoost = this.onChangeBoost.bind(this);
        this.onChangeLevel = this.onChangeLevel.bind(this);
        this.onChangeHigh = this.onChangeHigh.bind(this);
        this.onChangeLow = this.onChangeLow.bind(this);
        this.onChangeGain = this.onChangeGain.bind(this);
        this.onChangeFrequency = this.onChangeFrequency.bind(this);
        this.onChangeResonance = this.onChangeResonance.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="h5">Pre Amp - Emphasis</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <ToggleSwitch
                        label="Boost" 
                        checked={this.props.emphasis.boost} 
                        unit={this.props.emphasis.boost ? "+12 dB" : "0 dB"} 
                        onChange={this.onChangeBoost}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider label="Level" value={this.props.emphasis.level} onChange={this.onChangeLevel} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider label="Low" value={this.props.emphasis.low} onChange={this.onChangeLow} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider label="High" value={this.props.emphasis.high} onChange={this.onChangeHigh} />
                </Grid>
                <Grid item={true} xs={12}>
                    <AttenuationGainSlider 
                        label="Emphasis"
                        value={this.props.emphasis.gain} 
                        onChange={this.onChangeGain}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <EmphasisFrequencySlider 
                        value={this.props.emphasis.frequency} 
                        onChange={this.onChangeFrequency}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <EmphasisResonanceOptions 
                        resonance={this.props.emphasis.resonance} 
                        onChange={this.onChangeResonance}
                    />
                </Grid>
            </Grid>
        );
    }

    private onChangeLevel(value: Percent): void {
        this.props.changeEffectsEx({ pre: { emphasis: { level: value }} });
    }

    private onChangeBoost(checked: boolean) {
        this.props.changeEffectsEx({ pre: { emphasis: { boost: checked }} });
    }

    private onChangeLow(value: Percent) {
        this.props.changeEffectsEx({ pre: { emphasis: { low: value }} });
    }

    private onChangeHigh(value: Percent) {
        this.props.changeEffectsEx({ pre: { emphasis: { high: value }} });
    }

    private onChangeGain(value: AttenuationGain) {
        this.props.changeEffectsEx({ pre: { emphasis: { gain: value }} });
    }

    private onChangeFrequency(value: EmphasisFrequency) {
        this.props.changeEffectsEx({ pre: { emphasis: { frequency: value }} });
    }

    private onChangeResonance(value: EmphasisResonance) {
        this.props.changeEffectsEx({ pre: { emphasis: { resonance: value }} });
    }
}