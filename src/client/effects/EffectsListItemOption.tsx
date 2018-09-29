import * as React from "react";
import { Typography, ButtonBase, Switch, Grid } from "@material-ui/core";

type EffectsListItemOptionProps = {
    label: string;
    enabledLeft: boolean;
    enabledRight: boolean;
};
type EffectsListItemOptionEvents = {
    onSelect?: () => void;
    onChangeLeft?: (enabled: boolean) => void;
    onChangeRight?: (enabled: boolean) => void;
};
type EffectsListItemOptionAllProps = EffectsListItemOptionProps & EffectsListItemOptionEvents;
type EffectsListItemOptionState = {};

export class EffectsListItemOption
    extends React.Component<EffectsListItemOptionAllProps, EffectsListItemOptionState> {

    public constructor(props: EffectsListItemOptionAllProps) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onChangeLeft = this.onChangeLeft.bind(this);
        this.onChangeRight = this.onChangeRight.bind(this);
    }

    public render() {
        return (
            <Grid container={true} direction="row" alignItems="center" justify="space-between">
                <Grid item={true} xs={3}>
                    {this.props.onChangeLeft &&
                        <Switch checked={this.props.enabledLeft} onChange={this.onChangeLeft} />}
                </Grid>
                <Grid item={true} xs={6}>
                    <ButtonBase 
                        onClick={this.onClick} 
                        disabled={!this.isEnabled}
                    >
                        <Typography style={{paddingLeft: "16px"}}>{this.props.label}</Typography>
                    </ButtonBase>
                </Grid>
                <Grid item={true} xs={3}>
                    {this.props.onChangeRight &&
                        <Switch checked={this.props.enabledRight} onChange={this.onChangeRight} />}
                </Grid>
            </Grid>
        );
    }

    private get isEnabled(): boolean {
        return this.props.enabledLeft || this.props.enabledRight;
    }

    private onClick() {
        if (this.props.onSelect) {
            this.props.onSelect();
        }
    }

    private onChangeLeft(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
        if (this.props.onChangeLeft) {
            this.props.onChangeLeft(checked);
        }
    }

    private onChangeRight(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
        if (this.props.onChangeRight) {
            this.props.onChangeRight(checked);
        }
    }
}