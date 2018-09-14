import * as React from "react";
import { connect, Dispatch, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import {
    IconButton, Dialog, Button
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";

import { ApplicationDocument } from "../ApplicationDocument";
import { ApplicationToolbar } from "../controls/ApplicationToolbar";
import { Title } from "../controls/Title";
import { Preset } from "../preset/Preset";
import { Effects, EffectsEx } from "../../model/Effects";
import { EditEffects, createEditEffectsAction } from "./EditEffectsAction";

type EffectsPageProps = {};
type EffectsPageStoreProps = {
    preset?: Preset;
    effects?: Effects;
    effectsEx?: EffectsEx;
};
type EffectsPageActions = EditEffects;
type EffectsPageAllProps = EffectsPageActions & EffectsPageStoreProps & EffectsPageProps;
type EffectsPageState = {};

class EffectsPage extends React.Component<EffectsPageAllProps, EffectsPageState> {
    constructor(props: EffectsPageAllProps) {
        super(props);

        this.close = this.close.bind(this);
    }

    public render() {
        return (
            <Dialog open={this.isOpen} fullScreen={true}>
                <ApplicationToolbar>
                    <IconButton onClick={this.close}>
                        <Clear />
                    </IconButton>
                    <Title caption="Edit Effects" prelude="" />
                    <Button>
                        Save
                    </Button>
                </ApplicationToolbar>
            </Dialog>
        );
    }

    private close() {
        this.props.editEffects(undefined);
    }
    private get isOpen(): boolean {
        return !!this.props.effects || !!this.props.effectsEx;
    }
}

type ExtractStatePropFunc = MapStateToProps<EffectsPageStoreProps, EffectsPageProps, ApplicationDocument>;
const extractComponentPropsFromState: ExtractStatePropFunc = (
    state: ApplicationDocument, _: EffectsPageProps): EffectsPageStoreProps => {
        if (state.effects) {
            return  { 
                preset: state.effects.preset,
                effects: state.effects.preset.effects as Effects,
                effectsEx: state.effects.preset.effects as EffectsEx,
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
            }
        };
};

export default connect(extractComponentPropsFromState, createActionObject)(EffectsPage);