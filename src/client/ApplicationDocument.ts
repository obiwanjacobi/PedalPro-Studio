import Preset from "./Preset";

export default class ApplicationDocument {
    public readonly local: Preset[];
    public readonly device: Preset[];
    public readonly storage: Preset[];
    public readonly factory: Preset[];

    public copyOverride(local: Preset[] | null = null,
                        device: Preset[] | null = null,
                        storage: Preset[] | null = null,
                        factory: Preset[] | null = null): ApplicationDocument {

        return new ApplicationDocument(
                        local === null ? this.local : local,
                        device === null ? this.device : device,
                        storage === null ? this.storage : storage,
                        factory === null ? this.factory : factory
        );
    }

    public constructor(local: Preset[] | null = null,
                       device: Preset[] | null = null,
                       storage: Preset[] | null = null,
                       factory: Preset[] | null = null) {

        this.local = local === null ? Array<Preset>() : local;
        this.device = device === null ? Array<Preset>() : device;
        this.storage = storage === null ? Array<Preset>() : storage;
        this.factory = factory === null ? Array<Preset>() : factory;
    }
}