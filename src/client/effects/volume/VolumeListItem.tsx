import * as React from "react";

import { Volume } from "./Volume";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";
import { effectHasChanged } from "../EffectsOperations";

type VolumeListItemProps = {
    volume: Volume;
};
type VolumeListItemActions = ChangeEffects & SelectEffect;
type VolumeListItemAllProps = VolumeListItemProps & VolumeListItemActions;

export class VolumeListItem extends React.Component<VolumeListItemAllProps> {
    constructor(props: VolumeListItemAllProps) {
        super(props);
        this.onEnabled = this.onEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.volume.enabled}
                selected={this.props.volume.ui.selected}
                changed={effectHasChanged(this.props.volume)}
                title="Volume"
                avatar="Vol"
                onEnabled={this.onEnabled}
                effectName={{ effectName: EffectNames.Volume }}
                selectEffect={this.props.selectEffect}
            />
        );
    }

    private onEnabled(enabled: boolean) {
        this.props.changeEffects({ volume: { enabled: enabled } });
    }
}