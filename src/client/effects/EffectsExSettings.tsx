import * as React from "react";
import { connect, Dispatch, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";

import { ApplicationDocument } from "../ApplicationDocument";
import { EffectNames, EffectsOrEx } from "./Effects";
import { ChangeEffects, createChangeEffectsAction } from "./ChangeEffectsAction";
import { RecursivePartial } from "../../TypeExtensions";
import { BoostSettings } from "./boost/BoostSettings";

type EffectsExSettingsProps = {};
type EffectsExSettingsStoreProps = {
    effects: EffectsOrEx;
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
        
            default:
                return null;
        }        
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
            changeEffects: (effectsOrEx: RecursivePartial<EffectsOrEx>) => {
                dispatch(createChangeEffectsAction(effectsOrEx));
            }
        };
    };

export default connect(extractComponentPropsFromState, createActionObject)(EffectsExSettings);