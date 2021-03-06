import * as React from "react";

import { Compressor } from "./Compressor";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";
import { SelectEffect } from "../SelectEffectAction";
import { EffectNames } from "../Effects";
import { effectEqual } from "../EffectsOperations";

type CompressorListItemProps = {
    compressor: Compressor;
    origin: Compressor;
};
type CompressorListItemActions = ChangeEffects & SelectEffect;
type CompressorListItemAllProps = CompressorListItemProps & CompressorListItemActions;

export class CompressorListItem extends React.Component<CompressorListItemAllProps> {
    public constructor(props: CompressorListItemAllProps) {
        super(props);
        this.onEnabled = this.onEnabled.bind(this);
    }

    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.compressor.enabled}
                selected={this.props.compressor.ui.selected}
                changed={!effectEqual(this.props.compressor, this.props.origin)}
                title="Compressor"
                avatar="Com"
                onEnabled={this.onEnabled}
                effectName={{ effectName: EffectNames.Compressor }}
                selectEffect={this.props.selectEffect}
            />
        );
    }

    private onEnabled(enabled: boolean) {
        this.props.changeEffects({ compressor: { enabled: enabled } });
    }
}