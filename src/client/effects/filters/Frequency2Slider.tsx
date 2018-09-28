import * as React from "react";
import { Slider } from "@material-ui/lab";
import { SettingsValueLayout } from "../SettingsValueLayout";
import { numberToString } from "../../../StringExtensions";
import { Frequency2 } from "../../../model/Filters";

type Frequency2SliderProps = {
    frequency: Frequency2;
    label?: string;
};
type Frequency2SliderEvents = {
    onChange: (value: Frequency2) => void;
};
type Frequency2SliderAllProps = Frequency2SliderProps & Frequency2SliderEvents;
type Frequency2SliderState = {};
export class Frequency2Slider 
    extends React.Component<Frequency2SliderAllProps, Frequency2SliderState> {

    public constructor(props: Frequency2SliderAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <SettingsValueLayout
                formattedValue={this.formattedValue}
                label={this.props.label || "Frequency"}
                unit="Hz"
                control={
                    <Slider 
                        value={this.props.frequency} 
                        min={150} 
                        max={2697} 
                        step={1}
                        onChange={this.onChange}
                    />}
            />        
        );
    }

    private get formattedValue(): string {
    return numberToString(this.props.frequency, 1, 0);
    }

    private onChange(_: React.ChangeEvent<{}>, value: number) {
        this.props.onChange(value);
    }
}