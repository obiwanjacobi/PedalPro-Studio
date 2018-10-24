import * as React from "react";

import { Boost } from "./Boost";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";
import { effectEqual } from "../EffectsOperations";

type BoostListItemProps = {
    boost: Boost;
    origin: Boost;
};
type BoostListItemActions = ChangeEffects & SelectEffect;
type BoostListItemAllProps = BoostListItemProps & BoostListItemActions;

export class BoostListItem extends React.Component<BoostListItemAllProps> {
    public constructor(props: BoostListItemAllProps) {
        super(props);
        this.onEnabled = this.onEnabled.bind(this);
    }

    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.boost.enabled}
                selected={this.props.boost.ui.selected}
                changed={!effectEqual(this.props.boost, this.props.origin)}
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