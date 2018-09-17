import * as React from "react";
import { Typography, Button } from "@material-ui/core";

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
    constructor(props: BoostListItemAllProps) {
        super(props);
        this.selectEffect = this.selectEffect.bind(this);
        this.toggleEnabled = this.toggleEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.boost.enabled}
                title="Boost"
                avatar="Bst"
                onEnabled={this.toggleEnabled}
                content={
                    <Button onClick={this.selectEffect}>
                        <Typography color="textSecondary">Click to select</Typography>
                    </Button>
                }
            />
        );
    }

    private selectEffect() {
        this.props.selectEffect(EffectNames.Boost);
    }

    private toggleEnabled() {
        const partial: Partial<Boost> = { enabled: !this.props.boost.enabled };
        this.props.changeEffects({ boost: partial });
    }
}