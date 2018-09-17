import * as React from "react";
import { Typography } from "@material-ui/core";

import { NoiseGate } from "./NoiseGate";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";

type NoiseGateListItemProps = {
    noiseGate: NoiseGate;
};
type NoiseGateListItemActions = ChangeEffects;
type NoiseGateListItemAllProps = NoiseGateListItemProps & NoiseGateListItemActions;
type NoiseGateListItemState = {};

export class NoiseGateListItem extends React.Component<NoiseGateListItemAllProps, NoiseGateListItemState> {
    constructor(props: NoiseGateListItemAllProps) {
        super(props);
        this.toggleEnabled = this.toggleEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.noiseGate.enabled}
                title="Noise Gate"
                avatar="NGt"
                onEnabled={this.toggleEnabled}
                content={
                    <Typography color="textSecondary">Setting-summary here...</Typography>
                }
            />
        );
    }

    private toggleEnabled() {
        const partial: Partial<NoiseGate> = { enabled: !this.props.noiseGate.enabled };
        this.props.changeEffects({ noiseGate: partial });
    }
}