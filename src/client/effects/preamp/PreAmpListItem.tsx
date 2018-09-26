import * as React from "react";
import { List, ListItem, ListItemText, ListItemSecondaryAction, Switch } from "@material-ui/core";

import { PreAmp, PreAmpComponentNames } from "./PreAmp";
import { EffectsItemCard } from "../EffectsItemCard";
import { ChangeEffects } from "../ChangeEffectsAction";
import { EffectNames } from "../Effects";
import { SelectEffect } from "../SelectEffectAction";
import { PreAmpRoutingValue } from "../../../model/PreAmp";

type PreAmpListItemProps = {
    pre: PreAmp;
};
type PreAmpListItemActions = ChangeEffects & SelectEffect;
type PreAmpListItemAllProps = PreAmpListItemProps & PreAmpListItemActions;
type PreAmpListItemState = {};

export class PreAmpListItem extends React.Component<PreAmpListItemAllProps, PreAmpListItemState> {
    private routingValue: PreAmpRoutingValue;

    public constructor(props: PreAmpListItemAllProps) {
        super(props);
        this.onEnabled = this.onEnabled.bind(this);
        this.onEmphasis = this.onEmphasis.bind(this);
        this.onDistortionDiode = this.onDistortionDiode.bind(this);
        this.onDistortionFet = this.onDistortionFet.bind(this);
        this.onFuzz = this.onFuzz.bind(this);
        this.onEqualizer = this.onEqualizer.bind(this);
        this.onChangeDistortionDiode = this.onChangeDistortionDiode.bind(this);
        this.onChangeDistortionFet = this.onChangeDistortionFet.bind(this);
        this.onChangeFuzz = this.onChangeFuzz.bind(this);

        this.routingValue = new PreAmpRoutingValue(props.pre.routing);
    }
    
    public componentWillReceiveProps(newProps: PreAmpListItemAllProps, _: PreAmpListItemState) {
        this.routingValue = new PreAmpRoutingValue(newProps.pre.routing);
    }

    public render() {
        return (
            <EffectsItemCard
                enabled={this.props.pre.enabled}
                title="PreAmp"
                avatar="Pre"
                onEnabled={this.onEnabled}
                effectName={{ effectName: EffectNames.PreAmp }}
                selectEffect={this.props.selectEffect}
                content={this.renderActionList()}
            />
        );
    }

    private renderActionList(): React.ReactNode {
        return (
            <List>
                <ListItem button={true} onClick={this.onEmphasis}>
                    <ListItemText primary="Emphasis" />
                    <ListItemSecondaryAction>
                        <Switch checked={true} disabled={true} color="secondary" />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button={this.routingValue.distortionDiode} onClick={this.onDistortionDiode}>
                    <ListItemText primary="Distortion (diode)" />
                    <ListItemSecondaryAction>
                        <Switch 
                            checked={this.routingValue.distortionDiode} 
                            onChange={this.onChangeDistortionDiode} 
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button={this.routingValue.distortionFet} onClick={this.onDistortionFet}>
                    <ListItemText primary="Distortion (jfet)" />
                    <ListItemSecondaryAction>
                    <Switch 
                        checked={this.routingValue.distortionFet} 
                        onChange={this.onChangeDistortionFet} 
                    />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button={this.routingValue.fuzz} onClick={this.onFuzz}>
                    <ListItemText primary="Fuzz" />
                    <ListItemSecondaryAction>
                    <Switch
                        checked={this.routingValue.fuzz} 
                        onChange={this.onChangeFuzz}
                    />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button={true} onClick={this.onEqualizer}>
                    <ListItemText primary="Equalizer" />
                    <ListItemSecondaryAction>
                        <Switch checked={true} disabled={true} color="secondary" />
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        );
    }

    private onChangeDistortionDiode(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
        this.props.changeEffects({ pre: { routing: this.routingValue.setDistortionDiode(checked) }});
        if (checked) { this.selectComponent(PreAmpComponentNames.DistortionDiode); }
    }

    private onChangeDistortionFet(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
        this.props.changeEffects({ pre: { routing: this.routingValue.setDistortionFet(checked) }});
        if (checked) { this.selectComponent(PreAmpComponentNames.DistortionFet); }
    }

    private onChangeFuzz(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
        this.props.changeEffects({ pre: { routing: this.routingValue.setFuzz(checked) }});
        if (checked) { this.selectComponent(PreAmpComponentNames.Fuzz); }
    }

    private onEnabled(enabled: boolean) {
        this.props.changeEffects({ pre: { enabled: enabled } });
    }

    private onEmphasis() {
        this.selectComponent(PreAmpComponentNames.Emphasis);
    }

    private onDistortionDiode() {
        if (this.routingValue.distortionDiode) {
            this.selectComponent(PreAmpComponentNames.DistortionDiode);
        }
    }

    private onDistortionFet() {
        if (this.routingValue.distortionFet) {
            this.selectComponent(PreAmpComponentNames.DistortionFet);
        }
    }

    private onFuzz() {
        if (this.routingValue.fuzz) {
            this.selectComponent(PreAmpComponentNames.Fuzz);
        }
    }

    private onEqualizer() {
        this.selectComponent(PreAmpComponentNames.Equalizer);
    }

    private selectComponent(componentName: PreAmpComponentNames) {
        this.props.selectEffect(EffectNames.PreAmp, componentName);
    }
}