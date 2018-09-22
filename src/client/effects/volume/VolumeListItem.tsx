import * as React from "react";
import { Typography } from "@material-ui/core";

import { Volume } from "./Volume";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";

type VolumeListItemProps = {
    volume: Volume;
};
type VolumeListItemActions = ChangeEffects & SelectEffect;
type VolumeListItemAllProps = VolumeListItemProps & VolumeListItemActions;
type VolumeListItemState = {};

export class VolumeListItem extends React.Component<VolumeListItemAllProps, VolumeListItemState> {
    constructor(props: VolumeListItemAllProps) {
        super(props);
        this.toggleEnabled = this.toggleEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.volume.enabled}
                title="Volume"
                avatar="Vol"
                onEnabled={this.toggleEnabled}
                effectName={{ effectName: EffectNames.Volume }}
                selectEffect={this.props.selectEffect}
                content={
                    <Typography color="textSecondary">Setting-summary here...</Typography>
                }
            />
        );
    }

    private toggleEnabled() {
        const partial: Partial<Volume> = { enabled: !this.props.volume.enabled };
        this.props.changeEffects({ volume: partial });
    }
}