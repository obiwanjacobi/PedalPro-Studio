import * as React from "react";
import { connect, MapStateToProps } from "react-redux";
import { LinearProgress, Popover, Typography } from "material-ui";

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
            <Popover
                anchorOrigin={{ vertical: "center", horizontal: "center" }}
                open={!!this.props.progress}
                marginThreshold={32}
            >
                {this.renderMessage()}
            </Popover>
        );
    }

    private renderMessage() {
        if (!this.props.progress) { return <span />; }
        return (
            <div style={{ padding: 16 }}>
                <Typography align="center" gutterBottom={true} variant="body2">{this.props.progress.title}</Typography>
                <Typography align="center" color="secondary">{this.props.progress.message}</Typography>
                <LinearProgress variant="determinate" value={this.props.progress.percent} />
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
