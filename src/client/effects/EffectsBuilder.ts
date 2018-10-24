import * as Lodash from "lodash";

import { RecursivePartial } from "../../TypeExtensions";
import { ItemUI, itemUiModify } from "../ItemUI";
import { ItemBuilder, CopyOption } from "../StateBuilder";
import { EffectsOrEx, EffectNames } from "./Effects";

export const defaultUI: ItemUI = { selected: false, expanded: false, markedDeleted: false };

export class EffectsBuilder extends ItemBuilder<EffectsOrEx> {
    public constructor(state: EffectsOrEx, option: CopyOption = CopyOption.ByVal) {
        super();
        this.state = option === CopyOption.ByVal ? { ...state } : state;
    }

    public changeUIByName(effectName: EffectNames, ui: Partial<ItemUI>) {
        // @ts-ignore: implicit any
        const effect = this.mutable[effectName];
        // @ts-ignore: implicit any
        this.mutable[effectName] = { ...effect, ui: itemUiModify(effect.ui, ui) };
    }

    public merge(source: RecursivePartial<EffectsOrEx>) {
        Lodash.merge(this.mutable, source);
    }
}
