import * as React from "react";
import { EffectsOrEx } from "./Effects";
import { ChangeEffects } from "./ChangeEffectsAction";
import { AmpSwitchesSettings } from "./auxRouting/AmpSwitchesSettings";

type EffectsSettingsProps = {
    effects?: EffectsOrEx;
};
type EffectsSettingsActions = ChangeEffects;
type EffectsSettingsAllProps = EffectsSettingsProps & EffectsSettingsActions;

export class EffectsSettings extends React.Component<EffectsSettingsAllProps> {
    public render() {
        if (!this.props.effects) { return null; }

        return (
            <AmpSwitchesSettings aux={this.effects.aux} changeEffects={this.props.changeEffects} />
        );
    }

    private get effects(): EffectsOrEx {
        if (this.props.effects) {
            return this.props.effects;
        }
        throw new Error("Effects is not set.");
    }
}
