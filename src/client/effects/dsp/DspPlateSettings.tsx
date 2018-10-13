import * as React from "react";
import { Grid, Paper } from "@material-ui/core";

import { DspFrequency, DspPlate, DspPlateSize } from "../../../model/Dsp";
import { DspSlider } from "./DspSlider";
import { ChangeEffectsEx } from "../ChangeEffectsAction";

type DspPlateSettingsProps = {
    plate?: DspPlate;
};
type DspPlateSettingsActions = ChangeEffectsEx;
type DspPlateSettingsAllProps = DspPlateSettingsProps & DspPlateSettingsActions;

export class DspPlateSettings extends React.Component<DspPlateSettingsAllProps> {

    public constructor(props: DspPlateSettingsAllProps) {
        super(props);

        this.onChangeSize = this.onChangeSize.bind(this);
        this.onChangeLowPassFilter = this.onChangeLowPassFilter.bind(this);
        this.onChangeHighPassFilter = this.onChangeHighPassFilter.bind(this);
    }
    
    public render() {
        if (!this.props.plate) { return null; }
        
        return (
            <Paper elevation={8} square={true} style={{padding: "8px"}}>
                <Grid container={true}>
                    <Grid item={true} xs={12}>
                        <DspSlider
                            label="Plate Size" 
                            min={3}
                            max={127}
                            value={this.props.plate.size} 
                            onChange={this.onChangeSize}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <DspSlider
                            label="Low-pass Frequency"
                            unit="Hz"
                            min={98}
                            max={20159}
                            value={this.props.plate.lowPassFrequency}
                            onChange={this.onChangeLowPassFilter}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <DspSlider
                            label="High-pass Frequency" 
                            unit="Hz"
                            min={98}
                            max={20159}
                            value={this.props.plate.hiPassFrequency} 
                            onChange={this.onChangeHighPassFilter}
                        />
                    </Grid>
                </Grid>
            </Paper>
        );
    }

    private onChangeSize(value: DspPlateSize) {
        this.props.changeEffectsEx({ dsp: { plate: { size: value }}});
    }

    private onChangeLowPassFilter(value: DspFrequency) {
        this.props.changeEffectsEx({ dsp: { plate: { lowPassFrequency: value }}});
    }

    private onChangeHighPassFilter(value: DspFrequency) {
        this.props.changeEffectsEx({ dsp: { plate: { hiPassFrequency: value }}});
    }
}
