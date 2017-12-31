import * as React from "react";
import { Paper, Typography } from "material-ui";
// import { Theme, withStyles } from "material-ui/styles";

export interface PresetSummaryProps {
    index: number;
    name: string;
}

export interface PresetSummaryState { 
    // nothing
}

export class PresetSummary extends React.Component<PresetSummaryProps, PresetSummaryState> {

    public render(): React.ReactNode {
        return (
            <Paper elevation={4}>
                <Typography component="h3">
                    {this.props.name}
                </Typography>
                <Typography component="p">
                    {this.props.index}
                </Typography>
            </Paper>
        );
    }
}

// const styles = (theme: Theme) => ({
//     root: theme.mixins.gutters({
//       paddingTop: 16,
//       paddingBottom: 16,
//       marginTop: theme.spacing.unit * 3,
//     }),
//   });

// export default withStyles(styles)(PresetSummary);