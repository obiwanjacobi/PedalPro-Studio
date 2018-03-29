import { SelectAllButtonStatus } from "./SelectAllButton";

export interface Selectable {
    uiSelected: boolean;
}

/**
 * Provides common functs for a collection of selectable items.
 */
export class SelectedView<T extends Selectable> {
    private readonly collection: T[];

    public static areAnySelected(collection: Selectable[]): boolean {
        return collection.some((item: Selectable) => item.uiSelected);
    }

    public constructor(collection: T[]) {
        this.collection = collection;
    }

    public get isEmpty(): boolean {
        if (!this.collection) { return true; }
        return this.collection.length === 0;
    }
    
    public get selected(): T[] {
        if (!this.collection) { return new Array<T>(); }
        return this.collection.filter((item: Selectable) => item.uiSelected);
    }

    public get anySelected(): boolean {
        if (this.isEmpty) { return false; }
        return this.collection.some((item: Selectable) => item.uiSelected);
    }

    public get allSelected(): boolean {
        if (this.isEmpty) { return false; }
        return this.collection.every((item: Selectable) => item.uiSelected);
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