import { ProtocolBuffer } from "../ProtocolBuffer";

describe("ProtocolBuffer.ts", () => {

    it("data buffer initialized in constructor", () => {
        const buffer = new ProtocolBuffer();
        expect(buffer.data.length).toBe(65);
    });

    describe("Write method", () => {
        it("Write without offsets will copy data", () => {
            const buffer = new ProtocolBuffer();
            const l = buffer.write(0, [1, 2, 3, 4, 5], 0, 5);
            expect(l).toBe(5);
            expect(buffer.data[0]).toBe(1);
            expect(buffer.data[1]).toBe(2);
            expect(buffer.data[2]).toBe(3);
            expect(buffer.data[3]).toBe(4);
            expect(buffer.data[4]).toBe(5);
            expect(buffer.data[5]).toBe(0);
            expect(buffer.data[6]).toBe(0);
            expect(buffer.data[7]).toBe(0);
            expect(buffer.data[8]).toBe(0);
            expect(buffer.data[9]).toBe(0);
        });

        it("Write with length too large will copy max size", () => {
            const buffer = new ProtocolBuffer();
            const l = buffer.write(0, [1, 2, 3, 4, 5], 0, 8);
            expect(l).toBe(5);
            expect(buffer.data[0]).toBe(1);
            expect(buffer.data[1]).toBe(2);
            expect(buffer.data[2]).toBe(3);
        });

        it("Write with offset too large will return 0", () => {
            const buffer = new ProtocolBuffer();
            const l = buffer.write(100, [1, 2, 3, 4, 5], 0, 5);
            expect(l).toBe(0);
            expect(buffer.data[0]).toBe(0);
            expect(buffer.data[1]).toBe(0);
            expect(buffer.data[2]).toBe(0);
        });

        it("Write with srcOffset too large will return 0", () => {
            const buffer = new ProtocolBuffer();
            const l = buffer.write(0, [1, 2, 3, 4, 5], 10, 5);
            expect(l).toBe(0);
            expect(buffer.data[0]).toBe(0);
            expect(buffer.data[1]).toBe(0);
            expect(buffer.data[2]).toBe(0);
        });

        it("Write with length 0 will return 0", () => {
            const buffer = new ProtocolBuffer();
            const l = buffer.write(0, [1, 2, 3, 4, 5], 0, 0);
            expect(l).toBe(0);
            expect(buffer.data[0]).toBe(0);
            expect(buffer.data[1]).toBe(0);
            expect(buffer.data[2]).toBe(0);
        });

        it("Write with offset=size will return 0", () => {
            const buffer = new ProtocolBuffer();
            const l = buffer.write(65, [1, 2, 3, 4, 5], 0, 5);
            expect(l).toBe(0);
            expect(buffer.data[0]).toBe(0);
            expect(buffer.data[1]).toBe(0);
            expect(buffer.data[2]).toBe(0);
        });
    });
});