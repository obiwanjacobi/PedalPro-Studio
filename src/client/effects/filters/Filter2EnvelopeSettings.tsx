import * as React from "react";
import { Grid } from "@material-ui/core";

import { ChangeEffects } from "../ChangeEffectsAction";
import { Frequency2, EnvelopeFilter2, EnvelopeFunction } from "../../../model/Filters";
import { Frequency2Slider } from "./Frequency2Slider";
import { PercentSlider } from "../PercentSlider";
import { EnvelopeFunctionOptions } from "./EnvelopeFunctionOptions";
import { Percent } from "../../../model/Types";

type Filter2EnvelopeSettingsProps = {
    envelope: EnvelopeFilter2;
};
type Filter2EnvelopeSettingsActions = ChangeEffects;
type Filter2EnvelopeSettingsAllProps = Filter2EnvelopeSettingsProps & Filter2EnvelopeSettingsActions;
type Filter2EnvelopeSettingsState = {};

export class Filter2EnvelopeSettings 
    extends React.Component<Filter2EnvelopeSettingsAllProps, Filter2EnvelopeSettingsState> {

    public constructor(props: Filter2EnvelopeSettingsAllProps) {
        super(props);
        this.onChangeFrequency = this.onChangeFrequency.bind(this);
        this.onChangeSensitivity = this.onChangeSensitivity.bind(this);
        this.onChangeFunction = this.onChangeFunction.bind(this);
    }
    
    public render(): React.ReactNode {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Frequency2Slider 
                        label="Frequency" 
                        frequency={this.props.envelope.frequency} 
                        onChange={this.onChangeFrequency} 
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <PercentSlider
                        label="Sensitivity" 
                        value={this.props.envelope.sensitivity} 
                        onChange={this.onChangeSensitivity} 
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <EnvelopeFunctionOptions function={this.props.envelope.function} onChange={this.onChangeFunction} />
                </Grid>
            </Grid>
        );
    }

    private onChangeFrequency(value: Frequency2) {
        this.props.changeEffects({ filters: { filter2: { envelope: { frequency: value } } } });
    }

    private onChangeSensitivity(value: Percent) {
        this.props.changeEffects({ filters: { filter2: { envelope: { sensitivity: value } } } });
    }

    private onChangeFunction(value: EnvelopeFunction) {
        this.props.changeEffects({ filters: { filter1: { envelope: { function: value } } } });
    }
}
