import * as React from "react";
import { Grid } from "@material-ui/core";

import { ChangeEffects } from "../ChangeEffectsAction";
import { Frequency1, EnvelopeFilter1, EnvelopeFunction } from "../../../model/Filters";
import { Frequency1Slider } from "./Frequency1Slider";
import { PercentSlider } from "../PercentSlider";
import { EnvelopeFunctionOptions } from "./EnvelopeFunctionOptions";
import { Percent } from "../../../model/Types";

type Filter1EnvelopeSettingsProps = {
    envelope: EnvelopeFilter1;
};
type Filter1EnvelopeSettingsActions = ChangeEffects;
type Filter1EnvelopeSettingsAllProps = Filter1EnvelopeSettingsProps & Filter1EnvelopeSettingsActions;
type Filter1EnvelopeSettingsState = {};

export class Filter1EnvelopeSettings 
    extends React.Component<Filter1EnvelopeSettingsAllProps, Filter1EnvelopeSettingsState> {

    public constructor(props: Filter1EnvelopeSettingsAllProps) {
        super(props);
        this.onChangeFrequency = this.onChangeFrequency.bind(this);
        this.onChangeSensitivity = this.onChangeSensitivity.bind(this);
        this.onChangeFunction = this.onChangeFunction.bind(this);
    }
    
    public render(): React.ReactNode {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Frequency1Slider 
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

    private onChangeFrequency(value: Frequency1) {
        this.props.changeEffects({ filters: { filter1: { envelope: { frequency: value } } } });
    }

    private onChangeSensitivity(value: Percent) {
        this.props.changeEffects({ filters: { filter1: { envelope: { sensitivity: value } } } });
    }

    private onChangeFunction(value: EnvelopeFunction) {
        this.props.changeEffects({ filters: { filter1: { envelope: { function: value } } } });
    }
}
