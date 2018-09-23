import * as React from "react";
import { connect, Dispatch, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";

import { ApplicationDocument } from "../ApplicationDocument";
import { EffectNames, EffectsOrEx, EffectsEx } from "./Effects";
import { ChangeEffects, createChangeEffectsAction } from "./ChangeEffectsAction";
import { RecursivePartial } from "../../TypeExtensions";
import { BoostSettings } from "./boost/BoostSettings";
import { EmphasisSettings } from "./preamp/EmphasisSettings";
import { PreAmpComponentNames } from "./preamp/PreAmp";
import { EqualizerSettings } from "./preamp/EqualizerSettings";

type EffectsExSettingsProps = {};
type EffectsExSettingsStoreProps = {
    effects: EffectsEx;
    effectName: EffectNames;
    componentName?: string;
};
type EffectsExSettingsActions = ChangeEffects;
type EffectsExSettingsAllProps = EffectsExSettingsProps & EffectsExSettingsStoreProps & EffectsExSettingsActions;
type EffectsExSettingsState = {};

class EffectsExSettings extends React.Component<EffectsExSettingsAllProps, EffectsExSettingsState> {
    public render() {
        switch (this.props.effectName) {
            case EffectNames.Boost:
                return this.props.effects.boost.enabled ? (
                    <BoostSettings boost={this.props.effects.boost} changeEffects={this.props.changeEffects} />
                ) : null;
        
            case EffectNames.PreAmp:
                return this.props.effects.pre.enabled ? (
                    this.renderPreAmpSettings()
                ) : null;
            default:
                return null;
        }        
    }

    private renderPreAmpSettings(): React.ReactNode {
        switch (this.props.componentName) {
            case PreAmpComponentNames.Emphasis:
            default:
                return (
                    <EmphasisSettings 
                        emphasis={this.props.effects.pre.emphasis} 
                        changeEffects={this.props.changeEffects}
                    />
                );
            case PreAmpComponentNames.Equalizer:
                return (
                    <EqualizerSettings
                        equalizer={this.props.effects.pre.equalizer} 
                        changeEffects={this.props.changeEffects}
                    />
                );
        }
    }
}

type ExtractStatePropFunc = MapStateToProps<EffectsExSettingsStoreProps, EffectsExSettingsProps, ApplicationDocument>;
const extractComponentPropsFromState: ExtractStatePropFunc = (
    state: ApplicationDocument, _: EffectsExSettingsProps): EffectsExSettingsStoreProps => {
        if (state.editEffects) {
            return  {
                effects: state.editEffects.effectsOrEx as EffectsEx,
                effectName: state.editEffects.selected.effectName,
                componentName: state.editEffects.selected.componentName
            };
        }

        throw new Error(
            "Dev: EffectsExSettings component must not be rendered when there is no Effects selected.");
};

type ActionDispatchFunc = MapDispatchToPropsFunction<EffectsExSettingsActions, EffectsExSettingsProps>;
const createActionObject: ActionDispatchFunc =
    (dispatch: Dispatch, _: EffectsExSettingsProps): EffectsExSettingsActions => {
        return {
            changeEffects: (effectsOrEx: RecursivePartial<EffectsOrEx>) => {
                dispatch(createChangeEffectsAction(effectsOrEx));
            }
        };
    };

export default connect(extractComponentPropsFromState, createActionObject)(EffectsExSettings);