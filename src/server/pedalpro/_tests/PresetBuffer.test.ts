import { PresetBuffer } from "../PresetBuffer";

const TestBufferSize = 20;

describe("PedalProPresetBuffer.ts", () => {

    it("name - with space", () => {
        const buffer = new PresetBuffer(TestBufferSize);
        buffer.write(0, [65, 73, 80, 32, 90, 32, 32, 32, 32, 32], 0, 10);

        expect(buffer.name.length).toBe(10);
        expect(buffer.name.trim()).toBe("AIP Z");
    });

    it("name - expression", () => {
        const buffer = new PresetBuffer(TestBufferSize);
        buffer.write(0, [65, 73, 80, 32, 32, 32, 32, 32, 32, 5], 0, 10);

        expect(buffer.name.length).toBe(9);
        expect(buffer.name.trim()).toBe("AIP");
    });

    it("name - stereo", () => {
        const buffer = new PresetBuffer(TestBufferSize);
        buffer.write(0, [65, 73, 80, 32, 32, 32, 32, 32, 32, 4], 0, 10);

        expect(buffer.name.length).toBe(9);
        expect(buffer.name.trim()).toBe("AIP");
    });
});