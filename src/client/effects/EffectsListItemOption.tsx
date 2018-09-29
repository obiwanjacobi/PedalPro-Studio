import * as React from "react";
import { Typography, ButtonBase, Switch } from "@material-ui/core";

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
            <div>
                {this.props.onChangeLeft &&
                    <Switch checked={this.props.enabledLeft} onChange={this.onChangeLeft} />}
                <ButtonBase onClick={this.onClick}>
                    <Typography>{this.props.label}</Typography>
                </ButtonBase>
                {this.props.onChangeRight &&
                    <Switch checked={this.props.enabledRight} onChange={this.onChangeRight} />}
            </div>
        );
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