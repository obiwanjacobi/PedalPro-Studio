import * as React from "react";
import { Slider } from "@material-ui/lab";

import { numberToString } from "../../../StringExtensions";
import { SettingsValueLayout } from "../SettingsValueLayout";

type DspSliderProps = {
    value: number;
    min: number;
    max: number;
    label: string;
    unit?: string;
};
type DspSliderEvents = {
    onChange: (value: number) => void;
};
type DspSliderAllProps = DspSliderProps & DspSliderEvents;

export class DspSlider extends React.Component<DspSliderAllProps> {
    constructor(props: DspSliderAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    
    public render() {
        return (
            <SettingsValueLayout
                formattedValue={this.formattedValue}
                unit={this.props.unit || ""}
                label={this.props.label}
                control={
                    <Slider 
                        value={this.props.value} 
                        min={this.props.min}
                        max={this.props.max} 
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
        this.props.onChange(value);
    }
}