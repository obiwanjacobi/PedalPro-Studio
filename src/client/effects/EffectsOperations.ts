import { Effects, EffectsEx } from "./Effects";
import { EffectsBuilder } from "./EffectsBuilder";
import { EffectsExBuilder } from "./EffectsExBuilder";
import { RecursivePartial } from "../../TypeExtensions";

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