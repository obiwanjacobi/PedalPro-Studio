import { Directory } from "../Directory";

describe("Directory.ts", () => {

    it("create", () => {
        const path = ".\\temp\\test";
        const dir = Directory.create(path);
        expect(dir.name).toBe("test");
    });
});
