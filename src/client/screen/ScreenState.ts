export default class ScreenState {
    public readonly targetPresetDialogOpen?: boolean;

    public constructor(targetPresetDialogOpen?: boolean) {
        this.targetPresetDialogOpen = targetPresetDialogOpen ? targetPresetDialogOpen : false;
    }

    public copyOverride(targetPresetDialogOpen?: boolean): ScreenState {
        return new ScreenState(
            targetPresetDialogOpen !== undefined ? targetPresetDialogOpen : this.targetPresetDialogOpen
        );
    }
}