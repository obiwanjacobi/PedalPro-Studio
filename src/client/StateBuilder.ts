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
}