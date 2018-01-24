
export interface TextResources {
    PresetListItem_ToolTip_Index: string;
}

export interface TextLookup {
    getText(resourceKey: string, condition: boolean): string;
}

export default class TextProvider<ResourceT> implements TextLookup {
    public static Default: TextLookup;

    private textResources: ResourceT;

    public constructor(textResourcesJson: string) {
        this.textResources = JSON.parse(textResourcesJson);
        TextProvider.Default = this;
    }

    public get Texts(): ResourceT {
        return this.textResources;
    }

    public getText(resourceKey: string, condition: boolean = true): string {
        if (condition) {
            let text = resourceKey; // this.textResources[resourceKey];
            return text;
        }
        return "";
    }
}