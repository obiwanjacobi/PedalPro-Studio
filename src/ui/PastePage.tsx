import * as React from "react";
import { Dispatch } from "redux";
import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Dialog } from "material-ui";
import { ApplicationDocument, PresetCollectionType } from "../client/ApplicationDocument";
import { Preset } from "../client/Preset";
import { SelectPresets, createSelectPresetsAction } from "../client/SelectPresetsAction";
import { CopyPresets, createCopyPresetsAction } from "../client/CopyPresetsAction";
import { PastePresets, createPastePresetsAction } from "../client/PastePresetsAction";
import { UpdateScreen, createUpdateScreenAction } from "../client/screen/UpdateScreenAction";
import { ApplicationToolbar } from "../client/controls/ApplicationToolbar";
import { Clear } from "material-ui-icons";
import { ScreenState } from "../client/screen/ScreenState";

interface PresetListItemProps {
    preset: Preset;
}
type PresetListItemAllProps = PresetListItemProps & SelectPresets;

class PresetListItem extends React.Component<PresetListItemAllProps> {
    public constructor(props: PresetListItemAllProps) {
        super(props);
        this.onSelectPreset = this.onSelectPreset.bind(this);
    }

    public render() {
        return (
            <ListItem button={true} onClick={this.onSelectPreset}>
                <Checkbox tabIndex={-1} disableRipple={true} checked={this.props.preset.uiSelected} />
                <ListItemText primary={this.props.preset.name} secondary={this.props.preset.source.toUpperCase()} />
                <ListItemSecondaryAction />
            </ListItem>
        );
    }

    private onSelectPreset(_: React.MouseEvent<HTMLElement>) {
        this.props.selectPresets(
            [this.props.preset], PresetCollectionType.clipboard, 
            { selected: !this.props.preset.uiSelected });
    }
}

export interface PastePageProps {}
export interface PastePageState {}
export interface PastePageStateProps {
    open: boolean;
    clipboard: Preset[];
}
export type PastePageActions = SelectPresets & CopyPresets & PastePresets & UpdateScreen;
export type PastePageAllProps = PastePageProps & PastePageStateProps & PastePageActions;

export class PastePage extends React.Component<PastePageAllProps, PastePageState> {
    public constructor(props: PastePageAllProps) {
        super(props);
        this.close = this.close.bind(this);
    }

    public render() {
        return (
            <Dialog open={this.props.open} fullScreen={true}>
                <ApplicationToolbar>
                    <IconButton onClick={this.close}>
                        <Clear />
                    </IconButton>
                </ApplicationToolbar>
                <List id="ClipboardList">
                    {this.props.clipboard.map((preset: Preset, index: number) => {
                        return (
                            <PresetListItem 
                                key={index} 
                                preset={preset} 
                                selectPresets={this.props.selectPresets}
                            />
                        );
                    })}
                </List>
            </Dialog>
        );
    }

    private close() {
        this.props.updateScreen(new ScreenState());
    }
}

const extractComponentPropsFromState: MapStateToProps<
        PastePageStateProps, PastePageProps, ApplicationDocument
    > = (state: ApplicationDocument, _: PastePageProps): PastePageStateProps => {
        return  { clipboard: state.clipboard, open: state.screen.pasteOpen };
};

const createActionObject: MapDispatchToPropsFunction<PastePageActions, PastePageProps> =
    (dispatch: Dispatch<ApplicationDocument>, _: PastePageProps): PastePageActions => {
        return {
            selectPresets: (presets: Preset[], source: PresetCollectionType, command: 
                {selected?: boolean, expanded?: boolean}): void => {
                dispatch(createSelectPresetsAction(presets, source, command));
            },
            copyPresets: (presets: Preset[]): void => {
                dispatch(createCopyPresetsAction(presets));
            },
            pastePresets: (presets: Preset[], target: PresetCollectionType): void => {
                dispatch(createPastePresetsAction(presets, target));
            },
            updateScreen: (state: ScreenState): void => {
                dispatch(createUpdateScreenAction(state));
            }
        };
};

export default connect(extractComponentPropsFromState, createActionObject)(PastePage);