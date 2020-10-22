import * as React from "react";
import { Switch, Typography, Grid } from "@material-ui/core";

type ToggleSwitchProps = {
    checked: boolean;
    label: string;
    unit?: string;
};
type ToggleSwitchEvents = {
    onChange: (checked: boolean) => void;
};
type ToggleSwitchAllProps = ToggleSwitchProps & ToggleSwitchEvents;

export class ToggleSwitch extends React.Component<ToggleSwitchAllProps> {
    constructor(props: ToggleSwitchAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    
    public render() {
        return (
            <Grid container={true} direction="row" alignItems="center">
                <Typography variant="body2">{this.props.label}</Typography>
                <Switch checked={this.props.checked} onChange={this.onChange} />
                {this.props.unit &&
                    <Typography variant="body2">{this.props.unit}</Typography>}
            </Grid>
        );
    }

    private onChange(_: React.ChangeEvent<HTMLInputElement>, checked: boolean): void {
        this.props.onChange(checked);
    }
}