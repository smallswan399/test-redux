export class PagedList<T> {
    constructor(parameters?: Partial<PagedList<T>>) {
        Object.assign(this, parameters);
    }

    list: T[];
    pageInfo: PageInfo;
}


export class PageInfo {
    constructor(parameters?: Partial<PageInfo>) {
        Object.assign(this, parameters);
    }
    
    page?: number;
    size?: number;
    count?: number;
}