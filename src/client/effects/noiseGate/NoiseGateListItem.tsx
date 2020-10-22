import * as React from "react";

import { NoiseGate } from "./NoiseGate";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";
import { effectEqual } from "../EffectsOperations";

type NoiseGateListItemProps = {
    noiseGate: NoiseGate;
    origin: NoiseGate;
};
type NoiseGateListItemActions = ChangeEffects & SelectEffect;
type NoiseGateListItemAllProps = NoiseGateListItemProps & NoiseGateListItemActions;

export class NoiseGateListItem extends React.Component<NoiseGateListItemAllProps> {
    constructor(props: NoiseGateListItemAllProps) {
        super(props);
        this.onEnabled = this.onEnabled.bind(this);
    }

    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.noiseGate.enabled}
                selected={this.props.noiseGate.ui.selected}
                changed={!effectEqual(this.props.noiseGate, this.props.origin)}
                title="Noise Gate"
                avatar="NG"
                onEnabled={this.onEnabled}
                effectName={{ effectName: EffectNames.NoiseGate }}
                selectEffect={this.props.selectEffect}
            />
        );
    }

    private onEnabled(enabled: boolean) {
        this.props.changeEffects({ noiseGate: { enabled: enabled } });
    }
}