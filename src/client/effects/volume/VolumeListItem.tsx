import * as React from "react";

import { Volume } from "./Volume";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";

type VolumeListItemProps = {
    volume: Volume;
};
type VolumeListItemActions = ChangeEffectsEx & SelectEffect;
type VolumeListItemAllProps = VolumeListItemProps & VolumeListItemActions;
type VolumeListItemState = {};

export class VolumeListItem extends React.Component<VolumeListItemAllProps, VolumeListItemState> {
    constructor(props: VolumeListItemAllProps) {
        super(props);
        this.onEnabled = this.onEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.volume.enabled}
                title="Volume"
                avatar="Vol"
                onEnabled={this.onEnabled}
                effectName={{ effectName: EffectNames.Volume }}
                selectEffect={this.props.selectEffect}
            />
        );
    }

    private onEnabled(enabled: boolean) {
        this.props.changeEffectsEx({ volume: { enabled: enabled } });
    }
}