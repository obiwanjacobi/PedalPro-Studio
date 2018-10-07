import * as React from "react";

import { Boost } from "./Boost";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";

type BoostListItemProps = {
    boost: Boost;
};
type BoostListItemActions = ChangeEffectsEx & SelectEffect;
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
                selected={this.props.boost.ui.selected}
                title="Boost"
                avatar="Bst"
                onEnabled={this.onEnabled}
                effectName={{ effectName: EffectNames.Boost }}
                selectEffect={this.props.selectEffect}
            />
        );
    }
    
    private onEnabled(enabled: boolean) {
        this.props.changeEffectsEx({ boost: { enabled: enabled } });
    }
}