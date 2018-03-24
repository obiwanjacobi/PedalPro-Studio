import * as fs from "fs";
import { VrFile } from "../VrFile";
import { FactoryProviderEx } from "../extended/FactoryProviderEx";

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
        const provider = new FactoryProviderEx(TestFilePath);
        const presets = provider.getPresets();

        expect(presets).not.toBeUndefined();
        // empty's are filtered out.
        expect(presets.length).toBe(163);

        expect(presets[0].name).toBe("CleanJazz");
        expect(presets[1].name).toBe("CleanBrght");
    });
});