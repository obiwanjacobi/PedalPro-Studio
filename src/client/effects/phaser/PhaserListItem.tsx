import * as React from "react";

import { Phaser } from "./Phaser";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";

type PhaserListItemProps = {
    phaser: Phaser;
};
type PhaserListItemActions = ChangeEffectsEx & SelectEffect;
type PhaserListItemAllProps = PhaserListItemProps & PhaserListItemActions;
type PhaserListItemState = {};

export class PhaserListItem extends React.Component<PhaserListItemAllProps, PhaserListItemState> {
    public constructor(props: PhaserListItemAllProps) {
        super(props);
        this.onEnabled = this.onEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.phaser.enabled}
                selected={this.props.phaser.ui.selected}
                title="Phaser"
                avatar="Phr"
                onEnabled={this.onEnabled}
                effectName={{ effectName: EffectNames.Phaser }}
                selectEffect={this.props.selectEffect}
            />
        );
    }

    private onEnabled(enabled: boolean) {
        this.props.changeEffectsEx({ phaser: { enabled: enabled } });
    }
}