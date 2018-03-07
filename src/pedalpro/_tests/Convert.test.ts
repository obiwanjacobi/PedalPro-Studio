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
        expect(actual).toBe(true);
    });
    it ("hasFlag v|f = false", () => {
        const actual = Convert.hasFlag(0x01, 0);
        expect(actual).toBe(false);
    });

    it("getBitsOf v,b,l = 0x02", () => {
        const actual = Convert.getBitsOf(0x02, 1, 2);
        expect(actual).toBe(0x2);
    });
    it("getBitsOf v,b,l = 0x01", () => {
        const actual = Convert.getBitsOf(0x02, 2, 2);
        expect(actual).toBe(0x1);
    });
});