// tslint:disable:no-bitwise

const logDBTable: number[] = [
    -120, -110, -100, -90, -80,
    -75, -70, -65, -60, -55, -50, -45,
    -40, -38, -36, -34, -32, 
    -30, -28, -26, -24, -22, 
    -20, -18, -16, -14, -12,
    -10, -8, -6, -4, -2,
    0,
    2, 4, 6, 8, 10,
    12, 14, 16, 18, 20,
    22, 24, 26, 28, 30,
    32, 34, 36, 38, 40, 
    45, 50, 55, 60, 65, 70, 75,
    80, 90, 100, 110, 120
];

export default class Convert {

    public static toPercent(value: number): number {
        if (value < 0) { return 0; }
        if (value > 0xFF) { return 0; }
        return Math.floor(this.transformRange(value, 0, 0xFF, 0, 1000)) / 10;
    }

    public static fromPercent(value: number): number {
        if (value < 0) { return 0; }
        if (value > 100) { return 0; }
        return Math.round(this.transformRange(value * 10, 0, 1000, 0, 0xFF));
    }

    public static toDB(value: number): number {
        if (value < 0) { return 0; }
        if (value > 0x3E) { return 0; }
        return Math.floor(this.transformRange(value, 0, 0x3E, -60, 250)) / 10;
    }

    public static fromDB(value: number): number {
        if (value < -6) { return 0; }
        if (value > 25) { return 0; }
        return Math.round(this.transformRange(value * 10, -60, 250, 0, 0x3E));
    }

    public static toLogDB(value: number): number {
        if (value < 0) { return 0; }
        if (value > 0x40) { return 0; }

        return  logDBTable[value] / 10;
    }

    public static fromLogDB(value: number): number {
        if (value < -12) { return 0; }
        if (value > 12) { return 0; }

        const dbValue = value * 10;
        return logDBTable.findIndex((val) => val === dbValue);
    }

    public static toTempoSpeed(value: number): number {
        if (value < 0) { return 0; }
        if (value > 0x155E) { return 0; }
        return Math.floor(this.transformRange(value, 0, 0x155E, 30, 5500)) / 10;
    }

    public static fromTempoSpeed(value: number): number {
        if (value < 3) { return 0; }
        if (value > 550) { return 0; }
        return Math.round(this.transformRange(value * 10, 30, 5500, 0, 0x155E));
    }

    public static toResonance1(value: number): number {
        if (value < 0) { return 0; }
        if (value > 0x22) { return 0; }
        return Math.floor(this.transformRange(value, 0, 0x22, 10, 180)) / 10;
    }

    public static fromResonance1(value: number): number {
        if (value < 1) { return 0; }
        if (value > 18) { return 0; }
        return Math.round(this.transformRange(value * 10, 10, 180, 0, 0x22));
    }

    public static toFrequency1(value: number): number {
        if (value < 0) { return 0; }
        if (value > 0x3FF) { return 0; }
        return Math.floor(this.transformRange(value, 0, 0x3FF, 370, 1968));
    }

    public static fromFrequency1(value: number): number {
        if (value < 370) { return 0; }
        if (value > 1968) { return 0; }
        return Math.round(this.transformRange(value, 370, 1968, 0, 0x3FF));
    }

    public static toResonance2(value: number): number {
        if (value < 0) { return 0; }
        if (value > 0x1E) { return 0; }
        return Math.floor(this.transformRange(value, 0, 0x1E, 10, 160)) / 10;
    }

    public static fromResonance2(value: number): number {
        if (value < 1) { return 0; }
        if (value > 16) { return 0; }
        return Math.round(this.transformRange(value * 10, 10, 160, 0, 0x1E));
    }

    public static toFrequency2(value: number): number {
        if (value < 0) { return 0; }
        if (value > 0x3FF) { return 0; }
        return Math.floor(this.transformRange(value, 0, 0x3FF, 150, 2697));
    }

    public static fromFrequency2(value: number): number {
        if (value < 150) { return 0; }
        if (value > 2697) { return 0; }
        return Math.round(this.transformRange(value, 150, 2697, 0, 0x3FF));
    }

    public static toTimeShort(value: number): number {
        if (value < 0) { return 0; }
        if (value > 0xFF) { return 0; }
        return Math.floor(this.transformRange(value, 0, 0xFF, 237, 994)) / 10;
    }

    public static fromTimeShort(value: number): number {
        if (value < 23.7) { return 0; }
        if (value < 994) { return 0; }
        return Math.round(this.transformRange(value * 10, 237, 994, 0, 0xFF));
    }

    public static toTimeMedium(value: number): number {
        if (value < 0) { return 0; }
        if (value > 0xFF) { return 0; }
        return Math.floor(this.transformRange(value, 0, 0xFF, 409, 4094)) / 10;
    }

    public static fromTimeMedium(value: number): number {
        if (value < 40.9) { return 0; }
        if (value > 409.4) { return 0; }
        return Math.round(this.transformRange(value * 10, 409, 4094, 0, 0xFF));
    }

    public static toTimeLong(value: number): number {
        if (value < 0) { return 0; }
        if (value > 0xFF) { return 0; }
        return Math.floor(this.transformRange(value, 0, 0xFF, 614, 6143)) / 10;
    }

    public static fromTimeLong(value: number): number {
        if (value < 61.4) { return 0; }
        if (value > 614.3) { return 0; }
        return Math.round(this.transformRange(value * 10, 614, 6143, 0, 0xFF));
    }

    public static toEmphasisFrequency(value: number): number {
        if (value < 0) { return 0; }
        if (value > 0xFF) { return 0; }
        return Math.floor(this.transformRange(value, 0, 0xFF, 1000, 2000));
    }

    public static fromEmphasisFrequency(value: number): number {
        if (value < 1000) { return 0; }
        if (value > 2000) { return 0; }
        return Math.round(this.transformRange(value, 1000, 2000, 0, 0xFF));
    }

    public static transformRange(x: number, minIn: number, maxIn: number, minOut: number, maxOut: number): number {
        return (x - minIn) * (maxOut - minOut) / (maxIn - minIn) + minOut;
    }
    
    public static makeByte(bit0: number, bit1: number): number {
        return ((bit1 & 0x01) << 1) | (bit0 & 0x01);
    }

    public static makeWord(hi: number, low: number): number {
        return (hi << 8) | low;
    }

    public static hiByte(word: number): number {
        return (word >> 8) & 0xFF;
    }

    public static loByte(word: number): number {
        return word & 0xFF;
    }

    public static hasFlag(value: number, flag: number): boolean {
        const mask = 1 << flag;
        return (value & mask) > 0;
    }

    public static getBitsOf(source: number, bit: number, bitLength: number): number {
        const mask = Convert.makeMask(bit, bitLength);
        let value = source & mask;
        value >>= (bit + 1) - bitLength;
        return value;
    }

    public static setBitsOf(source: number, value: number, bit: number, bitLength: number): number {
        const mask = Convert.makeMask(bit, bitLength);
        value <<= (bit + 1) - bitLength;
        return (source & ~mask) | value;
    }

    private static makeMask(bit: number, bitLength: number): number {
        let mask = 0;

        const bin = 1 << bit;
        for (let i = 0; i < bitLength; i++) {
            if (i > 0) { mask >>= 1; }
            mask |= bin;
        }

        return  mask;
    }
}