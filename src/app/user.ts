export class User {
    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    id: number;
    username: string;
    password: string;
    picture: string;
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