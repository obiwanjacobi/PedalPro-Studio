import * as React from "react";

import { Boost } from "./Boost";
import { ChangeEffects } from "../ChangeEffectsAction";
// import { Typography } from "@material-ui/core";
import { BoostGainSlider } from "./BoostGainSlider";
import { Grid, Typography } from "@material-ui/core";
import { numberToString } from "../../../StringExtensions";

type BoostSettingsProps = {
    boost: Boost;
};
type BoostSettingsActions = ChangeEffects;
type BoostSettingsAllProps = BoostSettingsProps & BoostSettingsActions;
type BoostSettingsState = {};

export class BoostSettings extends React.Component<BoostSettingsAllProps, BoostSettingsState> {
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Boost</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <Typography variant="title">Gain</Typography>
                </Grid>
                <BoostGainSlider gain={this.props.boost.gain} changeEffects={this.props.changeEffects} />
                <Grid item={true} xs={10}></Grid>
                <Grid item={true} xs={1}>
                    <Typography color="secondary" variant="subheading">{this.formatGainValue()}</Typography>
                </Grid>
                <Grid item={true} xs={1}>
                    <Typography variant="body2">dB</Typography>
                </Grid>
            </Grid>
        );
    }

    private formatGainValue(): string {
        return numberToString(this.props.boost.gain, 2, 1);
    }
}
