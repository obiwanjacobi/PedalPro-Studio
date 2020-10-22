import { SelectAllButtonStatus } from "./SelectAllButton";
import { ItemWithUI } from "../ItemUI";

/**
 * Provides common functs for a collection of selectable items.
 */
export class SelectedView<T extends ItemWithUI> {
    private readonly collection: T[];

    public static areAnySelected<T extends ItemWithUI>(collection: T[]): boolean {
        return collection.some((item: T) => item.ui.selected);
    }

    public constructor(collection: T[]) {
        this.collection = collection;
    }

    public get all(): T[] {
        return this.collection;
    }
    
    public get isEmpty(): boolean {
        if (!this.collection) { return true; }
        return this.collection.length === 0;
    }
    
    public get selected(): T[] {
        if (!this.collection) { return new Array<T>(); }
        return this.collection.filter((item: T) => item.ui.selected);
    }

    public get anySelected(): boolean {
        if (this.isEmpty) { return false; }
        return this.collection.some((item: T) => item.ui.selected);
    }

    public get allSelected(): boolean {
        if (this.isEmpty) { return false; }
        return this.collection.every((item: T) => item.ui.selected);
    }

    public get noneSelected(): boolean {
        if (this.isEmpty) { return false; }
        return !this.allSelected;
    }

    public get status(): SelectAllButtonStatus {
        if (this.allSelected) { return SelectAllButtonStatus.AllSelected; }
        if (this.anySelected) { return SelectAllButtonStatus.SomeSelected; }
        return SelectAllButtonStatus.NoneSelected;
    }
}