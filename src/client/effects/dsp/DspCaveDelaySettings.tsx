import * as React from "react";
import { Grid } from "@material-ui/core";

import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { 
    DspCaveDelay, CaveDelayDelay1, DspDelayFeedback, DspDelayLevel, DspPassFrequency, 
    DspBalance, CaveDelayDelay2, CaveDelayDelay3, CaveDelayDelay4 
} from "../../../model/Dsp";
import { DspDelaySettings } from "./DspDelaySettings";
import { DspBalanceSlider } from "./DspBalanceSlider";
import { DspPassFrequencySlider } from "./DspPassFrequencySlider";

type DspCaveDelaySettingsProps = {
    caveDelay?: DspCaveDelay;
};
type DspCaveDelaySettingsActions = ChangeEffectsEx;
type DspCaveDelaySettingsAllProps = DspCaveDelaySettingsProps & DspCaveDelaySettingsActions;
type DspCaveDelaySettingsState = {};

export class DspCaveDelaySettings 
    extends React.Component<DspCaveDelaySettingsAllProps, DspCaveDelaySettingsState> {

    public constructor(props: DspCaveDelaySettingsAllProps) {
        super(props);

        this.onChangeDelay1 = this.onChangeDelay1.bind(this);
        this.onChangeFeedback1 = this.onChangeFeedback1.bind(this);
        this.onChangeLevel1 = this.onChangeLevel1.bind(this);
        this.onChangeFilter1 = this.onChangeFilter1.bind(this);
        
        this.onChangeDelay2 = this.onChangeDelay2.bind(this);
        this.onChangeFeedback2 = this.onChangeFeedback2.bind(this);
        this.onChangeLevel2 = this.onChangeLevel2.bind(this);
        this.onChangeFilter2 = this.onChangeFilter2.bind(this);

        this.onChangeDelay3 = this.onChangeDelay3.bind(this);
        this.onChangeFeedback3 = this.onChangeFeedback3.bind(this);
        this.onChangeLevel3 = this.onChangeLevel3.bind(this);

        this.onChangeDelay4 = this.onChangeDelay4.bind(this);
        this.onChangeFeedback4 = this.onChangeFeedback4.bind(this);
        this.onChangeLevel4 = this.onChangeLevel4.bind(this);

        this.onChangeFilterL = this.onChangeFilterL.bind(this);
        this.onChangeFilterR = this.onChangeFilterR.bind(this);
        this.onChangeLeft = this.onChangeLeft.bind(this);
        this.onChangeRight = this.onChangeRight.bind(this);
    }
    
    public render() {
        if (!this.props.caveDelay) { return null; }

        return (
            <Grid container={true} direction="column" spacing={8}>
                <Grid item={true} xs={12}>
                    <DspDelaySettings 
                        label="Left Delay (1)"
                        delayMin={10} 
                        delayMax={80}
                        delay={this.props.caveDelay.delay1} 
                        filter={this.props.caveDelay.frequency1}
                        onChangeDelay={this.onChangeDelay1}
                        onChangeFeedback={this.onChangeFeedback1}
                        onChangeLevel={this.onChangeLevel1}
                        onChangeFilter={this.onChangeFilter1}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <DspDelaySettings 
                        label="Left 2nd Delay (3) - Right Feedback"
                        delayMin={50} 
                        delayMax={240}
                        delay={this.props.caveDelay.delay3} 
                        onChangeDelay={this.onChangeDelay3}
                        onChangeFeedback={this.onChangeFeedback3}
                        onChangeLevel={this.onChangeLevel3}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <DspDelaySettings 
                        label="Right Delay (2)"
                        delayMin={10} 
                        delayMax={160}
                        delay={this.props.caveDelay.delay2} 
                        filter={this.props.caveDelay.frequency2}
                        onChangeDelay={this.onChangeDelay2}
                        onChangeFeedback={this.onChangeFeedback2}
                        onChangeLevel={this.onChangeLevel2}
                        onChangeFilter={this.onChangeFilter2}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <DspDelaySettings 
                        label="Right 2nd Delay (4) - Left Feedback"
                        delayMin={50} 
                        delayMax={320}
                        delay={this.props.caveDelay.delay4} 
                        onChangeDelay={this.onChangeDelay4}
                        onChangeFeedback={this.onChangeFeedback4}
                        onChangeLevel={this.onChangeLevel4}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <DspPassFrequencySlider
                        label="Filter Left"
                        value={this.props.caveDelay.frequencyL} 
                        onChange={this.onChangeFilterL}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <DspPassFrequencySlider
                        label="Filter Right"
                        value={this.props.caveDelay.frequencyR} 
                        onChange={this.onChangeFilterR}
                    />
                </Grid>
                
                <Grid item={true} xs={12}>
                    <DspBalanceSlider 
                        maxLabel="Left" 
                        minLabel="Right"
                        value={this.props.caveDelay.outL} 
                        onChange={this.onChangeLeft}
                    />
                </Grid>
                <Grid item={true} xs={12}>
                    <DspBalanceSlider 
                        maxLabel="Right" 
                        minLabel="Left"
                        value={this.props.caveDelay.outR} 
                        onChange={this.onChangeRight}
                    />
                </Grid>
            </Grid>
        );
    }

    private onChangeDelay1(value: CaveDelayDelay1) {
        this.props.changeEffectsEx({ dsp: { caveDelay: { delay1: { delay: value } } } });
    }

    private onChangeFeedback1(value: DspDelayFeedback) {
        this.props.changeEffectsEx({ dsp: { caveDelay: { delay1: { feedback: value } } } });
    }

    private onChangeLevel1(value: DspDelayLevel) {
        this.props.changeEffectsEx({ dsp: { caveDelay: { delay1: { level: value } } } });
    }

    private onChangeFilter1(value: DspPassFrequency) {
        this.props.changeEffectsEx({ dsp: { caveDelay: { frequency1: value  } } });
    }

    private onChangeDelay2(value: CaveDelayDelay2) {
        this.props.changeEffectsEx({ dsp: { caveDelay: { delay2: { delay: value } } } });
    }

    private onChangeFeedback2(value: DspDelayFeedback) {
        this.props.changeEffectsEx({ dsp: { caveDelay: { delay2: { feedback: value } } } });
    }

    private onChangeLevel2(value: DspDelayLevel) {
        this.props.changeEffectsEx({ dsp: { caveDelay: { delay2: { level: value } } } });
    }

    private onChangeFilter2(value: DspPassFrequency) {
        this.props.changeEffectsEx({ dsp: { caveDelay: { frequency2: value  } } });
    }

    private onChangeDelay3(value: CaveDelayDelay3) {
        this.props.changeEffectsEx({ dsp: { caveDelay: { delay3: { delay: value } } } });
    }

    private onChangeFeedback3(value: DspDelayFeedback) {
        this.props.changeEffectsEx({ dsp: { caveDelay: { delay3: { feedback: value } } } });
    }

    private onChangeLevel3(value: DspDelayLevel) {
        this.props.changeEffectsEx({ dsp: { caveDelay: { delay3: { level: value } } } });
    }

    private onChangeDelay4(value: CaveDelayDelay4) {
        this.props.changeEffectsEx({ dsp: { caveDelay: { delay4: { delay: value } } } });
    }

    private onChangeFeedback4(value: DspDelayFeedback) {
        this.props.changeEffectsEx({ dsp: { caveDelay: { delay4: { feedback: value } } } });
    }

    private onChangeLevel4(value: DspDelayLevel) {
        this.props.changeEffectsEx({ dsp: { caveDelay: { delay4: { level: value } } } });
    }
    
    private onChangeFilterL(value: DspPassFrequency) {
        this.props.changeEffectsEx({ dsp: { caveDelay: { frequencyL: value } } });
    }

    private onChangeFilterR(value: DspPassFrequency) {
        this.props.changeEffectsEx({ dsp: { caveDelay: { frequencyR: value } } });
    }

    private onChangeLeft(value: DspBalance) {
        this.props.changeEffectsEx({ dsp: { caveDelay: { outL: value } } });
    }

    private onChangeRight(value: DspBalance) {
        this.props.changeEffectsEx({ dsp: { caveDelay: { outR: value } } });
    }
}
