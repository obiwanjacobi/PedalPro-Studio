import * as React from "react";
import { Slider } from "@material-ui/lab";

import { numberToString } from "../../../StringExtensions";
import { SettingsValueLayout } from "../SettingsValueLayout";
import { DspPassFrequency } from "../../../model/Dsp";
import { DspConvert } from "../../../server/pedalpro/extended/DspConvert";

type DspPassFrequencySliderProps = {
    value: DspPassFrequency;
    label: string;
};
type DspPassFrequencySliderEvents = {
    onChange: (value: DspPassFrequency) => void;
};
type DspPassFrequencySliderAllProps = DspPassFrequencySliderProps & DspPassFrequencySliderEvents;

export class DspPassFrequencySlider 
    extends React.Component<DspPassFrequencySliderAllProps> {
    public constructor(props: DspPassFrequencySliderAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    
    public render() {
        return (
            <SettingsValueLayout
                formattedValue={this.formattedValue}
                unit={"Hz"}
                label={this.props.label}
                control={
                    <Slider 
                        value={DspConvert.fromFrequency(this.props.value)} 
                        min={0}
                        max={DspConvert.frequencyValueSteps} 
                        step={1}
                        onChange={this.onChange}
                        style={{width: "auto"}}
                    />
                }
            />
        );
    }

    private get formattedValue(): string {
        return numberToString(this.props.value, 1, 0);
    }

    private onChange(_: React.ChangeEvent<{}>, value: number): void {
        this.props.onChange(DspConvert.toFrequency(value));
    }
}