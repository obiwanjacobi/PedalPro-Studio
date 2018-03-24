export interface PresetTraits {
    /** 
     * An indication if the preset is intended for a single-coil pickup.
     */
    singleCoil: boolean;

    /** 
     * An indication if the preset is intended for a humbucker pickup.
     */
    humbucker: boolean;

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
}