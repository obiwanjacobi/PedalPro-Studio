/// <reference types="react" />
import * as React from "react";
import Preset from "../client/Preset";
import { LoadPresets } from "../client/LoadPresetsAction";
import { SelectPresets } from "../client/SelectPresetsAction";
import { CopyPresets } from "../client/CopyPresetsAction";
import { EditPreset } from "../client/EditPresetAction";
import { MovePreset } from "../client/MovePresetAction";
export interface DevicePresetTabProps {
}
export interface DevicePresetTabStateProps {
    presets: Preset[];
}
export declare type DevicePresetTabActions = SelectPresets & LoadPresets & CopyPresets & EditPreset & MovePreset;
export declare type DevicePresetTabAllProps = DevicePresetTabProps & DevicePresetTabStateProps & DevicePresetTabActions;
export declare class DevicePresetTab extends React.PureComponent<DevicePresetTabAllProps> {
    private selection;
    constructor(props: DevicePresetTabAllProps);
    render(): JSX.Element;
    shouldComponentUpdate(nextProps: DevicePresetTabAllProps, _: {}): boolean;
    componentWillReceiveProps(newProps: DevicePresetTabAllProps): void;
    protected readonly actions: DevicePresetTabActions;
    private onCopySelected();
    private toggleSelectAll();
    private download();
}
declare const _default: React.ComponentClass<Pick<DevicePresetTabAllProps, never> & DevicePresetTabProps> & {
    WrappedComponent: React.ComponentType<DevicePresetTabAllProps>;
};
export default _default;
