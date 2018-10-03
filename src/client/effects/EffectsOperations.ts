import { Effects, EffectsEx, EffectNames, EffectsOrEx } from "./Effects";
import { EffectsBuilder } from "./EffectsBuilder";
import { EffectsExBuilder } from "./EffectsExBuilder";
import { RecursivePartial } from "../../TypeExtensions";
import { ItemUI } from "../ItemUI";

export function changeEffectsUI(effectsOrEx: EffectsOrEx, effectName: EffectNames, ui: Partial<ItemUI>): EffectsOrEx {
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

export function mergeEffects(source: Effects, ...merges: RecursivePartial<Effects>[]): Effects {
    const builder = new EffectsBuilder(source);
    merges.forEach(m => builder.merge(m));
    return builder.detach();
}

export function mergeEffectsEx(source: EffectsEx, ...merges: RecursivePartial<EffectsEx>[]): EffectsEx {
    const builder = new EffectsExBuilder(source);
    merges.forEach(m => builder.merge(m));
    return builder.detach();
}
