import * as React from "react";
import { Slider } from "@material-ui/lab";

import { Percent } from "../../model/Types";
import { numberToString } from "../../StringExtensions";
import { SettingsValueLayout } from "./SettingsValueLayout";

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
            <SettingsValueLayout
                formattedValue={this.formattedValue}
                unit="%"
                label={this.props.label}
                control={
                    <Slider 
                        value={this.props.value} 
                        min={0}
                        max={100.0} 
                        step={0.4}
                        onChange={this.onChange}
                    />
                }
            />

            // <Grid container={true}>
            //     <Grid item={true} xs={12}>
            //         <Typography>{this.props.label}</Typography>
            //     </Grid>
            //     <Grid item={true} xs={12}>
            //     </Grid>
            //     <Grid item={true} xs={10} />
            //     <Grid item={true} xs={1}>
            //         <Typography color="secondary">{this.formattedValue}</Typography>
            //     </Grid>
            //     <Grid item={true} xs={1}>
            //         <Typography>%</Typography>
            //     </Grid>
            // </Grid>
        );
    }

    private get formattedValue(): string {
        return numberToString(this.props.value, 1, 1);
    }

    private onChange(_: React.ChangeEvent<{}>, value: number): void {
        this.props.onChange(value);
    }
}