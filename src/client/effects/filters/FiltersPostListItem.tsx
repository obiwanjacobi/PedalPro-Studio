import * as React from "react";
import { List } from "@material-ui/core";

import { Filters, FiltersComponentNames } from "./Filters";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";
import { FilterRouting, FilterRoutingValue } from "../../../model/Filters";
import { EffectsListItemOption } from "../EffectsListItemOption";

type FiltersPostListItemProps = {
    filters: Filters;
};
type FiltersPostListItemActions = ChangeEffects & SelectEffect;
type FiltersPostListItemAllProps = FiltersPostListItemProps & FiltersPostListItemActions;
type FiltersPostListItemState = {};

export class FiltersPostListItem extends React.Component<FiltersPostListItemAllProps, FiltersPostListItemState> {
    private routing: FilterRoutingValue;

    public constructor(props: FiltersPostListItemAllProps) {
        super(props);
        this.onFilter1 = this.onFilter1.bind(this);
        this.onChangeFilter1 = this.onChangeFilter1.bind(this);
        this.onFilter2 = this.onFilter2.bind(this);
        this.onChangeFilter2 = this.onChangeFilter2.bind(this);
        this.onChangeFilter2Left = this.onChangeFilter2Left.bind(this);

        this.routing = new FilterRoutingValue(props.filters.routing);
    }
    
    public componentWillReceiveProps(newProps: FiltersPostListItemAllProps, _: FiltersPostListItemState) {
        this.routing = new FilterRoutingValue(newProps.filters.routing);
    }

    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.filters.routing !== FilterRouting.Bypass}
                selected={this.props.filters.ui.selected}
                title="FIlters (post)"
                avatar="Fil"
                effectName={{ effectName: EffectNames.Filters }}
                selectEffect={this.props.selectEffect}
                content={this.renderActionList()}
            />
        );
    }

    private renderActionList(): React.ReactNode {
        return (
            <List>
                <EffectsListItemOption
                    label="Filter 1"
                    enabledRight={false}
                    enabledLeft={this.routing.postFilter1Left}
                    onChangeLeft={this.onChangeFilter1}
                    onSelect={this.onFilter1}
                />
                <EffectsListItemOption
                    label="Filter 2"
                    enabledRight={this.routing.postFilter2Right}
                    enabledLeft={this.routing.postFilter2Left}
                    onChangeRight={this.onChangeFilter2}
                    onChangeLeft={this.onChangeFilter2Left}
                    onSelect={this.onFilter2}
                />
            </List>
        );
    }

    private onFilter1() {
        if (this.routing.postFilter1Left) {
            this.selectComponent(true, FiltersComponentNames.Filter1);
        }
    }

    private onChangeFilter1(checked: boolean) {
        this.props.changeEffects({ filters: { routing: this.routing.setPostFilter1Left(checked) }});
        this.selectComponent(checked, FiltersComponentNames.Filter1);
    }

    private onFilter2() {
        if (this.routing.postFilter2Right) {
            this.selectComponent(true, FiltersComponentNames.Filter2);
        }
    }

    private onChangeFilter2(checked: boolean) {
        this.props.changeEffects({ filters: { routing: this.routing.setPostFilter2Right(checked) }});
        this.selectComponent(checked, FiltersComponentNames.Filter2);
    }

    private onChangeFilter2Left(checked: boolean) {
        this.props.changeEffects({ filters: { routing: this.routing.setPostFilter2Left(checked) }});
        this.selectComponent(checked, FiltersComponentNames.Filter2);
    }

    private selectComponent(enabled: boolean, componentName: FiltersComponentNames) {
        if (enabled) {
            this.props.selectEffect(EffectNames.Filters, componentName);
        } else {
            this.props.selectEffect(EffectNames.None);
        }
    }
}