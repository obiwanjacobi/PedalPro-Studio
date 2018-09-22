import * as React from "react";
import { Typography } from "@material-ui/core";

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
        this.toggleEnabled = this.toggleEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.noiseGate.enabled}
                title="Noise Gate"
                avatar="NGt"
                onEnabled={this.toggleEnabled}
                effectName={{ effectName: EffectNames.NoiseGate }}
                selectEffect={this.props.selectEffect}
                content={
                    <Typography color="textSecondary">Setting-summary here...</Typography>
                }
            />
        );
    }

    private toggleEnabled() {
        const partial: Partial<NoiseGate> = { enabled: !this.props.noiseGate.enabled };
        this.props.changeEffects({ noiseGate: partial });
    }
}