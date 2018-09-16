import * as Lodash from "lodash";

import { ItemBuilder, CopyOption } from "../StateBuilder";
import { EffectsEx } from "./Effects";
import { RecursivePartial } from "../../TypeExtensions";

export class EffectsExBuilder extends ItemBuilder<EffectsEx> {
    public constructor(state: EffectsEx, option: CopyOption = CopyOption.ByVal) {
        super();
        this.state = option === CopyOption.ByVal ? { ...state } : state;
    }

    public merge(source: RecursivePartial<EffectsEx>) {
        Lodash.merge(this.mutable, source);
    }
}