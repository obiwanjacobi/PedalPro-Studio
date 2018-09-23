import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

import { ChangeEffects } from "../ChangeEffectsAction";
import { PreFuzz } from "../../../model/PreAmp";
import { ToggleSwitch } from "../ToggleSwitch";
import { PercentSlider } from "../PercentSlider";
import { Percent } from "../../../model/Types";

type FuzzSettingsProps = {
    fuzz: PreFuzz;
};
type FuzzSettingsActions = ChangeEffects;
type FuzzSettingsAllProps = FuzzSettingsProps & FuzzSettingsActions;
type FuzzSettingsState = {};

export class FuzzSettings extends React.Component<FuzzSettingsAllProps, FuzzSettingsState> {
    constructor(props: FuzzSettingsAllProps) {
        super(props);
        this.onChangeBoost = this.onChangeBoost.bind(this);
        this.onChangeLevel = this.onChangeLevel.bind(this);
    }

    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Pre Amp - Fuzz</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <ToggleSwitch
                        label="Boost" 
                        checked={this.props.fuzz.boost} 
                        // unit={this.props.fuzz.boost ? "+12 dB" : "0 dB"} 
                        onChange={this.onChangeBoost}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider label="Level" value={this.props.fuzz.level} onChange={this.onChangeLevel} />
                </Grid>
            </Grid>
        );
    }

    private onChangeBoost(checked: boolean) {
        this.props.changeEffects({ pre: { fuzz: { boost: checked } } });
    }

    private onChangeLevel(value: Percent) {
        this.props.changeEffects({ pre: { fuzz: { level: value } } });
    }
}