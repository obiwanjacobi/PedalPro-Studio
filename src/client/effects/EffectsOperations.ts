import { Effects, EffectsEx, EffectNames } from "./Effects";
import { EffectsBuilder } from "./EffectsBuilder";
import { EffectsExBuilder } from "./EffectsExBuilder";
import { RecursivePartial } from "../../TypeExtensions";
import { ItemUI } from "../ItemUI";

export function changeEffectsUI(effectsOrEx: Effects | EffectsEx, effectName: EffectNames, ui: Partial<ItemUI>): Effects | EffectsEx {
    const effects = effectsOrEx as Effects;
    if (effects) {
        const builder = new EffectsBuilder(effects);
        builder.changeUIByName(effectName, ui);
        return builder.detach();
    }

    const effectsEx = effectsOrEx as EffectsEx;
    if (effectsEx) {
        const builder = new EffectsExBuilder(effectsEx);
        builder.changeUIByName(effectName, ui);
        return builder.detach();
    }

    throw new Error("Could not determine Effects or EffectsEx");
}

export function mergeEffects(source: Effects, merge: RecursivePartial<Effects>): Effects {
    const builder = new EffectsBuilder(source);
    builder.merge(merge);
    return builder.detach();
}

export function mergeEffectsEx(source: EffectsEx, merge: RecursivePartial<EffectsEx>): EffectsEx {
    const builder = new EffectsExBuilder(source);
    builder.merge(merge);
    return builder.detach();
}