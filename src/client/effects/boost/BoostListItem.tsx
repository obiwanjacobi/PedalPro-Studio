import * as React from "react";

import { Boost } from "./Boost";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";

type BoostListItemProps = {
    boost: Boost;
};
type BoostListItemActions = ChangeEffects & SelectEffect;
type BoostListItemAllProps = BoostListItemProps & BoostListItemActions;
type BoostListItemState = {};

export class BoostListItem extends React.Component<BoostListItemAllProps, BoostListItemState> {
    public constructor(props: BoostListItemAllProps) {
        super(props);
        this.onEnabled = this.onEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.boost.enabled}
                title="Boost"
                avatar="Bst"
                onEnabled={this.onEnabled}
                effectName={{ effectName: EffectNames.Boost }}
                selectEffect={this.props.selectEffect}
            />
        );
    }
    
    private onEnabled(enabled: boolean) {
        this.props.changeEffects({ boost: { enabled: enabled } });
    }
}