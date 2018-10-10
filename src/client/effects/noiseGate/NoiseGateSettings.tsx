import * as React from "react";

import { ChangeEffects } from "../ChangeEffectsAction";
import { PercentSlider } from "../PercentSlider";
import { Grid, Typography } from "@material-ui/core";
import { Percent } from "../../../model/Types";
import { NoiseGate } from "./NoiseGate";
import { ToggleSwitch } from "../ToggleSwitch";

type NoiseGateSettingsProps = {
    noiseGate: NoiseGate;
};
type NoiseGateSettingsActions = ChangeEffects;
type NoiseGateSettingsAllProps = NoiseGateSettingsProps & NoiseGateSettingsActions;

export class NoiseGateSettings extends React.Component<NoiseGateSettingsAllProps> {

    public constructor(props: NoiseGateSettingsAllProps) {
        super(props);
        this.onChangeSustain = this.onChangeSustain.bind(this);
        this.onChangeLevel = this.onChangeLevel.bind(this);
        this.onChangeRelease = this.onChangeRelease.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Noise Gate</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <ToggleSwitch
                        label="Keep Sustain" 
                        checked={this.props.noiseGate.sustain} 
                        onChange={this.onChangeSustain}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider
                        label="Noise Level"
                        value={this.props.noiseGate.noiseLevel} 
                        onChange={this.onChangeLevel}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider
                        label="Release"
                        value={this.props.noiseGate.release} 
                        onChange={this.onChangeRelease}
                    />
                </Grid>
            </Grid>
        );
    }

    private onChangeSustain(value: boolean) {
        this.props.changeEffects({ noiseGate: { sustain: value } });
    }

    private onChangeLevel(value: Percent) {
        this.props.changeEffects({ noiseGate: { noiseLevel: value } });
    }

    private onChangeRelease(value: Percent) {
        this.props.changeEffects({ noiseGate: { release: value } });
    }
}
