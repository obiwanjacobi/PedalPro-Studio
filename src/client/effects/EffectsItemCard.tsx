import * as React from "react";
import { Card, CardHeader, CardContent, Avatar, Switch } from "@material-ui/core";
import { EffectComponentName } from "./EffectsState";
import { SelectEffect } from "./SelectEffectAction";
import { EffectNames } from "./Effects";

type EffectsItemCardProps = {
    enabled: boolean;
    selected: boolean;
    title: string;
    avatar: string;
    content?: React.ReactNode;
    effectName?: EffectComponentName;
};
type EffectItemCardActions = Partial<SelectEffect>;
type EffectsItemCardEvents = {
    onEnabled?: (enabled: boolean) => void;
};
type EffectsItemCardAllProps = EffectsItemCardProps & EffectsItemCardEvents & EffectItemCardActions;
type EffectsItemCardState = {};

export class EffectsItemCard extends React.Component<EffectsItemCardAllProps, EffectsItemCardState> {
    public constructor(props: EffectsItemCardAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSelectEffect = this.onSelectEffect.bind(this);
    }

    public render() {
        return (
            <Card raised={this.props.enabled} onClick={this.onSelectEffect}>
                <CardHeader
                    avatar={this.props.selected ? <Avatar style={{background: "orange"}}>{this.props.avatar}</Avatar> :
                        <Avatar>{this.props.avatar}</Avatar>}
                    action={this.props.onEnabled && 
                        <Switch checked={this.props.enabled} onChange={this.onChange} />}
                    title={this.props.title}
                />
                {this.showContent &&
                    <CardContent>{this.props.content}</CardContent>}
            </Card>
        );
    }

    private get showContent(): boolean {
        return (this.props.enabled && !!this.props.content) || !this.props.onEnabled;
    }

    private onSelectEffect() {
        if (!this.props.content && this.props.enabled) {
            this.selectEffect(true);
        }
    }

    private onChange(_: React.ChangeEvent<HTMLInputElement>, enabled: boolean) {
        if (this.props.onEnabled) {
            this.props.onEnabled(enabled);
        }
        this.selectEffect(enabled);
    }

    private selectEffect(enabled: boolean) {
        if (this.props.selectEffect && this.props.effectName) { 
            if (enabled) {
                this.props.selectEffect(this.props.effectName.effectName, this.props.effectName.componentName);
            } else {
                this.props.selectEffect(EffectNames.None);
            }
        }
    }
}