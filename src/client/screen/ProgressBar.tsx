import * as React from "react";
import { connect, MapStateToProps } from "react-redux";

import { LinearProgress, Typography, Snackbar } from "material-ui";

import { ProgressInfo } from "./ScreenState";
import { ApplicationDocument } from "../ApplicationDocument";

export interface ProgressBarProps { }
export interface ProgressBarStateProps {
    progress?: ProgressInfo;
}
export interface ProgressBarState { }

export type ProgressBarAllProps = ProgressBarStateProps & ProgressBarProps & ProgressBarState;

export class ProgressBar extends React.Component<ProgressBarAllProps, ProgressBarState> {
    public constructor(props: ProgressBarAllProps) {
        super(props);
    }

    public render() {
        return (
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={!!this.props.progress}
                message={this.renderMessage()}
            />
        );
    }

    private renderMessage() {
        if (!this.props.progress) { return <span />; }
        return (
            <div>
                <Typography>{this.props.progress.title}</Typography>
                <Typography>{this.props.progress.message}</Typography>
                <LinearProgress mode="determinate" value={this.props.progress.percent} />
            </div>
        );
    }
}

const extractComponentPropsFromState: MapStateToProps<
        ProgressBarStateProps, ProgressBarProps, ApplicationDocument
    > = (state: ApplicationDocument, _: ProgressBarProps): ProgressBarStateProps => {
        return  { progress: state.screen.progress };
};

export default connect(extractComponentPropsFromState)(ProgressBar);
