import * as React from "react";
import { Typography } from "@material-ui/core";

import { Aux } from "./AuxRouting";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";
import { AuxRouting } from "../../../model/AuxRouting";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";

type AuxRoutingListItemProps = {
    aux: Aux;
};
type AuxRoutingListItemActions = ChangeEffects & SelectEffect;
type AuxRoutingListItemAllProps = AuxRoutingListItemProps & AuxRoutingListItemActions;
type AuxRoutingListItemState = {};

export class AuxRoutingListItem extends React.Component<AuxRoutingListItemAllProps, AuxRoutingListItemState> {
    constructor(props: AuxRoutingListItemAllProps) {
        super(props);
        this.toggleEnabled = this.toggleEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.aux.routing !== AuxRouting.None}
                title="Aux Routing"
                avatar="Aux"
                onEnabled={this.toggleEnabled}
                effectName={{ effectName: EffectNames.AuxRouting }}
                selectEffect={this.props.selectEffect}
                content={
                    <Typography color="textSecondary">Setting-summary here...</Typography>
                }
            />
        );
    }

    private toggleEnabled() {
        const auxRouting = this.props.aux.routing === AuxRouting.None ? AuxRouting.Mixer : AuxRouting.None;
        const partial: Partial<Aux> = { routing: auxRouting };
        this.props.changeEffects({ aux: partial });
    }
}