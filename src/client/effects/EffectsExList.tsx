import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction /*, MapStateToProps*/ } from "react-redux";
import { AutoSizer } from "react-virtualized";

import { EffectsEx, EffectNames, EffectsOrEx } from "./Effects";
import { CompressorListItem } from "./compressor/CompressorListItem";
import { ChangeEffects, createChangeEffectsAction } from "./ChangeEffectsAction";
// import { ApplicationDocument } from "../ApplicationDocument";
import { RecursivePartial } from "../../TypeExtensions";
import { BoostListItem } from "./boost/BoostListItem";
import { PhaserListItem } from "./phaser/PhaserListItem";
import { AuxRoutingListItem } from "./auxRouting/AuxRoutingListItem";
import { NoiseGateListItem } from "./noiseGate/NoiseGateListItem";
import { VolumeListItem } from "./volume/VolumeListItem";
import { PreAmpListItem } from "./preamp/PreAmpListItem";
import { FiltersPreListItem } from "./filters/FiltersPreListItem";
import { SelectEffect, createSelectEffectAction } from "./SelectEffectAction";
import { FiltersPostListItem } from "./filters/FiltersPostListItem";

type EffectsExListProps = {
    effectsEx: EffectsEx;
};
type EffectsExListStoreProps = {};
type EffectsExListActions = ChangeEffects & SelectEffect;
type EffectsExListAllProps = EffectsExListProps & EffectsExListStoreProps & EffectsExListActions;
type EffectsExListState = {};

class EffectsExList extends React.Component<EffectsExListAllProps, EffectsExListState> {
    public render() {
        return (
            <div style={{flexGrow: 1}}>
                <AutoSizer>
                    {({ height, width }) => {
                        return (
                            <div style={{ width: width, height: height, overflowY: "scroll" }}>
                                {this.renderEffectItems()}
                            </div>
                        );
                    }}
                </AutoSizer>
            </div>
        );
    }

    private renderEffectItems(): React.ReactNode {
        return (
            this.effectsComponents().map((effect, i) => (
                    <div key={i} style={{ padding: "8px" }}>
                        {effect}
                    </div>
                )
            )
        );
    }

    private effectsComponents(): React.ReactNode[] {
        const components = new Array<React.ReactNode>();

        components.push(
            <CompressorListItem
                compressor={this.props.effectsEx.compressor}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <FiltersPreListItem
                filters={this.props.effectsEx.filters}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <BoostListItem
                boost={this.props.effectsEx.boost}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <PreAmpListItem
                pre={this.props.effectsEx.pre}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <PhaserListItem
                phaser={this.props.effectsEx.phaser}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <FiltersPostListItem
                filters={this.props.effectsEx.filters}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <AuxRoutingListItem
                aux={this.props.effectsEx.aux}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <VolumeListItem
                volume={this.props.effectsEx.volume}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <NoiseGateListItem
                noiseGate={this.props.effectsEx.noiseGate}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );

        return components;
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
            changeEffects: (effects: RecursivePartial<EffectsOrEx>): void => {
                dispatch(createChangeEffectsAction(effects));
            },
            selectEffect : (effectName: EffectNames, component?: string) => {
                dispatch(createSelectEffectAction(effectName, component));
            }
        };
    };

export default connect(undefined /*extractComponentPropsFromState*/, createActionObject)(EffectsExList);