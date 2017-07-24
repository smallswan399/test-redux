import { User } from "app/user";
import { Notification, Conversation, Message } from "./user";

export interface IAppState {
    user: User;
}

export const INITIAL_STATE: IAppState = {
    user: new User({
        notifications: [],
        conversations: [
            new Conversation({
                conversationId: 1,
                messages: []
            }),
            new Conversation({
                conversationId: 1,
                messages: []
            })
        ],
        picture: '',
        userId: 1,
        userName: 'test'
    }),
};

export function rootReducer(state: IAppState, action): IAppState {
    debugger;
    switch (action.type) {
        case "user":
            return Object.assign({}, {
                ...state,
                user: Object.assign({}, {
                    ...state.user,
                    picture: 'test'
                })
            });
        case "notification":
            let notifications = Object.assign([], state.user.notifications);
            notifications.push(new Notification({
                notificationId: 1,
                read: true,
                type: 1
            }));
            let newState = Object.assign({}, state);
            newState.user.notifications = notifications;
            return newState;

        case "message1":
            debugger;
            let messages1 = Object.assign([], state.user.conversations[0].messages);
            messages1.push(new Message({
                content: 'message 1 content',
                messageId: 111
            }));
            newState = Object.assign({}, state);
            newState.user.conversations[0].messages = messages1;
            return newState;
        case "message2":
            debugger;
            let messages2 = Object.assign([], state.user.conversations[1].messages);
            messages2.push(new Message({
                content: 'message 2 content',
                messageId: 222
            }));
            newState = Object.assign({}, state);
            newState.user.conversations[1].messages = messages2;
            return newState;
        default:
            return state;
    }
}
