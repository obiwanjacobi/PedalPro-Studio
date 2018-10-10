import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { PreDistortionDiode, DistortionDiodeType } from "../../../model/PreAmp";
import { PercentSlider } from "../PercentSlider";
import { Percent } from "../../../model/Types";
import { DistortionDiodeTypeOptions } from "./DistortionDiodeTypeOptions";

type DistortionDiodeSettingsProps = {
    distortion: PreDistortionDiode;
};
type DistortionDiodeSettingsActions = ChangeEffectsEx;
type DistortionDiodeSettingsAllProps = DistortionDiodeSettingsProps & DistortionDiodeSettingsActions;

export class DistortionDiodeSettings extends React.Component<DistortionDiodeSettingsAllProps> {

    public constructor(props: DistortionDiodeSettingsAllProps) {
        super(props);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeLow = this.onChangeLow.bind(this);
        this.onChangeMid = this.onChangeMid.bind(this);
        this.onChangeHigh = this.onChangeHigh.bind(this);
        this.onChangeLevel = this.onChangeLevel.bind(this);
    }

    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Pre Amp - Distortion (diode)</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <DistortionDiodeTypeOptions type={this.props.distortion.type} onChange={this.onChangeType} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider label="Low" value={this.props.distortion.low} onChange={this.onChangeLow} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider label="Mid" value={this.props.distortion.mid} onChange={this.onChangeMid} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider label="High" value={this.props.distortion.high} onChange={this.onChangeHigh} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider label="Level" value={this.props.distortion.level} onChange={this.onChangeLevel} />
                </Grid>
            </Grid>
        );
    }

    private onChangeType(type: DistortionDiodeType) {
        this.props.changeEffectsEx({ pre: { distortionDiode: { type: type } } });
    }

    private onChangeLow(value: Percent) {
        this.props.changeEffectsEx({ pre: { distortionDiode: { low: value } } });
    }

    private onChangeMid(value: Percent) {
        this.props.changeEffectsEx({ pre: { distortionDiode: { mid: value } } });
    }

    private onChangeHigh(value: Percent) {
        this.props.changeEffectsEx({ pre: { distortionDiode: { high: value } } });
    }

    private onChangeLevel(value: Percent) {
        this.props.changeEffectsEx({ pre: { distortionDiode: { level: value } } });
    }
}