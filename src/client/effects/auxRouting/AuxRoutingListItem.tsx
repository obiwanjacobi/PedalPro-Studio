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
    public constructor(props: AuxRoutingListItemAllProps) {
        super(props);
        this.onEnabled = this.onEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.aux.routing !== AuxRouting.None}
                title="Aux Routing"
                avatar="Aux"
                onEnabled={this.onEnabled}
                effectName={{ effectName: EffectNames.AuxRouting }}
                selectEffect={this.props.selectEffect}
                content={
                    <Typography color="textSecondary">Setting-summary here...</Typography>
                }
            />
        );
    }

    private onEnabled(enabled: boolean) {
        const auxRouting = enabled ? AuxRouting.Mixer : AuxRouting.None;
        this.props.changeEffects({ aux: { routing: auxRouting } });
    }
}