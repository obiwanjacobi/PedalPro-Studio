import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";

import { Dialog, Slide, IconButton } from "material-ui";
import CloseIcon from "material-ui-icons/Close";

import { toBool } from "../Extensions";

import ApplicationDocument, { ScreenState } from "../client/ApplicationDocument";
import { UpdateScreen, createUpdateScreenAction } from "../client/UpdateScreenAction";

import ApplicationToolbar from "./ApplicationToolbar";

// @ts-ignore: copy paste from inet
const Transition = (props) => {
    return <Slide direction="up" {...props} />;
};

export interface TargetPresetsScreenProps { }
export interface TargetPresetsScreenStateProps { 
    open: boolean;
}
export type TargetPresetsScreenAction = UpdateScreen;

export type TargetPresetsScreenAllProps = 
    TargetPresetsScreenProps & TargetPresetsScreenStateProps & TargetPresetsScreenAction;

export class TargetPresetsScreen extends React.Component<TargetPresetsScreenAllProps> {
    public render(): React.ReactNode {
        return (
            <Dialog
                fullScreen={true}
                open={this.props.open}
                onClose={() => this.close()}
                transition={Transition}
            >
                <ApplicationToolbar>
                    <IconButton onClick={() => this.close()}>
                        <CloseIcon />
                    </IconButton>
                </ApplicationToolbar>
            </Dialog>
        );
    }

    private close() {
        this.props.updateScreen(new ScreenState(false));
    }
}

const extractComponentPropsFromState: MapStateToProps<
TargetPresetsScreenStateProps, TargetPresetsScreenProps, ApplicationDocument
    > = (state: ApplicationDocument, props: TargetPresetsScreenProps): TargetPresetsScreenStateProps => {
        return  { 
            open: toBool(state.screen.targetPresetDialogOpen)
        };
};

const createActionObject: MapDispatchToPropsFunction<TargetPresetsScreenAction, TargetPresetsScreenProps> =
    (dispatch: Dispatch<ApplicationDocument>, props: TargetPresetsScreenProps): TargetPresetsScreenAction => {
        return {
            updateScreen: (screen: ScreenState): void => {
                dispatch(createUpdateScreenAction(screen));
            }
        };
};

export default connect(extractComponentPropsFromState, createActionObject)(TargetPresetsScreen);