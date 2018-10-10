import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { PreDistortionFet } from "../../../model/PreAmp";
import { PercentSlider } from "../PercentSlider";
import { Percent } from "../../../model/Types";

type DistortionFetSettingsProps = {
    distortion: PreDistortionFet;
};
type DistortionFetSettingsActions = ChangeEffectsEx;
type DistortionFetSettingsAllProps = DistortionFetSettingsProps & DistortionFetSettingsActions;

export class DistortionFetSettings extends React.Component<DistortionFetSettingsAllProps> {
    constructor(props: DistortionFetSettingsAllProps) {
        super(props);
        this.onChangeContour = this.onChangeContour.bind(this);
        this.onChangeLevel = this.onChangeLevel.bind(this);
    }

    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Pre Amp - Distortion (jfet)</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                <PercentSlider label="Contour" value={this.props.distortion.contour} onChange={this.onChangeContour} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider label="Level" value={this.props.distortion.level} onChange={this.onChangeLevel} />
                </Grid>
            </Grid>
        );
    }

    private onChangeContour(value: Percent) {
        this.props.changeEffectsEx({ pre: { distortionFet: { contour: value } } });
    }

    private onChangeLevel(value: Percent) {
        this.props.changeEffectsEx({ pre: { distortionFet: { level: value } } });
    }
}