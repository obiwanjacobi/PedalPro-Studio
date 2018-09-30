import * as React from "react";
import { Slider } from "@material-ui/lab";
import { SettingsValueLayout } from "../SettingsValueLayout";
import { numberToString } from "../../../StringExtensions";
import { RelativeDelay, DelayRange } from "../../../model/Delay";
import { Convert } from "../../../server/pedalpro/Convert";

type DelayRelativeTimeSliderProps = {
    range: DelayRange;    
    time: RelativeDelay;
};
type DelayRelativeTimeSliderEvents = {
    onChange: (value: RelativeDelay) => void;
};
type DelayRelativeTimeSliderAllProps = DelayRelativeTimeSliderProps & DelayRelativeTimeSliderEvents;
type DelayRelativeTimeSliderState = {};
export class DelayRelativeTimeSlider 
    extends React.Component<DelayRelativeTimeSliderAllProps, DelayRelativeTimeSliderState> {

    public constructor(props: DelayRelativeTimeSliderAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return (
            <SettingsValueLayout
                formattedValue={this.formattedValue}
                label="Delay Time"
                unit="ms"
                control={<Slider value={this.value} min={0} max={255} step={1} onChange={this.onChange} />}
            />
        );
    }

    private get value(): number {
        switch (this.props.range) {
            default:
            case DelayRange.Short:
                return Convert.fromTimeShort(this.props.time);

            case DelayRange.Medium:
                return Convert.fromTimeMedium(this.props.time);

            case DelayRange.Long:
                return Convert.fromTimeLong(this.props.time);
        }
    }

    private get formattedValue(): string {
        return numberToString(this.props.time, 1, 1);
    }

    private onChange(_: React.ChangeEvent<{}>, value: number) {
        this.props.onChange(this.convertToTime(value));
    }

    private convertToTime(byteValue: number): RelativeDelay {
        switch (this.props.range) {
            default:
            case DelayRange.Short:
                return Convert.toTimeShort(byteValue);

            case DelayRange.Medium:
                return Convert.toTimeMedium(byteValue);

            case DelayRange.Long:
                return Convert.toTimeLong(byteValue);
        }
    }
}