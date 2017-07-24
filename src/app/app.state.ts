import { User } from "app/user";
import { Notification } from "./user";

export interface IAppState {
    user: User;
}

export const INITIAL_STATE: IAppState = {
    user: new User({
        notifications: [],
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


            // return state;
            // let notifications = Object.assign({}, state.user.notifications);
            
            // return Object.assign({}, {
            //     ...state,
            //     user: Object.assign({}, {
            //         ...state.user,
            //         notifications: notifications
            //     })
            // });
        default:
            return state;
    }
}
