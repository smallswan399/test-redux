import { User } from "app/user";
import * as _ from "lodash";

export class ReduxTable {
    constructor(init?: Partial<ReduxTable>) {
        Object.assign(this, init);
    }

    ids: number[] = [];
    list: any = {}
}

const users = (state: ReduxTable, action) => {
    switch (action.type) {
        case 'ADD_USERS':
            return _.merge({}, state, action.payload);
        case 'ADD_USER':
            return _.merge({}, state, action.payload);
        case 'UPDATE_USER':
            let {id, name} = action.payload;
            let result = {
                ...state,
                list: {
                    ...state.list,
                    [id]: {
                        ...state.list[id],
                        name: name
                    }
                }
            }
            return result;
        default:
            return state;
    }
};

const posts = (state: ReduxTable, action) => {
    switch (action.type) {
        case 'ADD_POSTS':
            return _.merge({}, state, action.payload);
        case 'ADD_POST':
            return _.merge({}, state, action.payload);
        case 'UPDATE_TITLE':
            // debugger;
            let {id, title} = action.payload;
            let result = {
                ...state,
                list: {
                    ...state.list,
                    [id]: {
                        ...state.list[id],
                        title: title
                    }
                }
            };
            return result;

        default:
            return state;
    }
};

export interface IAppState {
    entities: {
        users: ReduxTable;
        posts: ReduxTable;
    }
}

export const INITIAL_STATE: IAppState = {
    entities: {
        users: new ReduxTable(),
        posts: new ReduxTable()
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
