import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
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
import { asEffects, asEffectsEx, hasChanged } from "./EffectsOperations";
import { EffectsSettings } from "./EffectsSettings";
import { ChangeEffects, createChangeEffectsAction } from "./ChangeEffectsAction";
import { RecursivePartial } from "../../TypeExtensions";

type EffectsPageProps = {};
type EffectsPageStoreProps = {
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
                        <Settings/>
                    </IconButton>
                    <Button disabled={!this.effectsHasChanged} onClick={this.save}>
                        Save
                    </Button>
                </ApplicationToolbar>
                {this.props.effectsEx &&
                    <EffectsExView effectsEx={this.props.effectsEx} />}
                {this.props.effects &&
                    <EffectsView effects={this.props.effects} />}
                <Drawer anchor="right" open={this.state.drawerOpen}>
                    <ApplicationToolbar>
                        <IconButton onClick={this.closeDrawer}>
                            <Clear />
                        </IconButton>
                        <Title caption="Preset Control" />
                    </ApplicationToolbar>
                    <EffectsSettings 
                        effects={this.props.effects || this.props.effectsEx} 
                        changeEffects={this.props.changeEffects} 
                    />
                </Drawer>
            </Dialog>
        );
    }

    private get effectsHasChanged(): boolean {
        if (this.props.effects) {
            return hasChanged(this.props.effects);
        }
        if (this.props.effectsEx) {
            return hasChanged(this.props.effectsEx);
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

type ExtractStatePropFunc = MapStateToProps<EffectsPageStoreProps, EffectsPageProps, ApplicationDocument>;
const extractComponentPropsFromState: ExtractStatePropFunc = (
    state: ApplicationDocument, _: EffectsPageProps): EffectsPageStoreProps => {
        if (state.editEffects) {
            return  { 
                preset: state.editEffects.preset,
                effects: asEffects(state.editEffects.effectsOrEx) as Effects,
                effectsEx: asEffectsEx(state.editEffects.effectsOrEx) as EffectsEx,
            };
        }
        return {};
};

type ActionDispatchFunc = MapDispatchToPropsFunction<EffectsPageActions, EffectsPageProps>;
const createActionObject: ActionDispatchFunc =
    (dispatch: Dispatch, _: EffectsPageProps): EffectsPageActions => {
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