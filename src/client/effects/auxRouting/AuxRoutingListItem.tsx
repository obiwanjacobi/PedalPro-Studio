import * as React from "react";
import { List, ListItem, ListItemText, ListItemSecondaryAction, Switch } from "@material-ui/core";

import { Aux, AuxRoutingComponentNames } from "./AuxRouting";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { AuxRouting } from "../../../model/AuxRouting";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";

type AuxRoutingListItemProps = {
    aux: Aux;
};
type AuxRoutingListItemActions = ChangeEffectsEx & SelectEffect;
type AuxRoutingListItemAllProps = AuxRoutingListItemProps & AuxRoutingListItemActions;
type AuxRoutingListItemState = {};

export class AuxRoutingListItem extends React.Component<AuxRoutingListItemAllProps, AuxRoutingListItemState> {
    public constructor(props: AuxRoutingListItemAllProps) {
        super(props);
        this.onChangeMixer = this.onChangeMixer.bind(this);
        this.onChangePedals = this.onChangePedals.bind(this);
        this.onMixer = this.onMixer.bind(this);
        this.onPedals = this.onPedals.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.aux.routing !== AuxRouting.None}
                selected={this.props.aux.ui.selected}
                title="Aux Routing"
                avatar="Aux"
                content={this.renderActionList()}
            />
        );
    }

    private renderActionList(): React.ReactNode {
        return (
            <List>
                <ListItem button={this.isPedals} onClick={this.onPedals}>
                    <ListItemText>Pedals</ListItemText>
                    <ListItemSecondaryAction>
                        <Switch checked={this.isPedals} onChange={this.onChangePedals}/>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button={this.isMixer} onClick={this.onMixer}>
                    <ListItemText>Rack</ListItemText>
                    <ListItemSecondaryAction>
                        <Switch checked={this.isMixer} onChange={this.onChangeMixer}/>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        );
    }

    private get isPedals(): boolean {
        return this.props.aux.routing === AuxRouting.LeftOnly ||
            this.props.aux.routing === AuxRouting.RightOnly ||
            this.props.aux.routing === AuxRouting.SeriesLeft;
    }
    
    private onPedals() {
        if (this.isPedals) {
            this.selectEffect(true, AuxRoutingComponentNames.Pedals);
        }
    }

    private onChangePedals(_: React.ChangeEvent<HTMLInputElement>, enabled: boolean) {
        const auxRouting = enabled ? AuxRouting.LeftOnly : AuxRouting.None;
        this.props.changeEffectsEx({ aux: { routing: auxRouting } });
        this.selectEffect(enabled, AuxRoutingComponentNames.Pedals);
    }

    private get isMixer(): boolean {
        return this.props.aux.routing === AuxRouting.Mixer;
    }
    private onMixer() {
        if (this.props.aux.routing === AuxRouting.Mixer) {
            this.selectEffect(true, AuxRoutingComponentNames.Mixer);
        }
    }

    private onChangeMixer(_: React.ChangeEvent<HTMLInputElement>, enabled: boolean) {
        const auxRouting = enabled ? AuxRouting.Mixer : AuxRouting.None;
        this.props.changeEffectsEx({ aux: { routing: auxRouting } });
        this.selectEffect(enabled, AuxRoutingComponentNames.Mixer);
    }

    private selectEffect(enabled: boolean, componentName: AuxRoutingComponentNames) {
        if (enabled) {
            this.props.selectEffect(EffectNames.AuxRouting, componentName);
        } else {
            this.props.selectEffect(EffectNames.None);
        }
    }
}