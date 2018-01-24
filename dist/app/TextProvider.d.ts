export interface TextResources {
    PresetListItem_ToolTip_Index: string;
}
export interface TextLookup {
    getText(resourceKey: string, condition: boolean): string;
}
export default class TextProvider<ResourceT> implements TextLookup {
    static Default: TextLookup;
    private textResources;
    constructor(textResourcesJson: string);
    readonly Texts: ResourceT;
    getText(resourceKey: string, condition?: boolean): string;
}
