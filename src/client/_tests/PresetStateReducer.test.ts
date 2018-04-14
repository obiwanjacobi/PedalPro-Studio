import * as PresetStateReducer from "../PresetStateReducer";
import { ApplicationDocument, PresetCollectionType } from "../ApplicationDocument";
import { Preset } from "../Preset";
import { ChangePresetsAction, createChangePresetsAction } from "../ChangePresetsAction";
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
        const expectedPreset = <Preset> { name: "test", index: 1, ui: {selected: true}, source: collection};
        const action = createLoadPresetsAction(expectedPreset, collection);
        const newState = PresetStateReducer.reduce(testState, action);
        expect(newState).not.toMatchObject(testState);
        expect(newState.device).toContain(expectedPreset);
    });

    it ("reduceLoadPresets - storage - just loads in the specified presets", () => {
        const collection = PresetCollectionType.storage;
        const testState = new ApplicationDocument();
        const expectedPreset = <Preset> { name: "test", index: 1, ui: {selected: true}, source: collection};
        const action = createLoadPresetsAction(expectedPreset, collection);
        const newState = PresetStateReducer.reduce(testState, action);
        expect(newState).not.toMatchObject(testState);
        expect(newState.storage).toContain(expectedPreset);
    });

    it ("reducePresetSelected - storage - selected is true", () => {
        const collection = PresetCollectionType.storage;
        const expectedPreset = <Preset> { name: "test", index: 1, ui: {selected: false}, source: collection};
        const testState = new ApplicationDocument(undefined, null, [expectedPreset]);
        const action = createChangePresetsAction([expectedPreset], collection, { selected: true });
        const newState = PresetStateReducer.reduce(testState, action);
        expect(newState).not.toMatchObject(testState);
        expect(newState.storage[0].ui.selected).toBe(true);
    });
});