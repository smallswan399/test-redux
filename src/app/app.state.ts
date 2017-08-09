import { User } from "app/user";
import { Post } from "./user";
import * as _ from "lodash";



export const users = (state, action) => {
    switch (action.type) {
        case 'ADD_USERS':
            debugger;
            return _.merge({}, state, action.payload);
        case 'ADD_USER':
            return _.merge({}, state, action.payload);
        default:
            return state;
    }
};

const posts = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_POSTS':
            return _.merge({}, state, action.payload);
        case 'ADD_POST':
            return _.merge({}, state, action.payload);
        default:
            return state;
    }
};

export interface IAppState {
    entities: {
        users: any;
        posts: any;
    }
}

export const INITIAL_STATE: IAppState = {
    entities: {
        users: {},
        posts: {}
    },
};

export function rootReducer(state: IAppState, action): IAppState {
    return {
        entities: {
            users: users(state.entities.users, action),
            posts: posts(state.entities.posts, action)
        }
        
    }
}
