import * as React from "react";

import { Compressor } from "./Compressor";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { SelectEffect } from "../SelectEffectAction";
import { EffectNames } from "../Effects";

type CompressorListItemProps = {
    compressor: Compressor;
};
type CompressorListItemActions = ChangeEffectsEx & SelectEffect;
type CompressorListItemAllProps = CompressorListItemProps & CompressorListItemActions;
type CompressorListItemState = {};

export class CompressorListItem extends React.Component<CompressorListItemAllProps, CompressorListItemState> {
    public constructor(props: CompressorListItemAllProps) {
        super(props);
        this.onEnabled = this.onEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.compressor.enabled}
                title="Compressor"
                avatar="Com"
                onEnabled={this.onEnabled}
                effectName={{ effectName: EffectNames.Compressor }}
                selectEffect={this.props.selectEffect}
            />
        );
    }

    private onEnabled(enabled: boolean) {
        this.props.changeEffectsEx({ compressor: { enabled: enabled } });
    }
}