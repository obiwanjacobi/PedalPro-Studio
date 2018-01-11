export interface Selectable {
    selected: boolean;
}

/**
 * Provides common functs for a collection of selectable items.
 */
export class SelectedView<T extends Selectable> {
    private readonly collection: T[];

    public constructor(collection: T[]) {
        this.collection = collection;
    }

    public get isEmpty(): boolean {
        if (!this.collection) { return true; }
        return this.collection.length === 0;
    }
    
    public get selected(): T[] {
        if (!this.collection) { return new Array<T>(); }
        return this.collection.filter((item: Selectable) => item.selected);
    }

    public get anySelected(): boolean {
        if (this.isEmpty) { return false; }
        return this.collection.some((item: Selectable) => item.selected);
    }

    public get allSelected(): boolean {
        if (this.isEmpty) { return false; }
        return this.collection.every((item: Selectable) => item.selected);
    }

    public get noneSelected(): boolean {
        if (this.isEmpty) { return false; }
        return !this.allSelected;
    }

    public toValue(): number {
        if (this.allSelected) { return 1; }
        if (this.anySelected) { return -1; }
        return 0;
    }
}