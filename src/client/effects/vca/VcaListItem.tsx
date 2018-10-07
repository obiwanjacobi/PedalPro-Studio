import * as React from "react";

import { VoltageControlledAmp } from "./VoltageControlledAmp";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";

type VcaListItemProps = {
    vca: VoltageControlledAmp;
};
type VcaListItemActions = ChangeEffectsEx & SelectEffect;
type VcaListItemAllProps = VcaListItemProps & VcaListItemActions;
type VcaListItemState = {};

export class VcaListItem extends React.Component<VcaListItemAllProps, VcaListItemState> {
    public constructor(props: VcaListItemAllProps) {
        super(props);
        this.onEnabled = this.onEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.vca.enabled}
                selected={this.props.vca.ui.selected}
                title="Voltage Controlled Amp"
                avatar="Vca"
                onEnabled={this.onEnabled}
                effectName={{ effectName: EffectNames.Vca }}
                selectEffect={this.props.selectEffect}
            />
        );
    }

    private onEnabled(enabled: boolean) {
        this.props.changeEffectsEx({ vca: { enabled: enabled } });
    }
}