// types used in model

// 00.0% - 100.0% step +/- 0.4
export type Percent = number;

// 3.0 - 550.0 step 0.1 
export type TempoSpeed = number;

export enum WaveForm {
    Sine,
    Triangle,
    Trapezoidal,
    Rectangle,
    PCal,
    Shelf,
    Vintage
}

export enum PhaseShift {
    Degrees0,
    Degrees90,
    Degrees180,
    Degrees270,
}
