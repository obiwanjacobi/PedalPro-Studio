import ApplicationDocument from "./ApplicationDocument";
import { LoadPresetsAction } from "./LoadPresetsAction";
import { SelectPresetsAction } from "./SelectPresetsAction";
import { CopyPresetsAction } from "./CopyPresetsAction";
import { EditPresetAction } from "./EditPresetAction";
import { MovePresetAction } from "./MovePresetAction";
export declare type PresetAction = LoadPresetsAction | SelectPresetsAction | CopyPresetsAction | EditPresetAction | MovePresetAction;
export declare const reduce: (state: ApplicationDocument, action: PresetAction) => ApplicationDocument;
