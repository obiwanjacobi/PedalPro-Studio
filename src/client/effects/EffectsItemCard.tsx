import * as React from "react";
import { Card, CardHeader, CardContent, Avatar, Switch } from "@material-ui/core";
import { EffectComponentName } from "./EffectsState";
import { SelectEffect } from "./SelectEffectAction";

type EffectsItemCardProps = {
    enabled: boolean;
    title: string;
    avatar: string;
    content: React.ReactNode;
    effectName: EffectComponentName;
};
type EffectItemCardActions = SelectEffect;
type EffectsItemCardEvents = {
    onEnabled?: (enabled: boolean) => void;
};
type EffectsItemCardAllProps = EffectsItemCardProps & EffectsItemCardEvents & EffectItemCardActions;
type EffectsItemCardState = {};

export class EffectsItemCard extends React.Component<EffectsItemCardAllProps, EffectsItemCardState> {
    public constructor(props: EffectsItemCardAllProps) {
        super(props);
        this.onActivate = this.onActivate.bind(this);
        this.onDeactivate = this.onDeactivate.bind(this);
    }

    public render() {
        if (this.props.enabled) {
            if (this.props.onEnabled) {
                return this.renderActiveSwitch();
            } else {
                return this.renderActive();
            }
        } else if (this.props.onEnabled) {
            return this.renderInactive();
        } else {
            return this.renderInactiveContent();
        }
    }

    private renderActiveSwitch() {
        return (
            <Card raised={true}>
                <CardHeader
                    avatar={<Avatar>{this.props.avatar}</Avatar>}
                    action={<Switch checked={true} onChange={this.onDeactivate} />}
                    title={this.props.title}
                />
                <CardContent>
                    {this.props.content}
                </CardContent>
            </Card>
        );
    }

    private renderInactive() {

        return (
            <Card raised={false}>
                <CardHeader
                    avatar={
                        <Avatar>{this.props.avatar}</Avatar>}
                    action={
                        <Switch checked={false} onChange={this.onActivate} />}
                    title={this.props.title}
                />
            </Card>
        );
    }

    private renderActive() {
        return (
            <Card raised={true}>
                <CardHeader
                    avatar={<Avatar>{this.props.avatar}</Avatar>}
                    title={this.props.title}
                />
                <CardContent>
                    {this.props.content}
                </CardContent>
            </Card>
        );
    }

    private renderInactiveContent() {

        return (
            <Card raised={false}>
                <CardHeader
                    avatar={<Avatar>{this.props.avatar}</Avatar>}
                    title={this.props.title}
                />
                <CardContent>
                    {this.props.content}
                </CardContent>
            </Card>
        );
    }

    private onDeactivate() {
        if (this.props.onEnabled) {
            this.props.onEnabled(false);
        }
    }

    private onActivate() {
        if (this.props.onEnabled) {
            this.props.onEnabled(true);
        }
        this.props.selectEffect(this.props.effectName.effectName, this.props.effectName.componentName);
    }
}