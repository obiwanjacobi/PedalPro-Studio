import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { Typography } from "material-ui";

import { Preset } from "../client/Preset";
import { SelectedView } from "../client/controls/SelectedView";
import { ApplicationDocument, PresetCollectionType } from "../client/ApplicationDocument";
import { LoadPresets, createLoadPresetsAction } from "../client/LoadPresetsAction";
import { SelectPresets, createSelectPresetsAction } from "../client/SelectPresetsAction";
import { CopyPresets, createCopyPresetsAction } from "../client/CopyPresetsAction";

import { PresetToolbar } from "./PresetToolbar";
import { PresetView } from "./PresetView";

export interface FactoryPresetTabProps { }
export interface FactoryPresetTabStateProps { 
    presets: Preset[];
}
export type FactoryPresetTabActions = SelectPresets & LoadPresets & CopyPresets;
export type FactoryPresetTabAllProps = 
    FactoryPresetTabProps & FactoryPresetTabStateProps & FactoryPresetTabActions;

const conatinerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
};

export class FactoryPresetTab extends React.Component<FactoryPresetTabAllProps> {
    private selection: SelectedView<Preset>;

    public constructor(props: FactoryPresetTabAllProps) {
        super(props);
        this.selection = new SelectedView(props.presets);
        // bind event handlers
        this.onCopySelected = this.onCopySelected.bind(this);
        this.toggleSelectAll = this.toggleSelectAll.bind(this);
    }

    public render() {
        return (
            <div id="FactoryPresetTab" style={conatinerStyles}>
                <PresetToolbar 
                    enableCopy={this.selection.anySelected}
                    onCopy={this.onCopySelected}
                    enableSelectAll={!this.selection.isEmpty}
                    statusSelectAll={this.selection.toValue()}
                    onSelectAllChanged={this.toggleSelectAll}
                />
                <PresetView 
                    presets={this.props.presets}
                    readonly={true}
                    selectPresets={this.actions.selectPresets}
                    empty={<Typography>
                        No factory presets were found.
                    </Typography>}
                />
            </div>
        );
    }

    public componentWillMount() {
        if (!this.props.presets || this.props.presets.length === 0) {
            this.actions.loadPresets(PresetCollectionType.factory);
        }
    }

    public shouldComponentUpdate(nextProps: FactoryPresetTabAllProps, _: {}): boolean {
        return this.props.presets !== nextProps.presets;
    }

    public componentWillReceiveProps(newProps: FactoryPresetTabAllProps) {
        this.selection = new SelectedView(newProps.presets);
    }

    protected get actions(): FactoryPresetTabActions {
        return this.props;
    }

    private onCopySelected() {
        const selectedPresets = this.selection.selected;
        if (selectedPresets.length > 0) {
            this.actions.copyPresets(selectedPresets);
        }
    }

    private toggleSelectAll() {
        this.actions.selectPresets(
            this.props.presets, PresetCollectionType.factory, 
            {selected: !this.selection.allSelected});
    }
}

const extractComponentPropsFromState: MapStateToProps<
        FactoryPresetTabStateProps, FactoryPresetTabProps, ApplicationDocument
    > = (state: ApplicationDocument, _: FactoryPresetTabProps): FactoryPresetTabStateProps => {
        return  { presets: state.factory };
};

const createActionObject: MapDispatchToPropsFunction<FactoryPresetTabActions, FactoryPresetTabProps> =
    (dispatch: Dispatch<ApplicationDocument>, _: FactoryPresetTabProps): FactoryPresetTabActions => {
        return {
            loadPresets: (source: PresetCollectionType): void  => {
                createLoadPresetsAction(dispatch, source);
            },
            selectPresets: (presets: Preset[], source: PresetCollectionType, command: 
                {selected?: boolean, expanded?: boolean}): void => {
                dispatch(createSelectPresetsAction(presets, source, command));
            },
            copyPresets: (presets: Preset[]): void => {
                dispatch(createCopyPresetsAction(presets));
            }
        };
};

export default connect(extractComponentPropsFromState, createActionObject)(FactoryPresetTab);