import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

import { Aux } from "./AuxRouting";
import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { Percent } from "../../../model/Types";
import { PercentSlider } from "../PercentSlider";

type AuxMixerSettingsProps = {
    aux: Aux;
};
type AuxMixerSettingsActions = ChangeEffectsEx;
type AuxMixerSettingsAllProps = AuxMixerSettingsProps & AuxMixerSettingsActions;
type AuxMixerSettingsState = {};

export class AuxMixerSettings extends React.Component<AuxMixerSettingsAllProps, AuxMixerSettingsState> {

    public constructor(props: AuxMixerSettingsAllProps) {
        super(props);
        this.onChangeGainL = this.onChangeGainL.bind(this);
        this.onChangeGainR = this.onChangeGainR.bind(this);
        this.onChangeWetL = this.onChangeWetL.bind(this);
        this.onChangeWetR = this.onChangeWetR.bind(this);
        this.onChangeDryL = this.onChangeDryL.bind(this);
        this.onChangeDryR = this.onChangeDryR.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Aux Mixer</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider 
                        label="Gain Send Left" 
                        value={this.props.aux.mixGainSendL} 
                        onChange={this.onChangeGainL} 
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider 
                        label="Gain Send Right" 
                        value={this.props.aux.mixGainSendR} 
                        onChange={this.onChangeGainR} 
                    />
                </Grid>

                <Grid item={true} xs={12}>
                    <PercentSlider 
                        label="Wet Level Left" 
                        value={this.props.aux.mixWetLevelL} 
                        onChange={this.onChangeWetL} 
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider 
                        label="Wet Level Right" 
                        value={this.props.aux.mixWetLevelR} 
                        onChange={this.onChangeWetR} 
                    />
                </Grid>

                <Grid item={true} xs={12}>
                    <PercentSlider 
                        label="Dry Level Left" 
                        value={this.props.aux.mixDryLevelL} 
                        onChange={this.onChangeDryL} 
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider 
                        label="Dry Level Right" 
                        value={this.props.aux.mixDryLevelR} 
                        onChange={this.onChangeDryR} 
                    />
                </Grid>
            </Grid>
        );
    }

    private onChangeGainL(value: Percent) {
        this.props.changeEffectsEx({ aux: { mixGainSendL: value } });
    }

    private onChangeGainR(value: Percent) {
        this.props.changeEffectsEx({ aux: { mixGainSendR: value } });
    }

    private onChangeWetL(value: Percent) {
        this.props.changeEffectsEx({ aux: { mixWetLevelL: value } });
    }

    private onChangeWetR(value: Percent) {
        this.props.changeEffectsEx({ aux: { mixWetLevelR: value } });
    }

    private onChangeDryL(value: Percent) {
        this.props.changeEffectsEx({ aux: { mixDryLevelL: value } });
    }

    private onChangeDryR(value: Percent) {
        this.props.changeEffectsEx({ aux: { mixDryLevelR: value } });
    }
}
