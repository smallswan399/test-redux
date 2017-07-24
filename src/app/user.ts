export class User {
    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    userId: number;
    userName: string;
    picture: string;

    notifications: Notification[] = [];
}

export class Notification {
    constructor(init?: Partial<Notification>) {
        Object.assign(this, init);
    }

    notificationId
    type: number;
    read: boolean;
    // craeted: Date
}