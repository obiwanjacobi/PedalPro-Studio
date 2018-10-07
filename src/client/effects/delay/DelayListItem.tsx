import * as React from "react";

import { Delay } from "./Delay";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffectsEx } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";
import { EffectsListItemOption } from "../EffectsListItemOption";
import { DelayRouting } from "../../../model/Delay";

type DelayListItemProps = {
    delay: Delay;
};
type DelayListItemActions = ChangeEffectsEx & SelectEffect;
type DelayListItemAllProps = DelayListItemProps & DelayListItemActions;
type DelayListItemState = {};

export class DelayListItem extends React.Component<DelayListItemAllProps, DelayListItemState> {
    public constructor(props: DelayListItemAllProps) {
        super(props);
        this.onDelay = this.onDelay.bind(this);
        this.onChangeDelayRight = this.onChangeDelayRight.bind(this);
        this.onChangeDelayLeft = this.onChangeDelayLeft.bind(this);
    }
    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.delay.routing !== DelayRouting.None}
                selected={this.props.delay.ui.selected}
                title="Delay"
                avatar="Dly"
                effectName={{ effectName: EffectNames.Delay }}
                selectEffect={this.props.selectEffect}
                content={<EffectsListItemOption
                    label="Delay"
                    enabledLeft={this.props.delay.routing === DelayRouting.Left}
                    enabledRight={this.props.delay.routing === DelayRouting.Right}
                    onChangeLeft={this.onChangeDelayLeft}
                    onChangeRight={this.onChangeDelayRight}
                    onSelect={this.onDelay}
                />}
            />
        );
    }

    private onDelay() {
        if (this.props.delay.routing !== DelayRouting.None) {
            this.selectComponent(true);
        }
    }

    private onChangeDelayRight(checked: boolean) {
        this.props.changeEffectsEx({ delay: { routing: checked ? DelayRouting.Right : DelayRouting.None }});
        this.selectComponent(checked);
    }

    private onChangeDelayLeft(checked: boolean) {
        this.props.changeEffectsEx({ delay: { routing: checked ? DelayRouting.Left : DelayRouting.None }});
        this.selectComponent(checked);
    }

    private selectComponent(enabled: boolean) {
        this.props.selectEffect(enabled ? EffectNames.Delay : EffectNames.None);
    }
}