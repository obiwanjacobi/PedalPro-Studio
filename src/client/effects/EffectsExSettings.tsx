import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";

import { ApplicationDocument } from "../ApplicationDocument";
import { EffectNames, EffectsOrEx, EffectsEx } from "./Effects";
import { ChangeEffects, createChangeEffectsAction } from "./ChangeEffectsAction";
import { RecursivePartial } from "../../TypeExtensions";
import { BoostSettings } from "./boost/BoostSettings";
import { EmphasisSettings } from "./preamp/EmphasisSettings";
import { PreAmpComponentNames } from "./preamp/PreAmp";
import { EqualizerSettings } from "./preamp/EqualizerSettings";
import { FuzzSettings } from "./preamp/FuzzSettings";
import { DistortionDiodeSettings } from "./preamp/DistortionDiodeSettings";
import { DistortionFetSettings } from "./preamp/DistortionFetSettings";
import { FilterRouting } from "../../model/Filters";
import { FiltersComponentNames } from "./filters/Filters";
import { Filter1Settings } from "./filters/Filter1Settings";

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
            case EffectNames.Filters:
                return this.props.effects.filters.routing !== FilterRouting.Bypass ? (
                    this.renderFilterSettings()
                ) : null;

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

    private renderFilterSettings(): React.ReactNode {
        switch (this.props.componentName) {
            case FiltersComponentNames.PreFilter1:
                return (
                    <Filter1Settings
                        filter={this.props.effects.filters.filter1}
                        changeEffects={this.props.changeEffects}
                    />
                );
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
            case PreAmpComponentNames.DistortionDiode:
                return (
                    <DistortionDiodeSettings
                        distortion={this.props.effects.pre.distortionDiode} 
                        changeEffects={this.props.changeEffects}
                    />
                );
            case PreAmpComponentNames.DistortionFet:
                return (
                    <DistortionFetSettings
                        distortion={this.props.effects.pre.distortionFet} 
                        changeEffects={this.props.changeEffects}
                    />
                );
            case PreAmpComponentNames.Fuzz:
                return (
                    <FuzzSettings
                        fuzz={this.props.effects.pre.fuzz} 
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