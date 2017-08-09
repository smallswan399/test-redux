export class User {
    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    id: number;
    name: string;
    picture: string;
    posts: number[];
}

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