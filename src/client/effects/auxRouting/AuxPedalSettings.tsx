import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

import { Aux } from "./AuxRouting";
import { ChangeEffects } from "../ChangeEffectsAction";
import { AuxRouting } from "../../../model/AuxRouting";
import { AuxPedalRoutingOptions } from "./AuxPedalRoutingOptions";

type AuxPedalSettingsProps = {
    aux: Aux;
};
type AuxPedalSettingsActions = ChangeEffects;
type AuxPedalSettingsAllProps = AuxPedalSettingsProps & AuxPedalSettingsActions;
type AuxPedalSettingsState = {};

export class AuxPedalSettings extends React.Component<AuxPedalSettingsAllProps, AuxPedalSettingsState> {

    public constructor(props: AuxPedalSettingsAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Aux Pedals</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <AuxPedalRoutingOptions routing={this.props.aux.routing} onChange={this.onChange} />
                </Grid>
            </Grid>
        );
    }

    private onChange(value: AuxRouting) {
        this.props.changeEffects({ aux: { routing: value } });
    }
}
