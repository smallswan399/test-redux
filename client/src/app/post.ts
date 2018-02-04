export class Post {
    constructor(init?: Partial<Post>) {
        Object.assign(this, init);
    }

    id: number;
    userId: number;
    title: string;
    content: string;
    created: Date;
}