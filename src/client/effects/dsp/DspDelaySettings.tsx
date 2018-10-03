import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

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
type DspDelaySettingsState = {};

export class DspDelaySettings extends React.Component<DspDelaySettingsAllProps, DspDelaySettingsState> {

    public constructor(props: DspDelaySettingsAllProps) {
        super(props);
    }
    
    public render() {
        return (
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography variant="subheading">{this.props.label}</Typography>
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
                        min={0}
                        max={100}
                        value={this.props.delay.level} 
                        onChange={this.props.onChangeLevel}
                    />
                </Grid>
            </Grid>
        );
    }
}
