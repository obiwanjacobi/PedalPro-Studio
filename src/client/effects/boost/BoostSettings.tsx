import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

import { Boost } from "./Boost";
import { ChangeEffects } from "../ChangeEffectsAction";
import { BoostGainSlider } from "./BoostGainSlider";
import { BoostGain } from "../../../model/Boost";

type BoostSettingsProps = {
    boost: Boost;
};
type BoostSettingsActions = ChangeEffects;
type BoostSettingsAllProps = BoostSettingsProps & BoostSettingsActions;

export class BoostSettings extends React.Component<BoostSettingsAllProps> {

    public constructor(props: BoostSettingsAllProps) {
        super(props);
        this.onChangeGain = this.onChangeGain.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="h5">Boost</Typography>
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
        this.props.changeEffects({ boost: { gain: gain } });
    }
}
