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
import { FiltersComponentNames } from "./filters/Filters";
import { Filter1Settings } from "./filters/Filter1Settings";
import { Filter2Settings } from "./filters/Filter2Settings";
import { DelaySettings } from "./delay/DelaySettings";
import { VcaSettings } from "./vca/VcaSettings";
import { CompressorSettings } from "./compressor/CompressorSettings";

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
            case EffectNames.Compressor:
                return (
                    <CompressorSettings 
                        compressor={this.props.effects.compressor} 
                        changeEffects={this.props.changeEffects}
                    />
                );
                
            case EffectNames.Filters:
                return this.renderFilterSettings();

            case EffectNames.Boost:
                return (<BoostSettings boost={this.props.effects.boost} changeEffects={this.props.changeEffects} />);
        
            case EffectNames.PreAmp:
                return this.renderPreAmpSettings();

            case EffectNames.Vca:
                return (<VcaSettings vca={this.props.effects.vca} changeEffects={this.props.changeEffects} />);

            case EffectNames.Delay:
                return (<DelaySettings delay={this.props.effects.delay} changeEffects={this.props.changeEffects} />);

            default:
                return null;
        }        
    }

    private renderFilterSettings(): React.ReactNode {
        switch (this.props.componentName) {
            case FiltersComponentNames.Filter1:
                return (
                    <Filter1Settings
                        filter={this.props.effects.filters.filter1}
                        changeEffects={this.props.changeEffects}
                    />
                );
            case FiltersComponentNames.Filter2:
                return (
                    <Filter2Settings
                        filter={this.props.effects.filters.filter2}
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