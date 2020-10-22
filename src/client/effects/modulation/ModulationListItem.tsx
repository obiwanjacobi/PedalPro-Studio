import * as React from "react";

import { Modulation, ModulationComponentNames } from "./Modulation";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";
import { ModulationMode } from "../../../model/Modulation";
import { List, ListItem, ListItemText, ListItemSecondaryAction, Switch } from "@material-ui/core";
import { effectEqual } from "../EffectsOperations";

type ModulationListItemProps = {
    modulation: Modulation;
    origin: Modulation;
};
type ModulationListItemActions = ChangeEffects & SelectEffect;
type ModulationListItemAllProps = ModulationListItemProps & ModulationListItemActions;

export class ModulationListItem extends React.Component<ModulationListItemAllProps> {
    public constructor(props: ModulationListItemAllProps) {
        super(props);
        this.onChorus = this.onChorus.bind(this);
        this.onChangeChorus = this.onChangeChorus.bind(this);
        this.onFlanger = this.onFlanger.bind(this);
        this.onChangeFlanger = this.onChangeFlanger.bind(this);
        this.onVibe = this.onVibe.bind(this);
        this.onChangeVibe = this.onChangeVibe.bind(this);
    }

    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.modulation.mode !== ModulationMode.None}
                selected={this.props.modulation.ui.selected}
                changed={!effectEqual(this.props.modulation, this.props.origin)}
                title="Modulation"
                avatar="Mod"
                content={this.renderActionList()}
            />
        );
    }

    private renderActionList(): React.ReactNode {
        return (
            <List>
                <ListItem button={this.isChorus} onClick={this.onChorus}>
                    <ListItemText>Chorus</ListItemText>
                    <ListItemSecondaryAction>
                        <Switch checked={this.isChorus} onChange={this.onChangeChorus} />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button={this.isFlanger} onClick={this.onFlanger}>
                    <ListItemText>Flanger</ListItemText>
                    <ListItemSecondaryAction>
                        <Switch checked={this.isFlanger} onChange={this.onChangeFlanger} />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button={this.isVibe} onClick={this.onVibe}>
                    <ListItemText>Vibe</ListItemText>
                    <ListItemSecondaryAction>
                        <Switch checked={this.isVibe} onChange={this.onChangeVibe} />
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        );
    }

    private get isChorus(): boolean {
        return this.props.modulation.mode === ModulationMode.Chorus;
    }

    private onChorus() {
        if (this.isChorus) {
            this.selectEffect(true, ModulationComponentNames.Chorus);
        }
    }
    private onChangeChorus(_: React.ChangeEvent<HTMLInputElement>, enabled: boolean) {
        this.props.changeEffects({ modulation: { mode: enabled ? ModulationMode.Chorus : ModulationMode.None } });
        this.selectEffect(enabled, ModulationComponentNames.Chorus);
    }

    private get isFlanger(): boolean {
        return this.props.modulation.mode === ModulationMode.Flanger;
    }

    private onFlanger() {
        if (this.isFlanger) {
            this.selectEffect(true, ModulationComponentNames.Flanger);
        }
    }
    private onChangeFlanger(_: React.ChangeEvent<HTMLInputElement>, enabled: boolean) {
        this.props.changeEffects({ modulation: { mode: enabled ? ModulationMode.Flanger : ModulationMode.None } });
        this.selectEffect(enabled, ModulationComponentNames.Flanger);
    }

    private get isVibe(): boolean {
        return this.props.modulation.mode === ModulationMode.ChorusVibe;
    }

    private onVibe() {
        if (this.isVibe) {
            this.selectEffect(true, ModulationComponentNames.Vibe);
        }
    }
    private onChangeVibe(_: React.ChangeEvent<HTMLInputElement>, enabled: boolean) {
        this.props.changeEffects({ modulation: { mode: enabled ? ModulationMode.ChorusVibe : ModulationMode.None } });
        this.selectEffect(enabled, ModulationComponentNames.Vibe);
    }

    private selectEffect(enabled: boolean, componentName: ModulationComponentNames) {
        if (enabled) {
            this.props.selectEffect(EffectNames.Modulation, componentName);
        } else {
            this.props.selectEffect(EffectNames.None);
        }
    }
}