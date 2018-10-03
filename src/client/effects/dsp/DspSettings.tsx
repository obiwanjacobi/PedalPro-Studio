import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

import { Dsp } from "./Dsp";
import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { Percent } from "../../../model/Types";
import { PercentSlider } from "../PercentSlider";
import { DspTypeOptions } from "./DspTypeOptions";
import { DspType } from "../../../model/Dsp";
import { DspDoubleDelaySettings } from "./DspDoubleDelaySettings";

type DspSettingsProps = {
    dsp: Dsp;
};
type DspSettingsActions = ChangeEffectsEx;
type DspSettingsAllProps = DspSettingsProps & DspSettingsActions;
type DspSettingsState = {};

export class DspSettings extends React.Component<DspSettingsAllProps, DspSettingsState> {

    public constructor(props: DspSettingsAllProps) {
        super(props);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeDry = this.onChangeDry.bind(this);
        this.onChangeWet = this.onChangeWet.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Digital Signal Processing</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <DspTypeOptions type={this.props.dsp.type} onChange={this.onChangeType} />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider 
                        label="Input" 
                        value={this.props.dsp.input} 
                        onChange={this.onChangeInput} 
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider 
                        label="Dry" 
                        value={this.props.dsp.dry} 
                        onChange={this.onChangeDry} 
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider 
                        label="Wet" 
                        value={this.props.dsp.wet} 
                        onChange={this.onChangeWet} 
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    {this.renderDelayTypeSettings()}
                </Grid>
            </Grid>
        );
    }

    private renderDelayTypeSettings(): React.ReactNode {
        switch (this.props.dsp.type) {
            case DspType.DoubleDelay:
                return (
                    <DspDoubleDelaySettings 
                        doubleDelay={this.props.dsp.doubleDelay} 
                        changeEffectsEx={this.props.changeEffectsEx}
                    />
                );
            case DspType.CaveDelay:
            case DspType.SingleTap:
            case DspType.FourTapsDelay:
            case DspType.TripleDelay:
            case DspType.Plate:
            case DspType.CustomSpring:
            case DspType.Hall:
            case DspType.FreeVerb:
        
            default:
                return null;
        }
    }

    private onChangeInput(value: Percent) {
        this.props.changeEffectsEx({ dsp: { input: value } });
    }

    private onChangeDry(value: Percent) {
        this.props.changeEffectsEx({ dsp: { dry: value } });
    }

    private onChangeWet(value: Percent) {
        this.props.changeEffectsEx({ dsp: { wet: value } });
    }

    private onChangeType(value: DspType) {
        this.props.changeEffectsEx({ dsp: { type: value }});
    }
}
