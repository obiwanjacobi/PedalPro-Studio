import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

import { Aux } from "./AuxRouting";
import { ChangeEffects } from "../ChangeEffectsAction";
import { ToggleSwitch } from "../ToggleSwitch";
import { AmpSwitches } from "../../../model/AuxRouting";

type AmpSwitchesSettingsProps = {
    aux: Aux;
};
type AmpSwitchesSettingsActions = ChangeEffects;
type AmpSwitchesSettingsAllProps = AmpSwitchesSettingsProps & AmpSwitchesSettingsActions;

export class AmpSwitchesSettings extends React.Component<AmpSwitchesSettingsAllProps> {

    public constructor(props: AmpSwitchesSettingsAllProps) {
        super(props);
        this.onChangeSwitch1 = this.onChangeSwitch1.bind(this);
        this.onChangeSwitch2 = this.onChangeSwitch2.bind(this);
        this.onChangeSwitch3 = this.onChangeSwitch3.bind(this);
        this.onChangeSwitch4 = this.onChangeSwitch4.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Amp Switches</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <ToggleSwitch label="Switch 1" checked={this.switches.switch1} onChange={this.onChangeSwitch1} />
                </Grid>
                <Grid item={true} xs={12}>
                    <ToggleSwitch label="Switch 2" checked={this.switches.switch2} onChange={this.onChangeSwitch2} />
                </Grid>
                <Grid item={true} xs={12}>
                    <ToggleSwitch label="Switch 3" checked={this.switches.switch3} onChange={this.onChangeSwitch3} />
                </Grid>
                <Grid item={true} xs={12}>
                    <ToggleSwitch label="Switch 4" checked={this.switches.switch4} onChange={this.onChangeSwitch4} />
                </Grid>
            </Grid>
        );
    }

    private get switches(): AmpSwitches {
        return this.props.aux.switches;
    }

    private onChangeSwitch1(value: boolean) {
        this.props.changeEffects({ aux: { switches: { switch1: value } } });
    }

    private onChangeSwitch2(value: boolean) {
        this.props.changeEffects({ aux: { switches: { switch2: value } } });
    }

    private onChangeSwitch3(value: boolean) {
        this.props.changeEffects({ aux: { switches: { switch3: value } } });
    }

    private onChangeSwitch4(value: boolean) {
        this.props.changeEffects({ aux: { switches: { switch4: value } } });
    }
}
