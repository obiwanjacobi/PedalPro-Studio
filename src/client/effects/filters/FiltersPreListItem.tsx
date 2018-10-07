import * as React from "react";
import { List, ListItem, ListItemText, ListItemSecondaryAction, Switch } from "@material-ui/core";

import { Filters, FiltersComponentNames } from "./Filters";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";
import { FilterRouting, FilterRoutingValue } from "../../../model/Filters";

type FiltersPreListItemProps = {
    filters: Filters;
};
type FiltersPreListItemActions = ChangeEffects & SelectEffect;
type FiltersPreListItemAllProps = FiltersPreListItemProps & FiltersPreListItemActions;
type FiltersPreListItemState = {};

export class FiltersPreListItem extends React.Component<FiltersPreListItemAllProps, FiltersPreListItemState> {
    private routing: FilterRoutingValue;

    public constructor(props: FiltersPreListItemAllProps) {
        super(props);
        this.onFilter1 = this.onFilter1.bind(this);
        this.onChangeFilter1 = this.onChangeFilter1.bind(this);
        this.onFilter2 = this.onFilter2.bind(this);
        this.onChangeFilter2 = this.onChangeFilter2.bind(this);

        this.routing = new FilterRoutingValue(props.filters.routing);
    }
    
    public componentWillReceiveProps(newProps: FiltersPreListItemAllProps, _: FiltersPreListItemState) {
        this.routing = new FilterRoutingValue(newProps.filters.routing);
    }

    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.filters.routing !== FilterRouting.Bypass}
                selected={this.props.filters.ui.selected}
                title="FIlters (pre)"
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
                <ListItem button={this.routing.preFilter1} onClick={this.onFilter1}>
                    <ListItemText>Filter 1</ListItemText>
                    <ListItemSecondaryAction>
                        <Switch checked={this.routing.preFilter1} onChange={this.onChangeFilter1}/>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button={this.routing.preFilter2} onClick={this.onFilter2}>
                    <ListItemText>Filter 2</ListItemText>
                    <ListItemSecondaryAction>
                        <Switch checked={this.routing.preFilter2} onChange={this.onChangeFilter2}/>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        );
    }

    private onFilter1() {
        if (this.routing.preFilter1) {
            this.selectComponent(true, FiltersComponentNames.Filter1);
        }
    }

    private onChangeFilter1(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
        this.props.changeEffects({ filters: { routing: this.routing.setPreFilter1(checked) }});
        this.selectComponent(checked, FiltersComponentNames.Filter1);
    }

    private onFilter2() {
        if (this.routing.preFilter2) {
            this.selectComponent(true, FiltersComponentNames.Filter2);
        }
    }

    private onChangeFilter2(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
        this.props.changeEffects({ filters: { routing: this.routing.setPreFilter2(checked) }});
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