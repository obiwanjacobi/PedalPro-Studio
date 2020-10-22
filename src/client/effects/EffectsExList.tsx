import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction /*, MapStateToProps*/ } from "react-redux";
import { AutoSizer } from "react-virtualized";

import { EffectsEx, EffectNames, Effects } from "./Effects";
import { CompressorListItem } from "./compressor/CompressorListItem";
import {
    ChangeEffects, createChangeEffectsAction,
    ChangeEffectsEx, createChangeEffectsExAction
} from "./ChangeEffectsAction";
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
import { DelayListItem } from "./delay/DelayListItem";
import { ModulationListItem } from "./modulation/ModulationListItem";
import { VcaListItem } from "./vca/VcaListItem";
import { DspListItem } from "./dsp/DspListItem";

type EffectsExListProps = {
    effectsEx: EffectsEx;
    origin: EffectsEx;
};
type EffectsExListActions = ChangeEffectsEx & ChangeEffects & SelectEffect;
type EffectsExListAllProps = EffectsExListProps & EffectsExListActions;

class EffectsExList extends React.Component<EffectsExListAllProps> {
    public render() {
        return (
            <div style={{ flexGrow: 1 }}>
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
                origin={this.props.origin.compressor}
                compressor={this.props.effectsEx.compressor}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <FiltersPreListItem
                origin={this.props.origin.filters}
                filters={this.props.effectsEx.filters}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <BoostListItem
                origin={this.props.origin.boost}
                boost={this.props.effectsEx.boost}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <PreAmpListItem
                origin={this.props.origin.pre}
                pre={this.props.effectsEx.pre}
                changeEffectsEx={this.props.changeEffectsEx}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <VcaListItem
                origin={this.props.origin.vca}
                vca={this.props.effectsEx.vca}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <PhaserListItem
                origin={this.props.origin.phaser}
                phaser={this.props.effectsEx.phaser}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <FiltersPostListItem
                origin={this.props.origin.filters}
                filters={this.props.effectsEx.filters}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <ModulationListItem
                origin={this.props.origin.modulation}
                modulation={this.props.effectsEx.modulation}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <DelayListItem
                origin={this.props.origin.delay}
                delay={this.props.effectsEx.delay}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <DspListItem
                origin={this.props.origin.dsp}
                dsp={this.props.effectsEx.dsp}
                changeEffectsEx={this.props.changeEffectsEx}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <AuxRoutingListItem
                origin={this.props.origin.aux}
                aux={this.props.effectsEx.aux}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <VolumeListItem
                origin={this.props.origin.volume}
                volume={this.props.effectsEx.volume}
                changeEffects={this.props.changeEffects}
                selectEffect={this.props.selectEffect}
            />
        );
        components.push(
            <NoiseGateListItem
                origin={this.props.origin.noiseGate}
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
            changeEffects: (effects: RecursivePartial<Effects>): void => {
                dispatch(createChangeEffectsAction(effects));
            },
            changeEffectsEx: (effectsEx: RecursivePartial<EffectsEx>): void => {
                dispatch(createChangeEffectsExAction(effectsEx));
            },
            selectEffect: (effectName: EffectNames, component?: string) => {
                dispatch(createSelectEffectAction(effectName, component));
            }
        };
    };

export default connect(undefined /*extractComponentPropsFromState*/, createActionObject)(EffectsExList);