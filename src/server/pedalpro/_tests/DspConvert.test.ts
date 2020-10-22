import { DspConvert } from "../extended/DspConvert";

describe("DspConvert.ts", () => {

    it("toFeedback 0 = 0", () => {
        const actual = DspConvert.toFeedback(0);
        expect(actual).toBe(0);
    });
    it("toFeedback 0x64 = 100", () => {
        const actual = DspConvert.toFeedback(0x64);
        expect(actual).toBe(100);
    });
    it("toFeedback 0xE4 = -100", () => {
        const actual = DspConvert.toFeedback(0xE4);
        expect(actual).toBe(-100);
    });

    it("fromFeedback 0 = 0", () => {
        const actual = DspConvert.fromFeedback(0);
        expect(actual).toBe(0);
    });
    it("fromFeedback 100 = 0x64", () => {
        const actual = DspConvert.fromFeedback(100);
        expect(actual).toBe(0x64);
    });
    it("fromFeedback -100 = 0xE4", () => {
        const actual = DspConvert.fromFeedback(-100);
        expect(actual).toBe(0xE4);
    });

    it("fromFrequency 100 = 2", () => {
        const actual = DspConvert.fromFrequency(100);
        expect(actual).toBe(2);
    });
});