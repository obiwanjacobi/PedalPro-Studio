import * as PresetStateReducer from "../preset/PresetStateReducer";
import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { ApplicationDocumentBuilder } from "../ApplicationDocumentBuilder";
import { createChangePresetsAction } from "../preset/ChangePresetsAction";
import { createLoadPresetsAction } from "../preset/LoadPresetsAction";
import { Preset } from "../preset/Preset";

describe("PresetStateReducer.ts", () => {
    it ("reduceLoadPresets - device - just loads in the specified presets", () => {
        const collection = PresetCollectionType.device;
        const testState = ApplicationDocumentBuilder.default;
        const expectedPreset = <Preset> { name: "test", index: 1, ui: {selected: true}, source: collection};
        const action = createLoadPresetsAction(collection, [expectedPreset]);
        const newState = PresetStateReducer.reduce(testState, action);
        expect(newState).not.toMatchObject(testState);
        expect(newState.device).toContain(expectedPreset);
    });

    it ("reduceLoadPresets - storage - just loads in the specified presets", () => {
        const collection = PresetCollectionType.storage;
        const testState = ApplicationDocumentBuilder.default;
        const expectedPreset = <Preset> { name: "test", index: 1, ui: {selected: true}, source: collection};
        const action = createLoadPresetsAction(collection, [expectedPreset]);
        const newState = PresetStateReducer.reduce(testState, action);
        expect(newState).not.toMatchObject(testState);
        expect(newState.storage).toContain(expectedPreset);
    });

    it ("reduceChangePresets - storage - selected is true", () => {
        const collection = PresetCollectionType.storage;
        const expectedPreset = <Preset> { name: "test", index: 1, ui: {selected: false}, source: collection};
        const testState: ApplicationDocument = { ...ApplicationDocumentBuilder.default, storage: [expectedPreset]};
        const action = createChangePresetsAction([expectedPreset], collection, { selected: true });
        const newState = PresetStateReducer.reduce(testState, action);
        expect(newState).not.toMatchObject(testState);
        expect(newState.storage[0].ui.selected).toBe(true);
    });
});