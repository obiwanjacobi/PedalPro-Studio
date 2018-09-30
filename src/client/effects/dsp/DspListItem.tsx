import * as React from "react";

import { Dsp } from "./Dsp";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";

type DspListItemProps = {
    dsp: Dsp;
};
type DspListItemActions = ChangeEffects & SelectEffect;
type DspListItemAllProps = DspListItemProps & DspListItemActions;
type DspListItemState = {};

export class DspListItem extends React.Component<DspListItemAllProps, DspListItemState> {
    public constructor(props: DspListItemAllProps) {
        super(props);
        this.onEnabled = this.onEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.dsp.enabled}
                title="Digital Sound Processing"
                avatar="Dsp"
                onEnabled={this.onEnabled}
                effectName={{ effectName: EffectNames.Modulation }}
                selectEffect={this.props.selectEffect}
            />
        );
    }

    private onEnabled(enabled: boolean) {
        this.props.changeEffects({ dsp: { enabled: enabled } });
    }
}