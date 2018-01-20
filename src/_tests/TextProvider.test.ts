import TextProvider, { TextResources } from "../TextProvider";

describe("TextProvider.ts", () => {
    it ("Ctor - parses json resources", () => {
        let json = "{ \"PresetListItem_ToolTip_Index\": \"TestValue\" }";
        let uut = new TextProvider<TextResources>(json);
        expect(uut.Texts.PresetListItem_ToolTip_Index).toBe("TestValue");
    });

    it ("getText - returns expected value", () => {
        let json = "{ \"PresetListItem_ToolTip_Index\": \"TestValue\" }";
        let uut = new TextProvider<TextResources>(json);
        expect(uut.getText("PresetListItem_ToolTip_Index")).toBe("TestValue");
    });

    it ("getText - false condition - returns empty", () => {
        let json = "{ \"PresetListItem_ToolTip_Index\": \"TestValue\" }";
        let uut = new TextProvider<TextResources>(json);
        expect(uut.getText("PresetListItem_ToolTip_Index", false)).toBe("");
    });
});