export interface Selected {
    selected: boolean;
}

export class SelectedView<T extends Selected> {
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
        return this.collection.filter((item: Selected) => item.selected);
    }

    public get anySelected(): boolean {
        if (!this.collection) { return false; }
        return this.collection.some((item: Selected) => item.selected);
    }

    public get allSelected(): boolean {
        if (!this.collection) { return false; }
        return this.collection.every((item: Selected) => item.selected);
    }

    public get noneSelected(): boolean {
        if (!this.collection) { return false; }
        return !this.allSelected;
    }

    public toValue(): number {
        if (this.allSelected) { return 1; }
        if (this.anySelected) { return -1; }
        return 0;
    }
}