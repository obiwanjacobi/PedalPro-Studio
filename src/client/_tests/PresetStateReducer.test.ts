import * as PresetStateReducer from "../PresetStateReducer";
import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { Preset } from "../Preset";
import { SelectPresetsAction, createSelectPresetsAction } from "../SelectPresetsAction";
import { LoadPresetsAction, LoadPresetsActionKey } from "../LoadPresetsAction";

const createLoadPresetsAction = (preset: Preset, collection: PresetCollectionType) => {
    return <LoadPresetsAction> { 
        type: LoadPresetsActionKey, 
        presets: [ preset ], 
        source: collection
    };
};

describe("PresetStateReducer.ts", () => {
    it ("reduceLoadPresets - device - just loads in the specified presets", () => {
        const collection = PresetCollectionType.device;
        const testState = new ApplicationDocument();
        const expectedPreset = <Preset> { name: "test", index: 1, uiSelected: true, source: collection};
        const loadPresetsAction = createLoadPresetsAction(expectedPreset, collection);
        const newState = PresetStateReducer.reduce(testState, loadPresetsAction);
        expect(newState).not.toMatchObject(testState);
        expect(newState.device).toContain(expectedPreset);
    });

    it ("reduceLoadPresets - storage - just loads in the specified presets", () => {
        const collection = PresetCollectionType.storage;
        const testState = new ApplicationDocument();
        const expectedPreset = <Preset> { name: "test", index: 1, uiSelected: true, source: collection};
        const loadPresetsAction = createLoadPresetsAction(expectedPreset, collection);
        const newState = PresetStateReducer.reduce(testState, loadPresetsAction);
        expect(newState).not.toMatchObject(testState);
        expect(newState.storage).toContain(expectedPreset);
    });

    it ("reducePresetSelected - storage - selected is true", () => {
        const collection = PresetCollectionType.storage;
        const expectedPreset = <Preset> { name: "test", index: 1, uiSelected: false, source: collection};
        const testState = new ApplicationDocument(undefined, null, [expectedPreset]);
        const loadPresetsAction = createSelectPresetsAction([expectedPreset], { selected: true });
        const newState = PresetStateReducer.reduce(testState, loadPresetsAction);
        expect(newState).not.toMatchObject(testState);
        expect(newState.storage[0].uiSelected).toBe(true);
    });
});