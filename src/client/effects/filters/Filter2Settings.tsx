import * as React from "react";

import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { Grid, Typography } from "@material-ui/core";
import { Filter2, ResonanceFilter1, FilterMode, Filter2Type } from "../../../model/Filters";
import { FilterResonanceSlider } from "./FilterResonanceSlider";
import { FilterModeOptions } from "./FilterModeOptions";
import { Filter2AutoSettings } from "./Filter2AutoSettings";
import { Filter2EqualizerSettings } from "./Filter2EqualizerSettings";
import { Filter2EnvelopeSettings } from "./Filter2EnvelopeSettings";
import { Filter2TypeOptions } from "./Filter2TypeOptions";

type Filter2SettingsProps = {
    filter: Filter2;
};
type Filter2SettingsActions = ChangeEffectsEx;
type Filter2SettingsAllProps = Filter2SettingsProps & Filter2SettingsActions;
type Filter2SettingsState = {};

export class Filter2Settings extends React.Component<Filter2SettingsAllProps, Filter2SettingsState> {

    public constructor(props: Filter2SettingsAllProps) {
        super(props);
        this.onChangeResonance = this.onChangeResonance.bind(this);
        this.onChangeMode = this.onChangeMode.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Filter 2</Typography>
                </Grid>
                <Grid item={true} xs={12}>
                    <Filter2TypeOptions type={this.props.filter.type} onChange={this.onChangeType} />
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
                    <Filter2AutoSettings auto={this.props.filter.auto} changeEffectsEx={this.props.changeEffectsEx} />
                );
            case FilterMode.Equalizer:
                return (
                    <Filter2EqualizerSettings eq={this.props.filter.eq} changeEffectsEx={this.props.changeEffectsEx} />
                );
            case FilterMode.EnvelopeNeg:
            case FilterMode.EnvelopePos:
                return (
                    <Filter2EnvelopeSettings 
                        envelope={this.props.filter.envelope} 
                        changeEffectsEx={this.props.changeEffectsEx}
                    />
                );
            default:
                return null;
        }
    }

    private onChangeResonance(value: ResonanceFilter1) {
        this.props.changeEffectsEx({ filters: { filter2: { resonance: value } } });
    }

    private onChangeMode(value: FilterMode) {
        this.props.changeEffectsEx({ filters: { filter2: { mode: value } } });
    }

    private onChangeType(value: Filter2Type) {
        this.props.changeEffectsEx({ filters: { filter2: { type: value } } });
    }
}
