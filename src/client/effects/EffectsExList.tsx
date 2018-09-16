import * as React from "react";
import { connect, Dispatch, MapDispatchToPropsFunction /*, MapStateToProps*/ } from "react-redux";

import { EffectsEx, Effects } from "./Effects";
import { CompressorListItem } from "./compressor/CompressorListItem";
import { ChangeEffects, createChangeEffectsAction } from "./ChangeEffectsAction";
// import { ApplicationDocument } from "../ApplicationDocument";
import { RecursivePartial } from "../../TypeExtensions";

type EffectsExListProps = {
    effectsEx: EffectsEx;
};
type EffectsExListStoreProps = {};
type EffectsExListActions = ChangeEffects;
type EffectsExListAllProps = EffectsExListProps & EffectsExListStoreProps & EffectsExListActions;
type EffectsExListState = {};

class EffectsExList extends React.Component<EffectsExListAllProps, EffectsExListState> {
    public render() {
        return (
            <CompressorListItem 
                compressor={this.props.effectsEx.compressor}
                changeEffects={this.props.changeEffects}
            />
        );
    }
}

// type ExtractStatePropFunc = MapStateToProps<EffectsExListStoreProps, EffectsExListProps, ApplicationDocument>;
// const extractComponentPropsFromState: ExtractStatePropFunc = (
//     state: ApplicationDocument, _: EffectsExListProps): EffectsExListStoreProps => {
//         return  { };
// };

type ActionDispatchFunc = MapDispatchToPropsFunction<EffectsExListActions, EffectsExListProps>;
const createActionObject: ActionDispatchFunc =
    (dispatch: Dispatch, _: EffectsExListProps): EffectsExListActions => {
        return {
            changeEffects: (effects: RecursivePartial<Effects | EffectsEx>): void => {
                dispatch(createChangeEffectsAction(effects));
            }
        };
    };

export default connect(undefined /*extractComponentPropsFromState*/, createActionObject)(EffectsExList);