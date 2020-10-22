import * as React from "react";
import { Grid } from "@material-ui/core";

import { ChangeEffects } from "../ChangeEffectsAction";
import { EqFilter2, Frequency2 } from "../../../model/Filters";
import { Frequency2Slider } from "./Frequency2Slider";

type Filter2EqualizerSettingsProps = {
    eq: EqFilter2;
};
type Filter2EqualizerSettingsActions = ChangeEffects;
type Filter2EqualizerSettingsAllProps = Filter2EqualizerSettingsProps & Filter2EqualizerSettingsActions;

export class Filter2EqualizerSettings extends React.Component<Filter2EqualizerSettingsAllProps> {

    public constructor(props: Filter2EqualizerSettingsAllProps) {
        super(props);
        this.onChangeFrequency = this.onChangeFrequency.bind(this);
    }
    
    public render(): React.ReactNode {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Frequency2Slider 
                        label="Frequency" 
                        frequency={this.props.eq.frequency} 
                        onChange={this.onChangeFrequency} 
                    />
                </Grid>
            </Grid>
        );
    }

    private onChangeFrequency(value: Frequency2) {
        this.props.changeEffects({ filters: { filter2: { eq: { frequency: value } } } });
    }
}
