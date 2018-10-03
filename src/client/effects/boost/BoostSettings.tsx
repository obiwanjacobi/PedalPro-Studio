import * as React from "react";

import { Boost } from "./Boost";
import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { BoostGainSlider } from "./BoostGainSlider";
import { Grid, Typography } from "@material-ui/core";
import { BoostGain } from "../../../model/Boost";

type BoostSettingsProps = {
    boost: Boost;
};
type BoostSettingsActions = ChangeEffectsEx;
type BoostSettingsAllProps = BoostSettingsProps & BoostSettingsActions;
type BoostSettingsState = {};

export class BoostSettings extends React.Component<BoostSettingsAllProps, BoostSettingsState> {

    public constructor(props: BoostSettingsAllProps) {
        super(props);
        this.onChangeGain = this.onChangeGain.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Boost</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <BoostGainSlider 
                        gain={this.props.boost.gain} 
                        onChange={this.onChangeGain}
                    />
                </Grid>
            </Grid>
        );
    }

    private onChangeGain(gain: BoostGain) {
        this.props.changeEffectsEx({ boost: { gain: gain } });
    }
}
