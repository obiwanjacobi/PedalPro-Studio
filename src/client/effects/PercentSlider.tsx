import * as React from "react";
import { Slider } from "@material-ui/lab";
import { Typography } from "@material-ui/core";
import { Percent } from "../../model/Types";

type PercentSliderProps = {
    value: Percent;
    label: string;
};
type PercentSliderEvents = {
    onChange: (value: Percent) => void;
};
type PercentSliderAllProps = PercentSliderProps & PercentSliderEvents;
type PercentSliderState = {};

export class PercentSlider extends React.Component<PercentSliderAllProps, PercentSliderState> {
    constructor(props: PercentSliderAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    
    public render() {
        return (
            <div>
                <Typography>{this.props.label}</Typography>
                <Slider 
                    value={this.props.value} 
                    min={0}
                    max={100} 
                    step={1}
                    onChange={this.onChange}
                />
            </div>
        );
    }

    private onChange(_: React.ChangeEvent<{}>, value: number): void {
        this.props.onChange(value);
    }
}