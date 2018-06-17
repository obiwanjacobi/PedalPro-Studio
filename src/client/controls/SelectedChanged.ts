import { SelectedView } from "./SelectedView";
import { ChangedView } from "./ChangedView";
import { SelectAllButtonStatus } from "./SelectAllButton";
import { Preset } from "../preset/Preset";

export const calcSelectAllStatus = (selected: SelectedView, changed: ChangedView): SelectAllButtonStatus => {
    const changedVal = changed.status;
    const selectedVal = selected.status;

    if (changedVal === SelectAllButtonStatus.NoneSelected &&
        selectedVal === SelectAllButtonStatus.NoneSelected) {
        return SelectAllButtonStatus.NoneSelected;
    }

    if (changed.changed.length === selected.selected.length) {
        for (let i = 0; i < changed.changed.length; i++) {
            if (changed.changed[i] !== selected.selected[i]) {
                return SelectAllButtonStatus.SomeSelected;
            }
        }

        return SelectAllButtonStatus.AllChanged;
    }

    if (selectedVal === SelectAllButtonStatus.AllSelected) {
        return SelectAllButtonStatus.AllSelected;
    }
    
    if (selectedVal === SelectAllButtonStatus.SomeSelected) {
        return SelectAllButtonStatus.SomeSelected;
    }

    return SelectAllButtonStatus.NoneSelected;
};

export const getPresetsToSelect = (changed: ChangedView, status: SelectAllButtonStatus): Preset[] => {
    let presets = changed.all;

    switch (status) {
        case SelectAllButtonStatus.AllChanged:
            if (changed.anyChanged) {
                presets = changed.changed;
            }   // else fall back to select-all
            break;
        case SelectAllButtonStatus.AllSelected:
            // select-all
            break;
        default:
            presets = [];
            break;
    }
    
    return presets;
};