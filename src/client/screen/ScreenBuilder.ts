import { ItemBuilder, CopyOption } from "../StateBuilder";
import { ScreenState } from "./ScreenState";

export class ScreenBuilder extends ItemBuilder<ScreenState> {
    public static default: ScreenState = {
        pasteOpen: false,
        moveOpen: false
    };

    public static modify(state: ScreenState, update: Partial<ScreenState>): ScreenState {
        return { ...state, ...update };
    }
    
    public constructor(state: ScreenState, option: CopyOption = CopyOption.ByVal) {
        super();
        this.state = option === CopyOption.ByVal ? { ...state } : state;
    }
}