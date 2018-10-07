import * as React from "react";

import { NoiseGate } from "./NoiseGate";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";

type NoiseGateListItemProps = {
    noiseGate: NoiseGate;
};
type NoiseGateListItemActions = ChangeEffects & SelectEffect;
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
                selected={this.props.noiseGate.ui.selected}                
                title="Noise Gate"
                avatar="NGt"
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