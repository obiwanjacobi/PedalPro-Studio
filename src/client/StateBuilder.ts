export enum CopyOption {
    ByRef,
    ByVal,
}

export abstract class ItemBuilder<T extends {}> {
    protected state?: T;

    public detach(): T {
        if (!this.state) { this.throwDisposed(); }

        const state = this.state;
        this.state = undefined;
        return <T> state;
    }

    public get mutable(): T {
        if (!this.state) { this.throwDisposed(); }
        return <T> this.state;
    }

    protected throwDisposed(): void {
        throw new Error("This Builder instance is disposed: State has been detached.");
    }
}

export type MatchItemFn<T> = (item1: T, item2: T) => boolean;
export type ItemFn<T> = (item: T, index: number) => void;
export type ConvertItemFn<T> = (item: T) => T;

export abstract class ArrayBuilder<T extends {}> extends ItemBuilder<T[]> {
    public constructor(state: T[], option: CopyOption = CopyOption.ByVal) {
        super();
        if (option === CopyOption.ByVal) {
            this.state = state.slice(0);
        } else {
            this.state = state;
        }
    }

    public add(item: T): void {
        this.mutable.push(item);
    }

    public addRange(items: T[], fnConvert?: ConvertItemFn<T>): void {
        if (fnConvert) {
            items.forEach((item: T) => this.mutable.push(fnConvert(item)));
        } else {
            items.forEach((item: T) => this.mutable.push(item));
        }
    }

    public forRange(items: T[], operation: ItemFn<T>, matchFn?: MatchItemFn<T>) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            let targetIndex = -1;
            if (matchFn) {
                targetIndex = this.mutable.findIndex((origItem: T) => matchFn(origItem, item));
            } else {
                targetIndex = this.mutable.indexOf(item);
            }
            if (targetIndex >= 0) {
                operation(item, targetIndex);
            }
        }
    }

    public remove(item: T) {
        const index = this.mutable.indexOf(item);
        this.mutable.splice(index, 1);
    }

    public removeRange(items: T[], matchItemFn?: MatchItemFn<T>) {
        this.forRange(items, (_: T, index: number) => this.removeAt(index), matchItemFn);
    }

    public removeAt(index: number): T {
        this.throwIfIndexNotValid(index);
        const removed = this.mutable.splice(index, 1);
        return removed[0];
    }

    public insertAt(index: number, item: T) {
        this.mutable.splice(index, 0, item);
    }

    public insertRange(index: number, items: T[]) {
        this.mutable.splice(index, 0, ...items);
    }

    protected throwIfIndexNotValid(index: number) {
        if (index < 0 || index >= this.mutable.length) {
            throw new RangeError(`Index ${index} is not within range [0, ${this.mutable.length}].`);
        }
    }
}