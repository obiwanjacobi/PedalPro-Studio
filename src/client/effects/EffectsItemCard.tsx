import * as React from "react";
import { 
    List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, 
    Card, CardContent, Avatar, Switch 
} from "@material-ui/core";

import { EffectComponentName } from "./EffectsState";
import { SelectEffect } from "./SelectEffectAction";
import { EffectNames } from "./Effects";

type EffectsItemCardProps = {
    enabled: boolean;
    selected: boolean;
    changed: boolean;
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

export class EffectsItemCard extends React.Component<EffectsItemCardAllProps> {
    public constructor(props: EffectsItemCardAllProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSelectEffect = this.onSelectEffect.bind(this);
    }

    public render() {
        return (
            <Card raised={this.props.enabled}>
                <List>
                    <ListItem 
                        selected={this.props.changed}
                        button={this.props.enabled && !this.props.content} 
                        onClick={this.onSelectEffect}
                    >
                        <ListItemAvatar>{this.renderAvatar()}</ListItemAvatar>
                        <ListItemText>{this.props.title}</ListItemText>
                        {this.props.onEnabled && 
                            <ListItemSecondaryAction>
                                <Switch checked={this.props.enabled} onChange={this.onChange} />
                            </ListItemSecondaryAction>}
                    </ListItem>
                </List>
                {this.showContent &&
                    <CardContent style={{paddingTop: "0px", paddingBottom: "0px"}}>
                        {this.props.content}
                    </CardContent>}
            </Card>
        );
    }

    private renderAvatar(): React.ReactNode {
        return (this.props.selected ? <Avatar style={{background: "orange"}}>{this.props.avatar}</Avatar> :
            <Avatar>{this.props.avatar}</Avatar>);
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