import * as React from "react";

import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { Grid, Typography } from "@material-ui/core";
import { Filter1, ResonanceFilter1, FilterMode } from "../../../model/Filters";
import { FilterResonanceSlider } from "./FilterResonanceSlider";
import { FilterModeOptions } from "./FilterModeOptions";
import { Filter1AutoSettings } from "./Filter1AutoSettings";
import { Filter1EqualizerSettings } from "./Filter1EqualizerSettings";
import { Filter1EnvelopeSettings } from "./Filter1EnvelopeSettings";

type Filter1SettingsProps = {
    filter: Filter1;
};
type Filter1SettingsActions = ChangeEffectsEx;
type Filter1SettingsAllProps = Filter1SettingsProps & Filter1SettingsActions;
type Filter1SettingsState = {};

export class Filter1Settings extends React.Component<Filter1SettingsAllProps, Filter1SettingsState> {

    public constructor(props: Filter1SettingsAllProps) {
        super(props);
        this.onChangeResonance = this.onChangeResonance.bind(this);
        this.onChangeMode = this.onChangeMode.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Filter 1</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <FilterResonanceSlider resonance={this.props.filter.resonance} onChange={this.onChangeResonance} />
                </Grid>
                <Grid item={true} xs={12}>
                    <FilterModeOptions mode={this.props.filter.mode} onChange={this.onChangeMode} />
                </Grid>
                <Grid item={true} xs={12}>
                    <div style={{paddingTop: "16px"}}>
                        {this.renderModeSettings()}
                    </div>
                </Grid>
            </Grid>
        );
    }

    private renderModeSettings(): React.ReactNode {
        switch (this.props.filter.mode) {
            case FilterMode.Auto:
                return (
                    <Filter1AutoSettings auto={this.props.filter.auto} changeEffectsEx={this.props.changeEffectsEx} />
                );
            case FilterMode.Equalizer:
                return (
                    <Filter1EqualizerSettings eq={this.props.filter.eq} changeEffectsEx={this.props.changeEffectsEx} />
                );
            case FilterMode.EnvelopeNeg:
            case FilterMode.EnvelopePos:
                return (
                    <Filter1EnvelopeSettings 
                        envelope={this.props.filter.envelope} 
                        changeEffectsEx={this.props.changeEffectsEx}
                    />
                );
            default:
                return null;
        }
    }

    private onChangeResonance(value: ResonanceFilter1) {
        this.props.changeEffectsEx({ filters: { filter1: { resonance: value } } });
    }

    private onChangeMode(value: FilterMode) {
        this.props.changeEffectsEx({ filters: { filter1: { mode: value } } });
    }
}
