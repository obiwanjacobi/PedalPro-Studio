import * as React from "react";

import { Distortion } from "./Distortion";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";
import { effectHasChanged } from "../EffectsOperations";

type DistortionListItemProps = {
    distortion: Distortion;
};
type DistortionListItemActions = ChangeEffects & SelectEffect;
type DistortionListItemAllProps = DistortionListItemProps & DistortionListItemActions;

export class DistortionListItem extends React.Component<DistortionListItemAllProps> {
    public constructor(props: DistortionListItemAllProps) {
        super(props);
        this.onEnabled = this.onEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.distortion.enabled}
                selected={this.props.distortion.ui.selected}
                changed={effectHasChanged(this.props.distortion)}
                title="Distortion"
                avatar="Dst"
                onEnabled={this.onEnabled}
                effectName={{ effectName: EffectNames.Distortion }}
                selectEffect={this.props.selectEffect}
            />
        );
    }
    
    private onEnabled(enabled: boolean) {
        this.props.changeEffects({ distortion: { enabled: enabled } });
    }
}