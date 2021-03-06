import * as React from "react";
import { Grid, Typography, Paper } from "@material-ui/core";

import { 
    DspDelay, DspDelayFeedback, DspDelayLevel,
    DoubleDelayDelay, DoubleDelayDelay3, DoubleDelayDelay4, 
    CaveDelayDelay4, CaveDelayDelay3, CaveDelayDelay2, CaveDelayDelay1, DspPassFrequency
} from "../../../model/Dsp";
import { DspSlider } from "./DspSlider";
import { DspPassFrequencySlider } from "./DspPassFrequencySlider";

type DspDelayType = DoubleDelayDelay | DoubleDelayDelay3 | DoubleDelayDelay4 |
    CaveDelayDelay1 | CaveDelayDelay2 | CaveDelayDelay3 | CaveDelayDelay4;
interface DspDelayProps extends DspDelay {
    delay: DspDelayType;
}
type DspDelaySettingsProps = {
    label: string;
    delay: DspDelayProps;
    filter?: DspPassFrequency;
    delayMin: number;
    delayMax: number;
};
type DspDelaySettingsEvents = {
    onChangeDelay: (delay: number) => void;
    onChangeFeedback: (feedback: DspDelayFeedback) => void;
    onChangeLevel: (level: DspDelayLevel) => void;
    onChangeFilter?: (frequency: DspPassFrequency) => void;
};
type DspDelaySettingsAllProps = DspDelaySettingsProps & DspDelaySettingsEvents;

export class DspDelaySettings extends React.Component<DspDelaySettingsAllProps> {

    public constructor(props: DspDelaySettingsAllProps) {
        super(props);
    }
    
    public render() {
        return (
            <Paper elevation={8} square={true} style={{padding: "8px"}}>
                <Grid container={true}>
                    <Grid item={true} xs={12}>
                        <Typography variant="subtitle1">{this.props.label}</Typography>
                    </Grid>
                    <Grid item={true} xs={12}>
                        <DspSlider
                            label="Delay" 
                            min={this.props.delayMin}
                            max={this.props.delayMax}
                            value={this.props.delay.delay} 
                            onChange={this.props.onChangeDelay}
                        />
                    </Grid>
                    {this.props.filter && this.props.onChangeFilter &&
                        <Grid item={true} xs={12}>
                            <DspPassFrequencySlider
                                label="Frequency"
                                value={this.props.filter}
                                onChange={this.props.onChangeFilter}
                            />
                        </Grid>}
                    <Grid item={true} xs={12}>
                        <DspSlider
                            label="Feedback" 
                            min={-100}
                            max={100}
                            value={this.props.delay.feedback} 
                            onChange={this.props.onChangeFeedback}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <DspSlider
                            label="Level" 
                            unit="%"
                            min={0}
                            max={100}
                            value={this.props.delay.level} 
                            onChange={this.props.onChangeLevel}
                        />
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}
