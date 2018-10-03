// tslint:disable:no-bitwise
import { Convert } from "../Convert";

const frequencyTable: number[] = [
    0, 0,
    98, 147, 197, 248, 298, 350, 401, 453, 506, 559, 612, 666, 720, 775, 830, 886, 942, 999,
    1056, 1114, 1172, 1231, 1291, 1351, 1412, 1473, 1535, 1597, 1660, 1724, 1788, 1854, 1919, 1986, 
    2053, 2121, 2190, 2259, 2329, 2400, 2472, 2545, 2619, 2693, 2768, 2845, 2922, 3000,
    3079, 3160, 3241, 3323, 3407, 3491, 3577, 3664, 3752, 3842, 3932, 
    4024, 4118, 4213, 4309, 4407, 4507, 4608, 4710, 4815, 4921, 
    5029, 5139, 5251, 5365, 5482, 5600, 5721, 5844, 5970,
    6098, 6229, 6362, 6499, 6639, 6782, 6928,
    7078, 7231, 7389, 7550, 7716, 7886, 
    8061, 8242, 8427, 8618, 8816,
    9020, 9230, 9449, 9675, 9909,
    10153, 10407, 10672, 10948, 11237, 11540, 11859, 
    12195, 12551, 12928, 13329, 13758, 14219, 14716,
    15257, 15850, 16505, 17237, 18067, 19025, 20159
];

export class DspConvert {
    public static readonly frequencyValueSteps = frequencyTable.length - 2;

    public static restrictCaveDelay1(value: number): number {
        if (value < 0x0A) { return 0x0A; }
        if (value > 0x50) { return 0x50; }
        return Math.floor(value);
    }

    public static restrictCaveDelay2(value: number): number {
        if (value < 0x0A) { return 0x0A; }
        if (value > 0xA0) { return 0xA0; }
        return Math.floor(value);
    }

    public static restrictCaveDelay3(value: number): number {
        if (value < 0x32) { return 0x32; }
        if (value > 0xF0) { return 0xF0; }
        return Math.floor(value);
    }

    public static toCaveDelay4(value: number): number {
        if (value < 0x19) { return 50; }
        if (value > 0xA0) { return 320; }
        return Math.floor(Convert.transformRange(value, 0x19, 0xA0, 50, 320));
    }

    public static fromCaveDelay4(value: number): number {
        if (value < 50) { return 0x19; }
        if (value > 320) { return 0xA0; }
        return Math.floor(Convert.transformRange(value, 50, 320, 0x19, 0xA0));
    }

    public static toFeedback(value: number): number {
        if (value < 0) { return 0; }
        if (value > 0xE4) { return -100; }
        if (value <= 0x64) { return value; }
        return -(value & 0x7F);
    }

    public static fromFeedback(value: number): number {
        if (value < -100) { return 0xE4; }
        if (value > 100) { return 0x64; }
        if (value < 0) {
            return (-value) | 0x80;
        }
        return value;
    }

    public static restrictPercent(value: number): number {
        if (value < 0) { return 0; }
        if (value > 100) { return 100; }
        return Math.floor(value);
    }

    public static toFrequency(value: number): number {
        if (value < 2) { return frequencyTable[2]; }
        if (value > 0x7B) { return frequencyTable[frequencyTable.length - 1]; }
        return frequencyTable[value];
    }

    public static fromFrequency(value: number): number {
        if (value < frequencyTable[2]) { return 2; }
        if (value > frequencyTable[frequencyTable.length - 1]) { return 0x7B; }
        const index = frequencyTable.indexOf(value);
        if (index === -1) {
            // no exact match: find nearest
            return frequencyTable.reduce((prevVal: number, val: number, i: number) => {
                if (val > value) { return prevVal; }
                return i;
            });
        }
        return index;
    }

    public static toFrequency2(value: number): number {
        if (value < 8) { return frequencyTable[8]; }
        return this.toFrequency(value);
    }

    public static fromFrequency2(value: number): number {
        if (value < frequencyTable[8]) { return 8; }
        return this.fromFrequency(value);
    }

    public static toBalance(value: number): number {
        if (value < 0) { return -50; }
        if (value > 0x64) { return 50; }
        return value - 50;
    }

    public static fromBalance(value: number): number {
        if (value < -50) { return 0; }
        if (value > 50) { return 0x64; }
        return value + 50;
    }

    public static restrictDelay1(value: number): number {
        if (value < 0x0A) { return 0x0A; }
        if (value > 0x28) { return 0x28; }
        return Math.floor(value);
    }

    public static restrictDelay3(value: number): number {
        if (value < 0x64) { return 0x64; }
        if (value > 0xFA) { return 0xFA; }
        return Math.floor(value);
    }

    public static toDelay4(value: number): number {
        if (value < 0x64) { return 200; }
        if (value > 0xFA) { return 500; }
        return Math.floor(Convert.transformRange(value, 0x64, 0xFA, 100, 500));
    }

    public static fromDelay4(value: number): number {
        if (value < 100) { return 0x64; }
        if (value > 500) { return 0xFA; }
        return Math.floor(Convert.transformRange(value, 100, 500, 0x64, 0xFA));
    }

    public static restrictTime( value: number): number {
        if (value < 0x32) { return 0x32; }
        if (value > 0x7F) { return 0x7F; }
        return Math.floor(value);
    }

    public static toTempo(value: number): number {
        if (value < 1) { return 72; }
        if (value > 0xFF) { return 326; }
        return Math.floor(Convert.transformRange(value, 1, 0xFF, 72, 326));
    }

    public static fromTempo(value: number): number {
        if (value < 72) { return 1; }
        if (value > 326) { return 0xFF; }
        return Math.floor(Convert.transformRange(value, 72, 326, 1, 0xFF));
    }

    public static restrictSize(value: number): number {
        if (value < 3) { return 3; }
        if (value > 0x7F) { return 0x7F; }
        return Math.floor(value);
    }

    public static restrictSize2(value: number): number {
        if (value < 0x14) { return 0x14; }
        if (value > 0x7F) { return 0x7F; }
        return Math.floor(value);
    }

    public static restrictDelayTime(value: number): number {
        if (value < 20) { return 20; }
        if (value > 100) { return 100; }
        return Math.floor(value);
    }

    public static restrictReverbTime(value: number): number {
        if (value < 20) { return 20; }
        if (value > 127) { return 127; }
        return Math.floor(value);
    }
}