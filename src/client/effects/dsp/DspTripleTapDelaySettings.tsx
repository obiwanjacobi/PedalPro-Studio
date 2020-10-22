import * as React from "react";

import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { DspPercent, DspTempo, DspFrequency, DspTripleDelay } from "../../../model/Dsp";
import { DspTapSettings } from "./DspTapSettings";

type DspTripleTapDelaySettingsProps = {
    tripleTap?: DspTripleDelay;
};
type DspTripleTapDelaySettingsActions = ChangeEffectsEx;
type DspTripleTapDelaySettingsAllProps = DspTripleTapDelaySettingsProps & DspTripleTapDelaySettingsActions;

export class DspTripleTapDelaySettings 
    extends React.Component<DspTripleTapDelaySettingsAllProps> {

    public constructor(props: DspTripleTapDelaySettingsAllProps) {
        super(props);

        this.onChangeTempo = this.onChangeTempo.bind(this);
        this.onChangeFeedback = this.onChangeFeedback.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.onChangeTap1 = this.onChangeTap1.bind(this);
        this.onChangeTap2 = this.onChangeTap2.bind(this);
        this.onChangeTap3 = this.onChangeTap3.bind(this);
    }
    
    public render() {
        if (!this.props.tripleTap) { return null; }

        return (
            <DspTapSettings
                tap={this.props.tripleTap}
                onChangeTempo={this.onChangeTempo}
                onChangeFeedback={this.onChangeFeedback}
                onChangeFilter={this.onChangeFilter}
                onChangeTap1={this.onChangeTap1}
                onChangeTap2={this.onChangeTap2}
                onChangeTap3={this.onChangeTap3}
            />
        );
    }

    private onChangeTempo(value: DspTempo) {
        this.props.changeEffectsEx({ dsp: { tripleDelay: { tempo: value } } });
    }

    private onChangeFeedback(value: DspPercent) {
        this.props.changeEffectsEx({ dsp: { tripleDelay: { feedback: value } } });
    }

    private onChangeFilter(value: DspFrequency) {
        this.props.changeEffectsEx({ dsp: { tripleDelay: { frequency: value  } } });
    }

    private onChangeTap1(value: DspPercent) {
        this.props.changeEffectsEx({ dsp: { tripleDelay: { tap1: value } } });
    }

    private onChangeTap2(value: DspPercent) {
        this.props.changeEffectsEx({ dsp: { tripleDelay: { tap2: value } } });
    }

    private onChangeTap3(value: DspPercent) {
        this.props.changeEffectsEx({ dsp: { tripleDelay: { tap3: value } } });
    }
}
