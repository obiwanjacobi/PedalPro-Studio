import * as React from "react";
import { Slider } from "@material-ui/lab";

import { numberToString } from "../../../StringExtensions";
import { SettingsValueLayout } from "../SettingsValueLayout";
import { DspBalance } from "../../../model/Dsp";

type DspBalanceSliderProps = {
    value: DspBalance;
    maxLabel: string;
    minLabel: string;
};
type DspBalanceSliderEvents = {
    onChange: (value: DspBalance) => void;
};
type DspBalanceSliderAllProps = DspBalanceSliderProps & DspBalanceSliderEvents;
type DspBalanceSliderState = {};

export class DspBalanceSlider extends React.Component<DspBalanceSliderAllProps, DspBalanceSliderState> {
    constructor(props: DspBalanceSliderAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    
    public render() {
        return (
            <SettingsValueLayout
                formattedValue={this.formattedValue}
                unit={""}
                label={this.props.maxLabel}
                control={
                    <Slider 
                        value={this.props.value} 
                        min={-50}
                        max={50} 
                        step={1}
                        onChange={this.onChange}
                        style={{width: "auto"}}
                    />
                }
            />
        );
    }

    private get formattedValue(): string {
        if (this.props.value <= -50) { return this.props.minLabel; }
        if (this.props.value >= 50) { return this.props.maxLabel; }
        return numberToString(this.props.value, 1, 0);
    }

    private onChange(_: React.ChangeEvent<{}>, value: number): void {
        this.props.onChange(value);
    }
}