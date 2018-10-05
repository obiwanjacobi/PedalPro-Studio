import * as React from "react";
import { Grid, Paper } from "@material-ui/core";

import { DspFrequency, DspFreeVerb, DspVerbSize } from "../../../model/Dsp";
import { DspSlider } from "./DspSlider";
import { ChangeEffectsEx } from "../ChangeEffectsAction";

type DspFreeVerbSettingsProps = {
    freeVerb?: DspFreeVerb;
};
type DspFreeVerbSettingsActions = ChangeEffectsEx;
type DspFreeVerbSettingsAllProps = DspFreeVerbSettingsProps & DspFreeVerbSettingsActions;
type DspFreeVerbSettingsState = {};

export class DspFreeVerbSettings extends React.Component<DspFreeVerbSettingsAllProps, DspFreeVerbSettingsState> {

    public constructor(props: DspFreeVerbSettingsAllProps) {
        super(props);

        this.onChangeSize = this.onChangeSize.bind(this);
        this.onChangeHighPassFilter = this.onChangeHighPassFilter.bind(this);
    }
    
    public render() {
        if (!this.props.freeVerb) { return null; }
        
        return (
            <Paper elevation={8} square={true} style={{padding: "8px"}}>
                <Grid container={true}>
                    <Grid item={true} xs={12}>
                        <DspSlider
                            label="Size" 
                            min={20}
                            max={127}
                            value={this.props.freeVerb.size} 
                            onChange={this.onChangeSize}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <DspSlider
                            label="High-pass Frequency" 
                            min={98}
                            max={20159}
                            value={this.props.freeVerb.hiPassFrequency} 
                            onChange={this.onChangeHighPassFilter}
                        />
                    </Grid>
                </Grid>
            </Paper>
        );
    }

    private onChangeSize(value: DspVerbSize) {
        this.props.changeEffectsEx({ dsp: { freeVerb: { size: value }}});
    }

    private onChangeHighPassFilter(value: DspFrequency) {
        this.props.changeEffectsEx({ dsp: { freeVerb: { hiPassFrequency: value }}});
    }
}
