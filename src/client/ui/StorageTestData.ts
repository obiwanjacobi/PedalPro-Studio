import { PresetTraits } from "../../model/PresetTraits";
import { Preset } from "../Preset";
import { ItemUI } from "../ItemUI";
import * as ModelPreset from "../../model/Preset";
import { EffectsEx } from "../../model/Effects";
import { PresetCollectionType } from "../ApplicationDocument";
import { PresetMeta } from "../../model/PresetMeta";

// tslint:disable:max-line-length

const meta: PresetMeta = {
    device: "4"
};
const traits: PresetTraits = {
    singleCoil: false, humbucker: false, stereo: false, expression: false, empty: false
};
const itemUi: ItemUI = {
    selected: false, expanded: false, markedDeleted: false
};
const origin: ModelPreset.Preset = {
    name: "Preset",
    index: 0,
    traits: traits,
    effects: <EffectsEx> {},
    meta: meta
};
const preset1: Preset = {
    source: PresetCollectionType.storage,
    name: "Preset 1",
    index: 0,
    ui: itemUi,
    traits: traits,
    effects: <EffectsEx> {},
    meta: meta,
    origin: origin,
};
const preset2: Preset = {
    source: PresetCollectionType.storage,
    name: "Preset 2",
    index: 1,
    ui: itemUi,
    traits: traits,
    effects: <EffectsEx> {},
    meta: meta,
    origin: origin,
};
const preset3: Preset = {
    source: PresetCollectionType.storage,
    name: "Preset 3",
    index: 2,
    ui: itemUi,
    traits: traits,
    effects: <EffectsEx> {},
    meta: meta,
    origin: origin,
};

export const testStorageItems = [
    { bank: "bank 1", presets: [preset1], ui: itemUi},
    { bank: "bank 2", presets: [preset1, preset2], ui: itemUi},
    { bank: "bank 3", presets: [preset1, preset2, preset3], ui: itemUi},
    { bank: "bank 4", presets: [], ui: itemUi},
];
