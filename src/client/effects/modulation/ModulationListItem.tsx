import * as React from "react";

import { Modulation } from "./Modulation";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";
import { ModulationMode } from "../../../model/Modulation";

type ModulationListItemProps = {
    modulation: Modulation;
};
type ModulationListItemActions = ChangeEffects & SelectEffect;
type ModulationListItemAllProps = ModulationListItemProps & ModulationListItemActions;
type ModulationListItemState = {};

export class ModulationListItem extends React.Component<ModulationListItemAllProps, ModulationListItemState> {
    constructor(props: ModulationListItemAllProps) {
        super(props);
        this.onEnabled = this.onEnabled.bind(this);
    }
    
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.modulation.mode !== ModulationMode.None}
                title="Modulation"
                avatar="Mod"
                onEnabled={this.onEnabled}
                effectName={{ effectName: EffectNames.Modulation }}
                selectEffect={this.props.selectEffect}
            />
        );
    }

    private onEnabled(enabled: boolean) {
        this.props.changeEffects({ modulation: { mode: enabled ? ModulationMode.Chorus : ModulationMode.None } });
    }
}