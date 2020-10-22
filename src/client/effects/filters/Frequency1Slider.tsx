import * as React from "react";
import { Slider } from "@material-ui/lab";
import { SettingsValueLayout } from "../SettingsValueLayout";
import { numberToString } from "../../../StringExtensions";
import { Frequency1 } from "../../../model/Filters";

type Frequency1SliderProps = {
    frequency: Frequency1;
    label?: string;
};
type Frequency1SliderEvents = {
    onChange: (value: Frequency1) => void;
};
type Frequency1SliderAllProps = Frequency1SliderProps & Frequency1SliderEvents;

export class Frequency1Slider extends React.Component<Frequency1SliderAllProps> {

    public constructor(props: Frequency1SliderAllProps) {
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
                        min={370} 
                        max={1968} 
                        step={1}
                        onChange={this.onChange}
                        style={{width: "auto"}}
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