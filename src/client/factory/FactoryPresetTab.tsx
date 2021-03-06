import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";

import { fulfillPromise } from "../../PromiseExtensions";
import { Preset } from "../preset/Preset";
import { ItemUI } from "../ItemUI";
import { FlexContainer } from "../controls/FlexContainer";
import { SelectedView } from "../controls/SelectedView";
import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { LoadPresets, dispatchLoadPresetsAction } from "../preset/LoadPresetsAction";
import { ChangePresets, createChangePresetsAction } from "../preset/ChangePresetsAction";
import { CopyPresets, createCopyPresetsAction } from "../preset/CopyPresetsAction";
import { EditEffects, createEditEffectsAction } from "../effects/EditEffectsAction";
import { PresetToolbar } from "../preset/PresetToolbar";
import { PresetView } from "../preset/PresetView";

export interface FactoryPresetTabProps { }
export interface FactoryPresetTabStateProps {
    presets: Preset[];
}
export type FactoryPresetTabActions = EditEffects & ChangePresets & LoadPresets & CopyPresets;
export type FactoryPresetTabAllProps =
    FactoryPresetTabProps & FactoryPresetTabStateProps & FactoryPresetTabActions;

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
            <FlexContainer vertical={true}>
                <PresetToolbar
                    enableCopy={this.selection.anySelected}
                    onCopy={this.onCopySelected}
                    enableSelectAll={!this.selection.isEmpty}
                    statusSelectAll={this.selection.status}
                    onSelectAllChanged={this.toggleSelectAll}
                />
                <PresetView
                    presets={this.props.presets}
                    filterFlagged={false}
                    filterEmpty={false}
                    changePresets={this.actions.changePresets}
                    editEffects={this.props.editEffects}
                    empty={<Typography variant="body2">
                        No factory presets were found.
                    </Typography>}
                />
            </FlexContainer>
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
        this.actions.changePresets(
            this.props.presets, PresetCollectionType.factory,
            { selected: !this.selection.allSelected });
    }
}

const extractComponentPropsFromState = (state: ApplicationDocument): FactoryPresetTabStateProps => {
    return { presets: state.factory };
};

const createActionObject = (dispatch: Dispatch): FactoryPresetTabActions => {
    return {
        loadPresets: (source: PresetCollectionType): void => {
            fulfillPromise(dispatchLoadPresetsAction(dispatch, source));
        },
        changePresets: (presets: Preset[], source: PresetCollectionType, ui: Partial<ItemUI>): void => {
            dispatch(createChangePresetsAction(presets, source, ui));
        },
        copyPresets: (presets: Preset[]): void => {
            dispatch(createCopyPresetsAction(presets));
        },
        editEffects: (preset: Preset): void => {
            dispatch(createEditEffectsAction(preset));
        }
    };
};

export default connect(extractComponentPropsFromState, createActionObject)(FactoryPresetTab);