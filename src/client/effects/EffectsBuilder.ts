import * as Lodash from "lodash";

import { ItemBuilder, CopyOption } from "../StateBuilder";
import { Effects, EffectNames } from "./Effects";
import { RecursivePartial } from "../../TypeExtensions";
import { ItemUI, itemUiModify } from "../ItemUI";

export class EffectsBuilder extends ItemBuilder<Effects> {
    public constructor(state: Effects, option: CopyOption = CopyOption.ByVal) {
        super();
        this.state = option === CopyOption.ByVal ? { ...state } : state;
    }

    public merge(source: RecursivePartial<Effects>) {
        Lodash.merge(this.mutable, source);
    }

    public changeUIByName(effectName: EffectNames, ui: Partial<ItemUI>) {
        // @ts-ignore: implicit any
        const effect = this.mutable[effectName];
        effect.ui = itemUiModify(effect, ui);
    }
}