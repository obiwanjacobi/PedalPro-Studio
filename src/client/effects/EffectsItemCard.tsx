import * as React from "react";
import { Card, CardHeader, CardContent, Avatar, Switch } from "@material-ui/core";

type EffectsItemCardProps = {
    enabled: boolean;
    title: string;
    avatar: string;
    content: React.ReactNode;
};
type EffectsItemCardEvents = {
    onEnabled: () => void;
};
type EffectsItemCardAllProps = EffectsItemCardProps & EffectsItemCardEvents;
type EffectsItemCardState = {};

export class EffectsItemCard extends React.Component<EffectsItemCardAllProps, EffectsItemCardState> {
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
                        <Switch checked={true} onChange={this.props.onEnabled} />
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
                        <Switch checked={false} onChange={this.props.onEnabled} />
                    }
                    title={this.props.title}
                />
            </Card>
        );
    }
}