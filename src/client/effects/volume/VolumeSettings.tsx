import * as React from "react";

import { Volume } from "./Volume";
import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { PercentSlider } from "../PercentSlider";
import { Grid, Typography } from "@material-ui/core";
import { Percent } from "../../../model/Types";

type VolumeSettingsProps = {
    volume: Volume;
};
type VolumeSettingsActions = ChangeEffectsEx;
type VolumeSettingsAllProps = VolumeSettingsProps & VolumeSettingsActions;
type VolumeSettingsState = {};

export class VolumeSettings extends React.Component<VolumeSettingsAllProps, VolumeSettingsState> {

    public constructor(props: VolumeSettingsAllProps) {
        super(props);
        this.onChangeLeft = this.onChangeLeft.bind(this);
        this.onChangeRight = this.onChangeRight.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Volume</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider
                        label="Left"
                        value={this.props.volume.levelL} 
                        onChange={this.onChangeLeft}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider
                        label="Right"
                        value={this.props.volume.levelR} 
                        onChange={this.onChangeRight}
                    />
                </Grid>
            </Grid>
        );
    }

    private onChangeLeft(value: Percent) {
        this.props.changeEffectsEx({ volume: { levelL: value } });
    }

    private onChangeRight(value: Percent) {
        this.props.changeEffectsEx({ volume: { levelR: value } });
    }
}
