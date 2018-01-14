import * as React from "react";
import { List } from "material-ui";

import TargetPreset from "./TargetPreset";
import { TargetPresetItem } from "./TargetPresetItem";

export interface TargetPresetListProps {
    presets: TargetPreset[];
}

export default class TargetPresetList extends React.Component<TargetPresetListProps> {
    public render(): React.ReactNode {
        return (
            <List>
                {this.props.presets.map((preset: TargetPreset, index: number) => { 
                        this.targetPresetItem(preset, index); 
                    })}
            </List>
        );
    }

    private targetPresetItem(preset: TargetPreset, index: number): React.ReactNode {
        return (
            <TargetPresetItem 
                key={index} 
                preset={preset}
            />
        );
    }
}