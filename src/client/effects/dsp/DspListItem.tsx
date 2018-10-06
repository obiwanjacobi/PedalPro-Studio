import * as React from "react";

import { Dsp } from "./Dsp";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";

type DspListItemProps = {
    dsp: Dsp;
};
type DspListItemActions = ChangeEffectsEx & SelectEffect;
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
                title="Digital Delay &amp; Reverb"
                avatar="Dsp"
                onEnabled={this.onEnabled}
                effectName={{ effectName: EffectNames.Dsp }}
                selectEffect={this.props.selectEffect}
            />
        );
    }

    private onEnabled(enabled: boolean) {
        this.props.changeEffectsEx({ dsp: { enabled: enabled } });
    }
}