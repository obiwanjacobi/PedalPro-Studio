import * as React from "react";

import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { DspPercent, DspSingleTap, DspTempo, DspFrequency } from "../../../model/Dsp";
import { DspTapSettings } from "./DspTapSettings";

type DspSingleTapDelaySettingsProps = {
    singleTap?: DspSingleTap;
};
type DspSingleTapDelaySettingsActions = ChangeEffectsEx;
type DspSingleTapDelaySettingsAllProps = DspSingleTapDelaySettingsProps & DspSingleTapDelaySettingsActions;

export class DspSingleTapDelaySettings 
    extends React.Component<DspSingleTapDelaySettingsAllProps> {

    public constructor(props: DspSingleTapDelaySettingsAllProps) {
        super(props);

        this.onChangeTempo = this.onChangeTempo.bind(this);
        this.onChangeFeedback = this.onChangeFeedback.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
    }
    
    public render() {
        if (!this.props.singleTap) { return null; }

        return (
            <DspTapSettings
                tap={this.props.singleTap}
                onChangeTempo={this.onChangeTempo}
                onChangeFeedback={this.onChangeFeedback}
                onChangeFilter={this.onChangeFilter}
            />
        );
    }

    private onChangeTempo(value: DspTempo) {
        this.props.changeEffectsEx({ dsp: { singleTap: { tempo: value } } });
    }

    private onChangeFeedback(value: DspPercent) {
        this.props.changeEffectsEx({ dsp: { singleTap: { feedback: value } } });
    }

    private onChangeFilter(value: DspFrequency) {
        this.props.changeEffectsEx({ dsp: { singleTap: { frequency: value  } } });
    }
}
