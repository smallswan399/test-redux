import * as _ from 'lodash';
import { Test } from './test';

export class ReduxTable {
    ids: number[] = [];
    list: any = {};
    constructor(init?: Partial<ReduxTable>) {
        Object.assign(this, init);
    }
}

const users = (state: ReduxTable, action) => {
    switch (action.type) {
        case 'ADD_USERS':
            return _.merge({}, state, action.payload);
        case 'ADD_USER':
            return _.merge({}, state, action.payload);
        case 'UPDATE_USER':
            const { id, name } = action.payload;
            const result = {
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
            const { id, title } = action.payload;
            const result = {
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
    test: Test;
    entities: {
        users: ReduxTable;
        posts: ReduxTable;
    }
}

export const INITIAL_STATE: IAppState = {
    test: new Test(),
    entities: {
        users: new ReduxTable(),
        posts: new ReduxTable()
    },
};

const tests = (state: Test, action) => {
    switch (action.type) {
        case 'ADD_TEST':
            const newO =  {
                ...action.payload
            };
            if (_.isEqual(state, newO) === true) {
                return state;
            }
            return newO;
        default:
            return state;
    }
};

export function rootReducer(state: IAppState, action): IAppState {
    return {
        test: tests(state.test, action),
        entities: {
            users: users(state.entities.users, action),
            posts: posts(state.entities.posts, action)
        }
    }
}
