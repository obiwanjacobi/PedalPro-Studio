// tslint:disable:no-bitwise

export default class Convert {

    public static makeByte(bit0: number, bit1: number): number {
        return (bit1 << 1) | bit0;
    }

    public static makeWord(hi: number, low: number): number {
        return (hi << 8) | low;
    }

    public static toPercent(byte: number): number {
        return Math.floor(this.transformRange(byte, 0, 0xFF, 0, 1000)) / 10;
    }

    public static toDB(value: number): number {
        if (value > 0x3E) { return 0; }
        return Math.floor(this.transformRange(value, 0, 0x3E, -60, 250)) / 10;
    }

    public static toLogDB(value: number): number {
        if (value > 0x40) { return 0; }
        
        return Math.floor(this.transformRange(value, 0, 0x40, -120, 120)) / 10;
    }

    public static toTempoSpeed(value: number): number {
        if (value > 0x155E) { return 0; }
        return Math.floor(this.transformRange(value, 0, 0x155E, 30, 5500)) / 10;
    }

    public static toResonance1(value: number): number {
        if (value > 0x22) { return 0; }
        return Math.floor(this.transformRange(value, 0, 0x22, 10, 180)) / 10;
    }

    public static toFrequency1(value: number): number {
        if (value > 0x3FF) { return 0; }
        return Math.floor(this.transformRange(value, 0, 0x3FF, 370, 1968));
    }

    public static toResonance2(value: number): number {
        if (value > 0x1E) { return 0; }
        return Math.floor(this.transformRange(value, 0, 0x1E, 10, 160)) / 10;
    }

    public static toFrequency2(value: number): number {
        if (value > 0x3FF) { return 0; }
        return Math.floor(this.transformRange(value, 0, 0x3FF, 150, 2697));
    }

    public static toTimeShort(value: number): number {
        return Math.floor(this.transformRange(value, 0, 0xFF, 237, 994)) / 10;
    }

    public static toTimeMedium(value: number): number {
        return Math.floor(this.transformRange(value, 0, 0xFF, 409, 4094)) / 10;
    }

    public static toTimeLong(value: number): number {
        return Math.floor(this.transformRange(value, 0, 0xFF, 614, 6143)) / 10;
    }

    public static toEmphasisFrequency(value: number): number {
        return Math.floor(this.transformRange(value, 0, 0xFF, 1000, 2000));
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

    private static makeMask(bit: number, bitLength: number): number {
        let mask = 0;

        const bin = 1 << bit;
        for (let i = 0; i < bitLength; i++) {
            if (i > 0) { mask >>= 1; }
            mask |= bin;
        }

        return  mask;
    }

    private static transformRange(x: number, minIn: number, maxIn: number, minOut: number, maxOut: number): number {
        return (x - minIn) * (maxOut - minOut) / (maxIn - minIn) + minOut;
    }
}