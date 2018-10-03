import * as React from "react";

import { Aux, AuxRoutingComponentNames } from "./AuxRouting";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { AuxRouting } from "../../../model/AuxRouting";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";
import { EffectsListItemOption } from "../EffectsListItemOption";

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
                title="Aux Routing"
                avatar="Aux"
                content={this.renderActionList()}
            />
        );
    }

    private renderActionList(): React.ReactNode {
        return (
            <div>
                <EffectsListItemOption
                    label="Pedals"
                    enabledLeft={false}
                    enabledRight={this.isPedals}
                    onChangeRight={this.onChangePedals}
                    onSelect={this.onPedals}
                />
                <EffectsListItemOption
                    label="Rack"
                    enabledLeft={false}
                    enabledRight={this.props.aux.routing === AuxRouting.Mixer}
                    onChangeRight={this.onChangeMixer}
                    onSelect={this.onMixer}
                />
            </div>
        );
    }

    private get isPedals(): boolean {
        return this.props.aux.routing === AuxRouting.LeftOnly ||
            this.props.aux.routing === AuxRouting.RightOnly ||
            this.props.aux.routing === AuxRouting.SeriesLeft;
    }
    
    private onPedals() {
        if (this.isPedals) {
            this.selectEffect(AuxRoutingComponentNames.Pedals);
        }
    }

    private onChangePedals(enabled: boolean) {
        const auxRouting = enabled ? AuxRouting.LeftOnly : AuxRouting.None;
        this.props.changeEffectsEx({ aux: { routing: auxRouting } });
        if (enabled) { this.selectEffect(AuxRoutingComponentNames.Pedals); }
    }

    private onMixer() {
        if (this.props.aux.routing === AuxRouting.Mixer) {
            this.selectEffect(AuxRoutingComponentNames.Mixer);
        }
    }

    private onChangeMixer(enabled: boolean) {
        const auxRouting = enabled ? AuxRouting.Mixer : AuxRouting.None;
        this.props.changeEffectsEx({ aux: { routing: auxRouting } });
        if (enabled) { this.selectEffect(AuxRoutingComponentNames.Mixer); }
    }

    private selectEffect(componentName: AuxRoutingComponentNames) {
        this.props.selectEffect(EffectNames.AuxRouting, componentName);
    }
}