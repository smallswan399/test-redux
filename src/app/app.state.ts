import { User } from "app/user";
import { Post } from "./user";



const users = (state = [], action) => {
    switch(action.type){
        case 'ADD_USER':
            return [
                ...state,
                action.payload
            ];
        default:
            return state;
    }
};

const posts = (state = [], action) => {
    switch(action.type){
        case 'ADD_POST':
            return [
                ...state,
                action.payload
            ];
        default:
            return state;
    }
};

export interface IAppState {
    users: User[];
    posts: Post[];
}

export const INITIAL_STATE: IAppState = {
    users: [],
    posts: []
};

export function rootReducer(state: IAppState, action): IAppState {
    return {
        users: users(state.users, action),
        posts: posts(state.posts, action)
    }
}
