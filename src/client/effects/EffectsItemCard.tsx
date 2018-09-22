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
    onEnabled: (enabled: boolean) => void;
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
            return this.renderActive();
        } else {
            return this.renderInactive();
        }
    }

    private renderActive() {
        return (
            <Card raised={true}>
                <CardHeader
                    avatar={
                        <Avatar>{this.props.avatar}</Avatar>
                    }
                    action={
                        <Switch checked={true} onChange={this.onDeactivate} />
                    }
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
                        <Avatar>{this.props.avatar}</Avatar>
                    }
                    action={
                        <Switch checked={false} onChange={this.onActivate} />
                    }
                    title={this.props.title}
                />
            </Card>
        );
    }

    private onDeactivate() {
        this.props.onEnabled(false);
    }

    private onActivate() {
        this.props.onEnabled(true);
        this.props.selectEffect(this.props.effectName.effectName, this.props.effectName.componentName);
    }
}