import * as React from "react";
import { Slider } from "@material-ui/lab";

import { TempoSpeed } from "../../model/Types";
import { numberToString } from "../../StringExtensions";
import { SettingsValueLayout } from "./SettingsValueLayout";

type TempoSpeedSliderProps = {
    value: TempoSpeed;
    label?: string;
};
type TempoSpeedSliderEvents = {
    onChange: (value: TempoSpeed) => void;
};
type TempoSpeedSliderAllProps = TempoSpeedSliderProps & TempoSpeedSliderEvents;
type TempoSpeedSliderState = {};

export class TempoSpeedSlider extends React.Component<TempoSpeedSliderAllProps, TempoSpeedSliderState> {
    constructor(props: TempoSpeedSliderAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    
    public render() {
        return (
            <SettingsValueLayout
                formattedValue={this.formattedValue}
                unit="bpm"
                label={this.props.label || "Tempo"}
                control={
                    <Slider 
                        value={this.props.value} 
                        min={3}
                        max={550.0} 
                        step={0.1}
                        onChange={this.onChange}
                        style={{width: "auto"}}
                    />
                }
            />
        );
    }

    private get formattedValue(): string {
        return numberToString(this.props.value, 1, 1);
    }

    private onChange(_: React.ChangeEvent<{}>, value: number): void {
        this.props.onChange(value);
    }
}