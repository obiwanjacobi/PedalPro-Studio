import { Interactive } from "./Interactive";

export enum SetInteractiveActionKey {
    value = "U/notification/interactive"
}

export interface SetInteractiveAction {
    readonly type: SetInteractiveActionKey;
    readonly interactive?: Interactive;
}

export function createSetInteractiveAction(interactive?: Interactive): SetInteractiveAction {
    return { type: SetInteractiveActionKey.value, interactive: interactive };
}

export interface SetInteractive {
    setInteractive(interactive?: Interactive): void;
}