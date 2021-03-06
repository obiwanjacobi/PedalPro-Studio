import * as React from "react";

import { Phaser } from "./Phaser";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";
import { effectEqual } from "../EffectsOperations";

type PhaserListItemProps = {
    phaser: Phaser;
    origin: Phaser;
};
type PhaserListItemActions = ChangeEffects & SelectEffect;
type PhaserListItemAllProps = PhaserListItemProps & PhaserListItemActions;

export class PhaserListItem extends React.Component<PhaserListItemAllProps> {
    public constructor(props: PhaserListItemAllProps) {
        super(props);
        this.onEnabled = this.onEnabled.bind(this);
    }

    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.phaser.enabled}
                selected={this.props.phaser.ui.selected}
                changed={!effectEqual(this.props.phaser, this.props.origin)}
                title="Phaser"
                avatar="Phr"
                onEnabled={this.onEnabled}
                effectName={{ effectName: EffectNames.Phaser }}
                selectEffect={this.props.selectEffect}
            />
        );
    }

    private onEnabled(enabled: boolean) {
        this.props.changeEffects({ phaser: { enabled: enabled } });
    }
}