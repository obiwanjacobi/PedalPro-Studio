export default interface Preset {
    /**
     * The index or position of this preset in the collection (order).
     */
    index: number;

    /**
     * The name of the preset - does not have to be unique.
     */
    name: string;

    /** 
     * An indication if the preset uses an Expression Pedal.
     */
    expression: boolean;

    /**
     * An indication if the preset is stereo.
     */
    stereo: boolean;

    /**
     * Indicates if this preset is considered empty.
     */
    empty: boolean;

    /**
     * Raw data
     */
    // data: string;
}