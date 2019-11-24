export class Post {
    id: string;
    userId: string;
    user: string;
    title: string;
    content: string;
    createdAt: Date;
    constructor(init?: Partial<Post>) {
        Object.assign(this, init);
    }
}


export class Product {
    id: number;
    name: string;
    constructor(parameters?: Partial<Product>) {
        Object.assign(this, parameters);
    }
}
