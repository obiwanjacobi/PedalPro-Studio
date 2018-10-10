import * as React from "react";
import { ListItem, Typography, Switch } from "@material-ui/core";

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
            <ListItem button={this.isEnabled} onClick={this.onClick} style={{padding: 0}}>
                {this.props.onChangeLeft ?
                    <Switch checked={this.props.enabledLeft} onChange={this.onChangeLeft} />
                    : <span style={{width: "62px"}}/>}
                <Typography style={{paddingLeft: "8px"}}>{this.title}</Typography>
                {this.props.onChangeRight ?
                    <Switch checked={this.props.enabledRight} onChange={this.onChangeRight} />
                    : <span style={{width: "62px"}}/>}
            </ListItem>
        );
    }

    private get title(): string {
        if (this.props.onChangeLeft && this.props.enabledLeft) {
            return `${this.props.label} Left`;
        }
        if (this.props.onChangeRight && this.props.enabledRight) {
            return `${this.props.label} Right`;
        }
        return this.props.label;
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