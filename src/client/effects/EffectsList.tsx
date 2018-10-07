import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction /*, MapStateToProps*/ } from "react-redux";
import { AutoSizer } from "react-virtualized";

import { EffectNames, Effects } from "./Effects";
import { ChangeEffects, createChangeEffectsAction } from "./ChangeEffectsAction";
// import { ApplicationDocument } from "../ApplicationDocument";
import { RecursivePartial } from "../../TypeExtensions";
import { CompressorListItem } from "./compressor/CompressorListItem";
import { DistortionListItem } from "./distortion/DistortionListItem";
import { BoostListItem } from "./boost/BoostListItem";
import { PhaserListItem } from "./phaser/PhaserListItem";
import { AuxRoutingListItem } from "./auxRouting/AuxRoutingListItem";
import { NoiseGateListItem } from "./noiseGate/NoiseGateListItem";
import { VolumeListItem } from "./volume/VolumeListItem";
import { FiltersPreListItem } from "./filters/FiltersPreListItem";
import { SelectEffect, createSelectEffectAction } from "./SelectEffectAction";
import { FiltersPostListItem } from "./filters/FiltersPostListItem";
import { DelayListItem } from "./delay/DelayListItem";
import { ModulationListItem } from "./modulation/ModulationListItem";
import { VcaListItem } from "./vca/VcaListItem";

type EffectsListProps = {
    effects: Effects;
};
type EffectsListStoreProps = {};
type EffectsListActions = ChangeEffects & SelectEffect;
type EffectsListAllProps = EffectsListProps & EffectsListStoreProps & EffectsListActions;
type EffectsListState = {};

class EffectsList extends React.Component<EffectsListAllProps, EffectsListState> {
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
                compressor={this.props.effects.compressor}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <FiltersPreListItem
                filters={this.props.effects.filters}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <BoostListItem
                boost={this.props.effects.boost}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <DistortionListItem
                distortion={this.props.effects.distortion}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <VcaListItem
                vca={this.props.effects.vca}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <PhaserListItem
                phaser={this.props.effects.phaser}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <FiltersPostListItem
                filters={this.props.effects.filters}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <ModulationListItem
                modulation={this.props.effects.modulation}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <DelayListItem
                delay={this.props.effects.delay}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <AuxRoutingListItem
                aux={this.props.effects.aux}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <VolumeListItem
                volume={this.props.effects.volume}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <NoiseGateListItem
                noiseGate={this.props.effects.noiseGate}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );

        return components;
    }
}

// type ExtractStatePropFunc = MapStateToProps<EffectsListStoreProps, EffectsListProps, ApplicationDocument>;
// const extractComponentPropsFromState: ExtractStatePropFunc = (
//     state: ApplicationDocument, _: EffectsListProps): EffectsListStoreProps => {
//         return  { };
// };

type ActionDispatchFunc = MapDispatchToPropsFunction<EffectsListActions, EffectsListProps>;
const createActionObject: ActionDispatchFunc =
    (dispatch: Dispatch, _: EffectsListProps): EffectsListActions => {
        return {
            changeEffects: (effects: RecursivePartial<Effects>): void => {
                dispatch(createChangeEffectsAction(effects));
            },
            selectEffect : (effectName: EffectNames, component?: string) => {
                dispatch(createSelectEffectAction(effectName, component));
            }
        };
    };

export default connect(undefined /*extractComponentPropsFromState*/, createActionObject)(EffectsList);