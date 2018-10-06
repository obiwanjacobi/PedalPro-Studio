import * as Lodash from "lodash";

import { ItemBuilder, CopyOption } from "../StateBuilder";
import { EffectsBuilderCommon } from "./EffectsBuilderCommon";
import { Effects, EffectNames } from "./Effects";
import { RecursivePartial } from "../../TypeExtensions";
import { ItemUI, itemUiModify } from "../ItemUI";

export class EffectsBuilder extends ItemBuilder<Effects> implements EffectsBuilderCommon {
    public constructor(state: Effects, option: CopyOption = CopyOption.ByVal) {
        super();
        this.state = option === CopyOption.ByVal ? { ...state } : state;
    }

    public merge(source: RecursivePartial<Effects>): void {
        Lodash.merge(this.mutable, source);
    }

    public changeUIByName(effectName: EffectNames, ui: Partial<ItemUI>): void {
        // @ts-ignore: implicit any
        const effect = this.mutable[effectName];
        effect.ui = itemUiModify(effect, ui);
    }
}