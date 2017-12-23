export default class EntityFilter {
    // data paging
    public skip: number = 0;
    public take: number;

    // content selection
    public name: RegExp;
}