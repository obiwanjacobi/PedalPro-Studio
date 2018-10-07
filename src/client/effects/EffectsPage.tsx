import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import {
    IconButton, Dialog, Button
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";

import { ApplicationDocument } from "../ApplicationDocument";
import { ApplicationToolbar } from "../controls/ApplicationToolbar";
import { Title } from "../controls/Title";
import { Preset } from "../preset/Preset";
import { Effects, EffectsEx } from "./Effects";
import { EditEffects, createEditEffectsAction } from "./EditEffectsAction";
import { SaveEffects, SaveEffectsEx, createSaveEffectsAction, createSaveEffectsExAction } from "./SaveEffectsAction";
import { EffectsView } from "./EffectsView";
import { EffectsExView } from "./EffectsExView";
import { asEffects, asEffectsEx } from "./EffectsOperations";

type EffectsPageProps = {};
type EffectsPageStoreProps = {
    preset?: Preset;
    effects?: Effects;
    effectsEx?: EffectsEx;
};
type EffectsPageActions = SaveEffects & SaveEffectsEx & EditEffects;
type EffectsPageAllProps = EffectsPageActions & EffectsPageStoreProps & EffectsPageProps;
type EffectsPageState = {};

class EffectsPage extends React.Component<EffectsPageAllProps, EffectsPageState> {
    constructor(props: EffectsPageAllProps) {
        super(props);

        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
    }

    public render() {
        return (
            <Dialog open={this.isOpen} fullScreen={true}>
                <ApplicationToolbar>
                    <IconButton onClick={this.close}>
                        <Clear />
                    </IconButton>
                    <Title caption="Edit Effects" prelude="" />
                    <Button onClick={this.save}>
                        Save
                    </Button>
                </ApplicationToolbar>
                {this.props.effectsEx &&
                    <EffectsExView effectsEx={this.props.effectsEx} />}
                {this.props.effects &&
                    <EffectsView effects={this.props.effects} />}
            </Dialog>
        );
    }

    private close() {
        this.props.editEffects(undefined);
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
            saveEffects: (effects: Effects) => {
                dispatch(createSaveEffectsAction(effects));
            },
            saveEffectsEx: (effectsEx: EffectsEx) => {
                dispatch(createSaveEffectsExAction(effectsEx));
            }
        };
};

export default connect(extractComponentPropsFromState, createActionObject)(EffectsPage);