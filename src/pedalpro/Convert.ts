// tslint:disable:no-bitwise

export default class Convert {

    public static makeByte(bit0: number, bit1: number): number {
        return (bit1 << 1) | bit0;
    }

    public static makeWord(hi: number, low: number): number {
        return (hi << 8) | low;
    }

    public static toPercent(byte: number): number {
        return this.transformRange(byte, 0, 255, 0, 1000);
    }

    public static hasFlag(value: number, flag: number): boolean {
        return (value & flag) > 0;
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