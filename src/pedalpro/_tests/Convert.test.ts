import Convert from "../Convert";

describe("Convert.ts", () => {

    it("makeByte 1,0 = 1", () => {
        const actual = Convert.makeByte(1, 0);

        expect(actual).toBe(1);
    });
    it("makeByte 0,1 = 2", () => {
        const actual = Convert.makeByte(0, 1);

        expect(actual).toBe(2);
    });

    it("makeWord a, b = a|b", () => {
        const actual = Convert.makeWord(0xAA, 0x55);
        expect(actual).toBe(0xAA55);
    });

    it ("hasFlag v|f = true", () => {
        const actual = Convert.hasFlag(0x01, 1);
        expect(actual).toBe(false);
    });
    it ("hasFlag v|f = false", () => {
        const actual = Convert.hasFlag(0x01, 0);
        expect(actual).toBe(true);
    });

    it("getBitsOf v,b,l = 0x02", () => {
        const actual = Convert.getBitsOf(0x02, 1, 2);
        expect(actual).toBe(0x2);
    });
    it ("getBitsOf v,b,l = 0x01", () => {
        const actual = Convert.getBitsOf(0x02, 2, 2);
        expect(actual).toBe(0x1);
    });

    it ("toPercent 0%", () => {
        const actual = Convert.toPercent(0x00);
        expect(actual).toBe(0.0);
    });
    it ("toPercent 0.3%", () => {
        const actual = Convert.toPercent(0x01);
        expect(actual).toBe(0.3);
    });
    it ("toPercent 0.7%", () => {
        const actual = Convert.toPercent(0x02);
        expect(actual).toBe(0.7);
    });
    it ("toPercent 1.1%", () => {
        const actual = Convert.toPercent(0x03);
        expect(actual).toBe(1.1);
    });
    it ("toPercent 50%", () => {
        const actual = Convert.toPercent(0x80);
        expect(actual).toBe(50.1);
    });
    it ("toPercent 100%", () => {
        const actual = Convert.toPercent(0xFF);
        expect(actual).toBe(100.0);
    });

    it ("toDb -6 dB", () => {
        const actual = Convert.toDB(0x00);
        expect(actual).toBe(-6);
    });
    it ("toDb -5.5 dB", () => {
        const actual = Convert.toDB(0x01);
        expect(actual).toBe(-5.5);
    });
    it ("toDb +25.0 dB", () => {
        const actual = Convert.toDB(0x3E);
        expect(actual).toBe(25);
    });

    it ("toTempoSpeed 3", () => {
        const actual = Convert.toTempoSpeed(0);
        expect(actual).toBe(3);
    });
    it ("toTempoSpeed 3.1", () => {
        const actual = Convert.toTempoSpeed(1);
        expect(actual).toBe(3.1);
    });
    it ("toTempoSpeed 3.2", () => {
        const actual = Convert.toTempoSpeed(2);
        expect(actual).toBe(3.2);
    });
    it ("toTempoSpeed 550", () => {
        const actual = Convert.toTempoSpeed(0x155E);
        expect(actual).toBe(550);
    });

    it ("toResonance1 1", () => {
        const actual = Convert.toResonance1(0);
        expect(actual).toBe(1);
    });
    it ("toResonance1 1.5", () => {
        const actual = Convert.toResonance1(1);
        expect(actual).toBe(1.5);
    });
    it ("toResonance1 2", () => {
        const actual = Convert.toResonance1(2);
        expect(actual).toBe(2);
    });
    it ("toResonance1 18", () => {
        const actual = Convert.toResonance1(0x22);
        expect(actual).toBe(18);
    });

    it ("toFrequency1 370", () => {
        const actual = Convert.toFrequency1(0);
        expect(actual).toBe(370);
    });
    it ("toFrequency1 371", () => {
        const actual = Convert.toFrequency1(1);
        expect(actual).toBe(371);
    });
    it ("toFrequency1 373", () => {
        const actual = Convert.toFrequency1(2);
        expect(actual).toBe(373);
    });
    it ("toFrequency1 1968", () => {
        const actual = Convert.toFrequency1(0x3FF);
        expect(actual).toBe(1968);
    });

    it ("toResonance2 1", () => {
        const actual = Convert.toResonance2(0);
        expect(actual).toBe(1);
    });
    it ("toResonance2 1.5", () => {
        const actual = Convert.toResonance2(1);
        expect(actual).toBe(1.5);
    });
    it ("toResonance2 2", () => {
        const actual = Convert.toResonance2(2);
        expect(actual).toBe(2);
    });
    it ("toResonance2 16", () => {
        const actual = Convert.toResonance2(0x1E);
        expect(actual).toBe(16);
    });

    it ("toFrequency2 150", () => {
        const actual = Convert.toFrequency2(0);
        expect(actual).toBe(150);
    });
    it ("toFrequency2 152", () => {
        const actual = Convert.toFrequency2(1);
        expect(actual).toBe(152);
    });
    it ("toFrequency2 154", () => {
        const actual = Convert.toFrequency2(2);
        expect(actual).toBe(154);
    });
    it ("toFrequency2 157", () => {
        const actual = Convert.toFrequency2(3);
        expect(actual).toBe(157);
    });
    it ("toFrequency2 2697", () => {
        const actual = Convert.toFrequency2(0x3FF);
        expect(actual).toBe(2697);
    });

    it ("toTimeShort 23.7", () => {
        const actual = Convert.toTimeShort(0x0);
        expect(actual).toBe(23.7);
    });
    it ("toTimeShort 23.9", () => {
        const actual = Convert.toTimeShort(0x1);
        expect(actual).toBe(23.9);
    });
    it ("toTimeShort 24.2", () => {
        const actual = Convert.toTimeShort(0x2);
        expect(actual).toBe(24.2);
    });
    it ("toTimeShort 99.4", () => {
        const actual = Convert.toTimeShort(0xFF);
        expect(actual).toBe(99.4);
    });

    it ("toTimeMedium 40.9", () => {
        const actual = Convert.toTimeMedium(0x0);
        expect(actual).toBe(40.9);
    });
    it ("toTimeMedium 42.3", () => {
        const actual = Convert.toTimeMedium(0x1);
        expect(actual).toBe(42.3);
    });
    it ("toTimeMedium 409.4", () => {
        const actual = Convert.toTimeMedium(0xFF);
        expect(actual).toBe(409.4);
    });

    it ("toTimeLong 61.4", () => {
        const actual = Convert.toTimeLong(0x0);
        expect(actual).toBe(61.4);
    });
    it ("toTimeLong 63.5", () => {
        const actual = Convert.toTimeLong(0x1);
        expect(actual).toBe(63.5);
    });
    it ("toTimeLong 65.7", () => {
        const actual = Convert.toTimeLong(0x2);
        expect(actual).toBe(65.7);
    });
    it ("toTimeLong 614.3", () => {
        const actual = Convert.toTimeLong(0xFF);
        expect(actual).toBe(614.3);
    });

    it ("toEmphasisFrequency 1000", () => {
        const actual = Convert.toEmphasisFrequency(0x0);
        expect(actual).toBe(1000);
    });
    it ("toEmphasisFrequency 1003", () => {
        const actual = Convert.toEmphasisFrequency(0x1);
        expect(actual).toBe(1003);
    });
    it ("toEmphasisFrequency 1007", () => {
        const actual = Convert.toEmphasisFrequency(0x2);
        expect(actual).toBe(1007);
    });
    it ("toEmphasisFrequency 2000", () => {
        const actual = Convert.toEmphasisFrequency(0xFF);
        expect(actual).toBe(2000);
    });

    it ("toLogDB -12.0", () => {
        const actual = Convert.toLogDB(0);
        expect(actual).toBe(-12);
    });
    it ("toLogDB -11.0", () => {
        const actual = Convert.toLogDB(1);
        expect(actual).toBe(-11);
    });
    it ("toLogDB -9.0", () => {
        const actual = Convert.toLogDB(3);
        expect(actual).toBe(-9);
    });
    it ("toLogDB -8.0", () => {
        const actual = Convert.toLogDB(4);
        expect(actual).toBe(-8);
    });
    it ("toLogDB -7.5", () => {
        const actual = Convert.toLogDB(5);
        expect(actual).toBe(-7.5);
    });
    it ("toLogDB -7.0", () => {
        const actual = Convert.toLogDB(6);
        expect(actual).toBe(-7);
    });
    it ("toLogDB -4.5", () => {
        const actual = Convert.toLogDB(11);
        expect(actual).toBe(-4.5);
    });
    it ("toLogDB -4.0", () => {
        const actual = Convert.toLogDB(12);
        expect(actual).toBe(-4);
    });
    it ("toLogDB -3.8", () => {
        const actual = Convert.toLogDB(13);
        expect(actual).toBe(-3.8);
    });
    it ("toLogDB +11.0", () => {
        const actual = Convert.toLogDB(0x3F);
        expect(actual).toBe(11);
    });
    it ("toLogDB +12.0", () => {
        const actual = Convert.toLogDB(0x40);
        expect(actual).toBe(12);
    });
});