import * as React from "react";

import { NoiseGate } from "./NoiseGate";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";

type NoiseGateListItemProps = {
    noiseGate: NoiseGate;
};
type NoiseGateListItemActions = ChangeEffectsEx & SelectEffect;
type NoiseGateListItemAllProps = NoiseGateListItemProps & NoiseGateListItemActions;
type NoiseGateListItemState = {};

export class NoiseGateListItem extends React.Component<NoiseGateListItemAllProps, NoiseGateListItemState> {
    constructor(props: NoiseGateListItemAllProps) {
        super(props);
        this.onEnabled = this.onEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.noiseGate.enabled}
                title="Noise Gate"
                avatar="NGt"
                onEnabled={this.onEnabled}
                effectName={{ effectName: EffectNames.NoiseGate }}
                selectEffect={this.props.selectEffect}
            />
        );
    }

    private onEnabled(enabled: boolean) {
        this.props.changeEffectsEx({ noiseGate: { enabled: enabled } });
    }
}