export class User {
    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    id: number;
    name: string;
    posts: number[];
}