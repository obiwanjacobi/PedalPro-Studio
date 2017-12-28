import Preset from "../model/Preset";

export default class ApplicationDocument {
    public local: Preset[];
    public device: Preset[];
    public storage: Preset[];
    public factory: Preset[];

    public CopyOverride(local: Preset[] | null = null,
                        device: Preset[] | null = null,
                        storage: Preset[] | null = null,
                        factory: Preset[] | null = null): ApplicationDocument {

        const appDoc = new ApplicationDocument();
        appDoc.local = local === null ? this.local : local;
        appDoc.device = device === null ? this.device : device;
        appDoc.storage = storage === null ? this.storage : storage;
        appDoc.factory = factory === null ? this.factory : factory;

        return appDoc;
    }

    public constructor() {
        this.local = Array<Preset>();
        this.device = Array<Preset>();
        this.storage = Array<Preset>();
        this.factory = Array<Preset>();
    }
}