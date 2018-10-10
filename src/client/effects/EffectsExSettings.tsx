import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";

import { RecursivePartial } from "../../TypeExtensions";
import { ApplicationDocument } from "../ApplicationDocument";
import { isEffects, isEffectsEx } from "./EffectsOperations";
import { EffectNames, Effects, EffectsEx, EffectsOrEx } from "./Effects";
import { 
    ChangeEffects, createChangeEffectsAction, 
    ChangeEffectsEx, createChangeEffectsExAction 
} from "./ChangeEffectsAction";
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
import { AuxRoutingComponentNames } from "./auxRouting/AuxRouting";
import { AuxMixerSettings } from "./auxRouting/AuxMixerSettings";
import { AuxPedalSettings } from "./auxRouting/AuxPedalSettings";
import { ModulationComponentNames } from "./modulation/Modulation";
import { ChorusSettings } from "./modulation/ChorusSettings";
import { VibeSettings } from "./modulation/VibeSettings";
import { FlangerSettings } from "./modulation/FlangerSettings";
import { VolumeSettings } from "./volume/VolumeSettings";
import { NoiseGateSettings } from "./noiseGate/NoiseGateSettings";
import { PhaserSettings } from "./phaser/PhaserSettings";
import { DspSettings } from "./dsp/DspSettings";
import { DistortionSettings } from "./distortion/DistortionSettings";

type EffectsExSettingsProps = {};
type EffectsExSettingsStoreProps = {
    effects: EffectsOrEx;
    effectName: EffectNames;
    componentName?: string;
};
type EffectsExSettingsActions = ChangeEffectsEx & ChangeEffects;
type EffectsExSettingsAllProps = EffectsExSettingsProps & EffectsExSettingsStoreProps & EffectsExSettingsActions;

class EffectsExSettings extends React.Component<EffectsExSettingsAllProps> {
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
                return (
                    <BoostSettings boost={this.props.effects.boost} changeEffects={this.props.changeEffects} />
                );
        
            case EffectNames.Distortion:
                return (
                    <DistortionSettings 
                        distortion={this.effects.distortion} 
                        changeEffects={this.props.changeEffects}
                    />
                );

            case EffectNames.PreAmp:
                return this.renderPreAmpSettings();

            case EffectNames.Vca:
                return (
                    <VcaSettings vca={this.props.effects.vca} changeEffects={this.props.changeEffects} />
                );

            case EffectNames.Phaser:
                return (
                    <PhaserSettings phaser={this.props.effects.phaser} changeEffects={this.props.changeEffects} />
                );

            case EffectNames.Modulation:    
                return this.renderModulationSettings();

            case EffectNames.Delay:
                return (
                    <DelaySettings delay={this.props.effects.delay} changeEffects={this.props.changeEffects} />
                );

            case EffectNames.Dsp:
                return (
                    <DspSettings dsp={this.effectsEx.dsp} changeEffectsEx={this.props.changeEffectsEx} />
                );

            case EffectNames.AuxRouting:
                return this.renderAuxSettings();

            case EffectNames.Volume:
                return (
                    <VolumeSettings volume={this.props.effects.volume} changeEffects={this.props.changeEffects} />
                );

            case EffectNames.NoiseGate:
                return (
                    <NoiseGateSettings 
                        noiseGate={this.props.effects.noiseGate} 
                        changeEffects={this.props.changeEffects}
                    />
                );

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
                        emphasis={this.effectsEx.pre.emphasis} 
                        changeEffectsEx={this.props.changeEffectsEx}
                    />
                );
            case PreAmpComponentNames.DistortionDiode:
                return (
                    <DistortionDiodeSettings
                        distortion={this.effectsEx.pre.distortionDiode} 
                        changeEffectsEx={this.props.changeEffectsEx}
                    />
                );
            case PreAmpComponentNames.DistortionFet:
                return (
                    <DistortionFetSettings
                        distortion={this.effectsEx.pre.distortionFet} 
                        changeEffectsEx={this.props.changeEffectsEx}
                    />
                );
            case PreAmpComponentNames.Fuzz:
                return (
                    <FuzzSettings
                        fuzz={this.effectsEx.pre.fuzz} 
                        changeEffectsEx={this.props.changeEffectsEx}
                    />
                );
            case PreAmpComponentNames.Equalizer:
                return (
                    <EqualizerSettings
                        equalizer={this.effectsEx.pre.equalizer} 
                        changeEffectsEx={this.props.changeEffectsEx}
                    />
                );
        }
    }

    private renderModulationSettings(): React.ReactNode {
        switch (this.props.componentName) {
            default:
            case ModulationComponentNames.Chorus:
                return (
                    <ChorusSettings
                        chorus={this.props.effects.modulation.chorus} 
                        changeEffects={this.props.changeEffects} 
                    />
                );
            case ModulationComponentNames.Flanger:
                return (
                    <FlangerSettings 
                        flanger={this.props.effects.modulation.flanger} 
                        changeEffects={this.props.changeEffects}
                    />
                );
            case ModulationComponentNames.Vibe:
                return (
                    <VibeSettings 
                        vibe={this.props.effects.modulation.vibe} 
                        changeEffects={this.props.changeEffects}
                    />
                );
        }
    }

    private renderAuxSettings(): React.ReactNode {
        switch (this.props.componentName) {
            default:
            case AuxRoutingComponentNames.Mixer:
                return (<AuxMixerSettings aux={this.props.effects.aux} changeEffects={this.props.changeEffects} />);
            case AuxRoutingComponentNames.Pedals:
                return (<AuxPedalSettings aux={this.props.effects.aux} changeEffects={this.props.changeEffects} />);
        }
    }

    private get effects(): Effects {
        if (isEffects(this.props.effects)) {
            return this.props.effects as Effects;
        }
        throw new Error("Assumed Effects is EffectsEx.");
    }

    private get effectsEx(): EffectsEx {
        if (isEffectsEx(this.props.effects)) {
            return this.props.effects as EffectsEx;
        }
        throw new Error("Assumed EffectsEx is Effects.");
    }
}

type ExtractStatePropFunc = MapStateToProps<EffectsExSettingsStoreProps, EffectsExSettingsProps, ApplicationDocument>;
const extractComponentPropsFromState: ExtractStatePropFunc = (
    state: ApplicationDocument, _: EffectsExSettingsProps): EffectsExSettingsStoreProps => {
        if (state.editEffects) {
            return  {
                effects: state.editEffects.effectsOrEx,
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
            changeEffects: (effects: RecursivePartial<Effects>) => {
                dispatch(createChangeEffectsAction(effects));
            },
            changeEffectsEx: (effectsEx: RecursivePartial<EffectsEx>) => {
                dispatch(createChangeEffectsExAction(effectsEx));
            }
        };
    };

export default connect(extractComponentPropsFromState, createActionObject)(EffectsExSettings);