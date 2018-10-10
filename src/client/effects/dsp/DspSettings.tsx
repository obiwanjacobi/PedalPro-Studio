import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

import { Dsp } from "./Dsp";
import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { Percent } from "../../../model/Types";
import { PercentSlider } from "../PercentSlider";
import { DspTypeOptions } from "./DspTypeOptions";
import { DspType } from "../../../model/Dsp";
import { DspDoubleDelaySettings } from "./DspDoubleDelaySettings";
import { DspCaveDelaySettings } from "./DspCaveDelaySettings";
import { DspSingleTapDelaySettings } from "./DspSingleTapDelaySettings";
import { DspTripleTapDelaySettings } from "./DspTripleTapDelaySettings";
import { DspFourTapDelaySettings } from "./DspFourTapDelaySettings";
import { DspPlateSettings } from "./DspPlateSettings";
import { DspCustomSpringSettings } from "./DspCustomSpringSettings";
import { DspHallSettings } from "./DspHallSettings";
import { DspFreeVerbSettings } from "./DspFreeVerbSettings";

type DspSettingsProps = {
    dsp: Dsp;
};
type DspSettingsActions = ChangeEffectsEx;
type DspSettingsAllProps = DspSettingsProps & DspSettingsActions;

export class DspSettings extends React.Component<DspSettingsAllProps> {

    public constructor(props: DspSettingsAllProps) {
        super(props);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeDry = this.onChangeDry.bind(this);
        this.onChangeWet = this.onChangeWet.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true} spacing={8}>
                <Grid item={true} xs={12}>
                    <Typography variant="headline">Digital Delay &amp; Reverb</Typography>
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
                return (
                    <DspCaveDelaySettings
                        caveDelay={this.props.dsp.caveDelay} 
                        changeEffectsEx={this.props.changeEffectsEx}
                    />
                );
            case DspType.SingleTap:
                return (
                    <DspSingleTapDelaySettings
                        singleTap={this.props.dsp.singleTap} 
                        changeEffectsEx={this.props.changeEffectsEx}
                    />
                );
            case DspType.FourTapsDelay:
                return (
                    <DspFourTapDelaySettings
                        fourTap={this.props.dsp.fourTapsDelay} 
                        changeEffectsEx={this.props.changeEffectsEx}
                    />
                );
            case DspType.TripleDelay:
                return (
                    <DspTripleTapDelaySettings
                        tripleTap={this.props.dsp.tripleDelay} 
                        changeEffectsEx={this.props.changeEffectsEx}
                    />
                );
            case DspType.Plate:
                return (
                    <DspPlateSettings
                        plate={this.props.dsp.plate} 
                        changeEffectsEx={this.props.changeEffectsEx}
                    />
                );
            case DspType.CustomSpring:
                return (
                    <DspCustomSpringSettings
                        customSpring={this.props.dsp.customSpring} 
                        changeEffectsEx={this.props.changeEffectsEx}
                    />
                );
            case DspType.Hall:
                return (
                    <DspHallSettings
                        hall={this.props.dsp.hall} 
                        changeEffectsEx={this.props.changeEffectsEx}
                    />
                );
            case DspType.FreeVerb:
                return (
                    <DspFreeVerbSettings
                        freeVerb={this.props.dsp.freeVerb} 
                        changeEffectsEx={this.props.changeEffectsEx}
                    />
                );
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
