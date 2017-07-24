export class User {
    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    userId: number;
    userName: string;
    picture: string;
    notifications: Notification[] = [];
    conversations: Conversation[] = [];
}

export class Notification {
    constructor(init?: Partial<Notification>) {
        Object.assign(this, init);
    }

    notificationId
    type: number;
    read: boolean;
}

export class Conversation {
    constructor(init?: Partial<Conversation>) {
        Object.assign(this, init);
    }

    conversationId: number;
    messages: Message[] = [];
}

export class Message {
    constructor(init?: Partial<Message>) {
        Object.assign(this, init);
    }
    messageId: number;
    content: string;
}