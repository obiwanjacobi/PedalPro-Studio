import * as React from "react";
import { connect, /*Dispatch, MapDispatchToPropsFunction,*/ MapStateToProps } from "react-redux";
import { ApplicationDocument } from "../ApplicationDocument";
import { EffectNames } from "./Effects";
import { Typography } from "@material-ui/core";

type EffectsExSettingsProps = {};
type EffectsExSettingsStoreProps = {
    effectName: EffectNames;
    componentName?: string;
};

type EffectsExSettingsAllProps = EffectsExSettingsProps & EffectsExSettingsStoreProps;
type EffectsExSettingsState = {};

class EffectsExSettings extends React.Component<EffectsExSettingsAllProps, EffectsExSettingsState> {
    public render() {
        return (
            <Typography>{this.props.effectName}</Typography>
        );
    }
}

type ExtractStatePropFunc = MapStateToProps<EffectsExSettingsStoreProps, EffectsExSettingsProps, ApplicationDocument>;
const extractComponentPropsFromState: ExtractStatePropFunc = (
    state: ApplicationDocument, _: EffectsExSettingsProps): EffectsExSettingsStoreProps => {
        if (state.editEffects) {
            return  {
                effectName: state.editEffects.selected.effectName,
                componentName: state.editEffects.selected.componentName
            };
        }
        return { effectName: EffectNames.None };
};

// type ActionDispatchFunc = MapDispatchToPropsFunction<EffectsExSettingsActions, EffectsExSettingsProps>;
// const createActionObject: ActionDispatchFunc =
//     (dispatch: Dispatch, _: EffectsExSettingsProps): EffectsExSettingsActions => {
//         return {
//         };
//     };

export default connect(extractComponentPropsFromState)(EffectsExSettings);