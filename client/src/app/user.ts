export class User {
    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    id: number;
    name: string;
    picture: string;
    posts: number[] = [];
}