import { EffectsOrEx, Effects, EffectsEx, EffectNames } from "./Effects";
import { isEffects, isEffectsEx } from "./EffectsOperations";
import { EffectsBuilder } from "./EffectsBuilder";
import { EffectsExBuilder } from "./EffectsExBuilder";
import { ItemUI } from "../ItemUI";

export interface EffectsBuilderCommon {
    changeUIByName(effectName: EffectNames, ui: Partial<ItemUI>): void;
    detach(): EffectsOrEx;
}

export function createBuilder(effectsOrEx: EffectsOrEx): EffectsBuilderCommon {
    if (isEffects(effectsOrEx)) {
        return new EffectsBuilder(effectsOrEx as Effects);
    }
    if (isEffectsEx(effectsOrEx)) {
        return new EffectsExBuilder(effectsOrEx as EffectsEx);
    }
    throw new Error("Could not determine the type of EffectsOrEx.");
}