import * as Lodash from "lodash";

import { ItemBuilder, CopyOption } from "../StateBuilder";
import { EffectsEx, EffectNames } from "./Effects";
import { RecursivePartial } from "../../TypeExtensions";
import { ItemUI, itemUiModify } from "../ItemUI";

export class EffectsExBuilder extends ItemBuilder<EffectsEx> {
    public constructor(state: EffectsEx, option: CopyOption = CopyOption.ByVal) {
        super();
        this.state = option === CopyOption.ByVal ? { ...state } : state;
    }

    public merge(source: RecursivePartial<EffectsEx>) {
        Lodash.merge(this.mutable, source);
    }

    public changeUIByName(effectName: EffectNames, ui: Partial<ItemUI>) {
        // @ts-ignore: implicit any
        const effect = this.mutable[effectName];
        effect.ui = itemUiModify(effect, ui);
    }
}