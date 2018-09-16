import * as Lodash from "lodash";

import { ItemBuilder, CopyOption } from "../StateBuilder";
import { Effects } from "./Effects";
import { RecursivePartial } from "../../TypeExtensions";

export class EffectsBuilder extends ItemBuilder<Effects> {
    public constructor(state: Effects, option: CopyOption = CopyOption.ByVal) {
        super();
        this.state = option === CopyOption.ByVal ? { ...state } : state;
    }

    public merge(source: RecursivePartial<Effects>) {
        Lodash.merge(this.mutable, source);
    }
}