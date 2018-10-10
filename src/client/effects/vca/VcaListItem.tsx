import * as React from "react";

import { VoltageControlledAmp } from "./VoltageControlledAmp";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";
import { effectHasChanged } from "../EffectsOperations";

type VcaListItemProps = {
    vca: VoltageControlledAmp;
};
type VcaListItemActions = ChangeEffects & SelectEffect;
type VcaListItemAllProps = VcaListItemProps & VcaListItemActions;

export class VcaListItem extends React.Component<VcaListItemAllProps> {
    public constructor(props: VcaListItemAllProps) {
        super(props);
        this.onEnabled = this.onEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.vca.enabled}
                selected={this.props.vca.ui.selected}
                changed={effectHasChanged(this.props.vca)}
                title="Voltage Controlled Amp"
                avatar="Vca"
                onEnabled={this.onEnabled}
                effectName={{ effectName: EffectNames.Vca }}
                selectEffect={this.props.selectEffect}
            />
        );
    }

    private onEnabled(enabled: boolean) {
        this.props.changeEffects({ vca: { enabled: enabled } });
    }
}