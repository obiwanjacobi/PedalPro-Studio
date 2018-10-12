import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

import { TapTempo } from "./TapTempo";
import { ChangeEffects } from "../ChangeEffectsAction";
import { TapTempoModeOptions } from "./TapTempoModeOptions";
import { TapTempoMode, TapTempoDivision } from "../../../model/TapTempo";
import { TapTempoDivisionOptions } from "./TapTempoDivisionOptions";

type TapTempoSettingsProps = {
    tap: TapTempo;
};
type TapTempoSettingsActions = ChangeEffects;
type TapTempoSettingsAllProps = TapTempoSettingsProps & TapTempoSettingsActions;

export class TapTempoSettings extends React.Component<TapTempoSettingsAllProps> {

    public constructor(props: TapTempoSettingsAllProps) {
        super(props);
        this.onChangeMode = this.onChangeMode.bind(this);
        this.onChangeDivision = this.onChangeDivision.bind(this);
        this.onChangeDivisionDelay = this.onChangeDivisionDelay.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Tap Tempo</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <TapTempoModeOptions mode={this.props.tap.mode} onChange={this.onChangeMode} />
                </Grid>
                <Grid item={true} xs={12}>
                    <TapTempoDivisionOptions
                        label="Division"
                        division={this.props.tap.tempoDivision} 
                        onChange={this.onChangeDivision}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <TapTempoDivisionOptions 
                        label="Division for Delay"
                        division={this.props.tap.tempoDivisionDelay} 
                        onChange={this.onChangeDivisionDelay}
                    />
                </Grid>
            </Grid>
        );
    }

    private onChangeMode(value: TapTempoMode) {
        this.props.changeEffects({ tap: { mode: value } });
    }

    private onChangeDivision(value: TapTempoDivision) {
        this.props.changeEffects({ tap: { tempoDivision: value } });
    }

    private onChangeDivisionDelay(value: TapTempoDivision) {
        this.props.changeEffects({ tap: { tempoDivisionDelay: value } });
    }
}
