import * as React from "react";

import { ChangeEffects } from "../ChangeEffectsAction";
import { Grid, Typography } from "@material-ui/core";
import { BoostGain } from "../../../model/Boost";
import { Delay } from "./Delay";

type DelaySettingsProps = {
    delay: Delay;
};
type DelaySettingsActions = ChangeEffects;
type DelaySettingsAllProps = DelaySettingsProps & DelaySettingsActions;
type DelaySettingsState = {};

export class DelaySettings extends React.Component<DelaySettingsAllProps, DelaySettingsState> {

    public constructor(props: DelaySettingsAllProps) {
        super(props);
        this.onChangeGain = this.onChangeGain.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Delay</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                </Grid>
            </Grid>
        );
    }

    private onChangeGain(gain: BoostGain) {
        this.props.changeEffects({ boost: { gain: gain } });
    }
}
