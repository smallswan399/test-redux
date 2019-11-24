export class User {
    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    id: string;
    name: string;
    avatar: string;
    posts: number[];
}