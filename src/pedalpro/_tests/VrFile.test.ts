import VrFile from "../VrFile";
import * as fs from "fs";
import FactoryExProvider from "../extended/FactoryExProvider";

const TestFilePath = "./src/pedalpro/_tests/PPEPreset81.vrf";

describe("VrFile.ts", () => {

    it ("fs", () => {

        const b = fs.readFileSync(TestFilePath);

        expect(b).not.toBeUndefined();
    });

    it ("read", () => {
        const file = VrFile.read(TestFilePath, 160);

        expect(file).not.toBeUndefined();
        expect(file.presets.length).toBe(400);
    });

    it ("Provider", () => {
        const provider = new FactoryExProvider(TestFilePath);
        const presets = provider.getPresets();

        expect(presets).not.toBeUndefined();
        expect(presets.length).toBe(400);

        expect(presets[0].name).toBe("CleanJazz");
        expect(presets[1].name).toBe("CleanBrght");
        expect(presets[362].name).toBe("#Tremolo");
        expect(presets[399].name).toBe("{empty_ps}");
    });
});