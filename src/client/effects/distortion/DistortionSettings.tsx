import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

import { Percent } from "../../../model/Types";
import { DistortionLowPass } from "../../../model/Distortion";
import { Distortion } from "./Distortion";
import { ChangeEffects } from "../ChangeEffectsAction";
import { ToggleSwitch } from "../ToggleSwitch";
import { PercentSlider } from "../PercentSlider";
import { DistortionLowPassOptions } from "./DistortionLowPassOptions";

type DistortionSettingsProps = {
    distortion: Distortion;
};
type DistortionSettingsActions = ChangeEffects;
type DistortionSettingsAllProps = DistortionSettingsProps & DistortionSettingsActions;
type DistortionSettingsState = {};

export class DistortionSettings extends React.Component<DistortionSettingsAllProps, DistortionSettingsState> {

    public constructor(props: DistortionSettingsAllProps) {
        super(props);
        this.onChangeBright = this.onChangeBright.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Distortion</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <ToggleSwitch 
                        label="Bright" 
                        checked={this.props.distortion.bright} 
                        onChange={this.onChangeBright}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider
                        label="Distortion"
                        value={this.props.distortion.level}
                        onChange={this.onChangeDistortion}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider
                        label="Tone"
                        value={this.props.distortion.tone}
                        onChange={this.onChangeTone}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <DistortionLowPassOptions
                        value={this.props.distortion.lowPass}
                        onChange={this.onChangeLowPass}
                    />
                </Grid>
            </Grid>
        );
    }

    private onChangeBright(value: boolean) {
        this.props.changeEffects({ distortion: { bright: value } });
    }

    private onChangeDistortion(value: Percent) {
        this.props.changeEffects({ distortion: { level: value } });
    }

    private onChangeTone(value: Percent) {
        this.props.changeEffects({ distortion: { tone: value } });
    }

    private onChangeLowPass(value: DistortionLowPass) {
        this.props.changeEffects({ distortion: { lowPass: value } });
    }
}
