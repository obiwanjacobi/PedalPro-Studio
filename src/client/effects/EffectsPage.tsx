import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
    IconButton, Dialog, Button, Drawer
} from "@material-ui/core";
import { Clear, Settings } from "@material-ui/icons";

import { ApplicationDocument } from "../ApplicationDocument";
import { ApplicationToolbar } from "../controls/ApplicationToolbar";
import { Title } from "../controls/Title";
import { Preset } from "../preset/Preset";
import { Effects, EffectsEx } from "./Effects";
import { EditEffects, createEditEffectsAction } from "./EditEffectsAction";
import { SaveEffects, SaveEffectsEx, createSaveEffectsAction, createSaveEffectsExAction } from "./SaveEffectsAction";
import { EffectsView } from "./EffectsView";
import { EffectsExView } from "./EffectsExView";
import { asEffects, asEffectsEx, effectsEqual } from "./EffectsOperations";
import { EffectsControlSettings } from "./EffectsControlSettings";
import { ChangeEffects, createChangeEffectsAction } from "./ChangeEffectsAction";
import { RecursivePartial } from "../../TypeExtensions";

type EffectsPageProps = {};
type EffectsPageStoreProps = {
    readonly: boolean,
    preset?: Preset;
    effects?: Effects;
    effectsEx?: EffectsEx;
};
type EffectsPageActions = SaveEffects & SaveEffectsEx & ChangeEffects & EditEffects;
type EffectsPageAllProps = EffectsPageActions & EffectsPageStoreProps & EffectsPageProps;
type EffectsPageState = {
    drawerOpen: boolean;
};
class EffectsPage extends React.Component<EffectsPageAllProps, EffectsPageState> {
    constructor(props: EffectsPageAllProps) {
        super(props);
        this.state = { drawerOpen: false };

        this.close = this.close.bind(this);
        this.save = this.save.bind(this);

        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
    }

    public render() {
        return (
            <Dialog open={this.isOpen} fullScreen={true}>
                <ApplicationToolbar>
                    <IconButton onClick={this.close}>
                        <Clear />
                    </IconButton>
                    {this.props.preset &&
                        <Title
                            pre={this.props.preset.group ? this.props.preset.group.name : undefined}
                            caption={this.props.preset.name}
                            sub={this.props.preset.source.toString().toUpperCase()}
                        />}
                    <IconButton onClick={this.openDrawer}>
                        <Settings />
                    </IconButton>
                    {!this.props.readonly &&
                        <Button disabled={!this.effectsHasChanged} onClick={this.save}>
                            Save
                    </Button>}
                </ApplicationToolbar>
                {this.props.effectsEx && this.props.preset &&
                    <EffectsExView effectsEx={this.props.effectsEx} origin={this.props.preset.effects as EffectsEx} />}
                {this.props.effects && this.props.preset &&
                    <EffectsView effects={this.props.effects} origin={this.props.preset.effects as Effects} />}
                <Drawer anchor="right" open={this.state.drawerOpen}>
                    <ApplicationToolbar>
                        <IconButton onClick={this.closeDrawer}>
                            <Clear />
                        </IconButton>
                        <Title caption="Preset Control" />
                    </ApplicationToolbar>
                    <EffectsControlSettings
                        effects={this.props.effects || this.props.effectsEx}
                        changeEffects={this.props.changeEffects}
                    />
                </Drawer>
            </Dialog>
        );
    }

    private get effectsHasChanged(): boolean {
        if (this.props.preset && this.props.effects) {
            return !effectsEqual(this.props.preset.effects, this.props.effects);
        }
        if (this.props.preset && this.props.effectsEx) {
            return !effectsEqual(this.props.preset.effects, this.props.effectsEx);
        }

        return false;
    }

    private openDrawer() {
        this.setState({ drawerOpen: true });
    }

    private closeDrawer() {
        this.setState({ drawerOpen: false });
    }

    private close() {
        // clear edit
        this.props.editEffects();
    }

    private save() {
        if (this.props.effects) {
            this.props.saveEffects(this.props.effects);
        }
        if (this.props.effectsEx) {
            this.props.saveEffectsEx(this.props.effectsEx);
        }
        this.close();
    }

    private get isOpen(): boolean {
        return !!this.props.effects || !!this.props.effectsEx;
    }
}

const extractComponentPropsFromState = (state: ApplicationDocument): EffectsPageStoreProps => {
    if (state.editEffects) {
        return {
            readonly: state.editEffects.readonly,
            preset: state.editEffects.preset,
            effects: asEffects(state.editEffects.effectsOrEx) as Effects,
            effectsEx: asEffectsEx(state.editEffects.effectsOrEx) as EffectsEx,
        };
    }
    return { readonly: true };
};

const createActionObject = (dispatch: Dispatch): EffectsPageActions => {
    return {
        editEffects: (preset?: Preset) => {
            dispatch(createEditEffectsAction(preset));
        },
        changeEffects: (effects: RecursivePartial<Effects>) => {
            dispatch(createChangeEffectsAction(effects));
        },
        saveEffects: (effects: Effects) => {
            dispatch(createSaveEffectsAction(effects));
        },
        saveEffectsEx: (effectsEx: EffectsEx) => {
            dispatch(createSaveEffectsExAction(effectsEx));
        }
    };
};

export default connect(extractComponentPropsFromState, createActionObject)(EffectsPage);