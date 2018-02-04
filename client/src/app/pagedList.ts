export class PagedList<T> {
    constructor(parameters?: Partial<PagedList<T>>) {
        Object.assign(this, parameters);
    }

    list: T[];
    page: number;
    size: number;
    count: number;
}