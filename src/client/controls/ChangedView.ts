import { Preset, presetHasChanged, onlyIndexHasChanged } from "../Preset";
import { SelectAllButtonStatus } from "./SelectAllButton";

export class ChangedView {
    private readonly collection: Preset[];

    public static areAnyChanged(collection: Preset[]): boolean {
        return collection.some((p) => presetHasChanged(p));
    }
    
    public constructor(collection: Preset[]) {
        this.collection = collection;
    }

    public get all(): Preset[] {
        return this.collection;
    }
    
    public get isEmpty(): boolean {
        if (!this.collection) { return true; }
        return this.collection.length === 0;
    }
    
    public get changed(): Preset[] {
        return this.collection.filter((p) => presetHasChanged(p));
    }
    
    public get moved(): Preset[] {
        return this.collection.filter((p) => onlyIndexHasChanged(p));
    }

    public get anyChanged(): boolean {
        if (this.isEmpty) { return false; }
        return this.collection.some((p) => presetHasChanged(p));
    }
    
    public get allChanged(): boolean {
        if (this.isEmpty) { return false; }
        return this.collection.every((p) => presetHasChanged(p));
    }
    
    public get noneChanged(): boolean {
        if (this.isEmpty) { return false; }
        return !this.allChanged;
    }

    public get status(): SelectAllButtonStatus {
        if (this.allChanged) { return SelectAllButtonStatus.AllChanged; }
        if (this.anyChanged) { return SelectAllButtonStatus.SomeChanged; }
        return SelectAllButtonStatus.NoneSelected;
    }
}
