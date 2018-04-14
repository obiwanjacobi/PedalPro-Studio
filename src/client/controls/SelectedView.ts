import { SelectAllButtonStatus } from "./SelectAllButton";
import { Preset } from "../Preset";

/**
 * Provides common functs for a collection of selectable items.
 */
export class SelectedView {
    private readonly collection: Preset[];

    public static areAnySelected(collection: Preset[]): boolean {
        return collection.some((item: Preset) => item.ui.selected);
    }

    public constructor(collection: Preset[]) {
        this.collection = collection;
    }

    public get isEmpty(): boolean {
        if (!this.collection) { return true; }
        return this.collection.length === 0;
    }
    
    public get selected(): Preset[] {
        if (!this.collection) { return new Array<Preset>(); }
        return this.collection.filter((item: Preset) => item.ui.selected);
    }

    public get anySelected(): boolean {
        if (this.isEmpty) { return false; }
        return this.collection.some((item: Preset) => item.ui.selected);
    }

    public get allSelected(): boolean {
        if (this.isEmpty) { return false; }
        return this.collection.every((item: Preset) => item.ui.selected);
    }

    public get noneSelected(): boolean {
        if (this.isEmpty) { return false; }
        return !this.allSelected;
    }

    public toValue(): SelectAllButtonStatus {
        if (this.allSelected) { return SelectAllButtonStatus.AllSelected; }
        if (this.anySelected) { return SelectAllButtonStatus.SomeSelected; }
        return SelectAllButtonStatus.NoneSelected;
    }
}