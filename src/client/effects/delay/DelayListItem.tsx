import * as React from "react";
import { List } from "@material-ui/core";

import { Delay } from "./Delay";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";
import { EffectsListItemOption } from "../EffectsListItemOption";
import { DelayRouting } from "../../../model/Delay";
import { effectHasChanged } from "../EffectsOperations";

type DelayListItemProps = {
    delay: Delay;
};
type DelayListItemActions = ChangeEffects & SelectEffect;
type DelayListItemAllProps = DelayListItemProps & DelayListItemActions;

export class DelayListItem extends React.Component<DelayListItemAllProps> {
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
                changed={effectHasChanged(this.props.delay)}
                title="Delay"
                avatar="Dly"
                effectName={{ effectName: EffectNames.Delay }}
                selectEffect={this.props.selectEffect}
                content={this.renderActionList()}
            />
        );
    }

    private renderActionList(): React.ReactNode {
        return (
            <List>
                <EffectsListItemOption
                    label="Delay"
                    enabledLeft={this.props.delay.routing === DelayRouting.Left}
                    enabledRight={this.props.delay.routing === DelayRouting.Right}
                    onChangeLeft={this.onChangeDelayLeft}
                    onChangeRight={this.onChangeDelayRight}
                    onSelect={this.onDelay}
                />
            </List>
        );
    }
    private onDelay() {
        if (this.props.delay.routing !== DelayRouting.None) {
            this.selectComponent(true);
        }
    }

    private onChangeDelayRight(checked: boolean) {
        this.props.changeEffects({ delay: { routing: checked ? DelayRouting.Right : DelayRouting.None }});
        this.selectComponent(checked);
    }

    private onChangeDelayLeft(checked: boolean) {
        this.props.changeEffects({ delay: { routing: checked ? DelayRouting.Left : DelayRouting.None }});
        this.selectComponent(checked);
    }

    private selectComponent(enabled: boolean) {
        this.props.selectEffect(enabled ? EffectNames.Delay : EffectNames.None);
    }
}