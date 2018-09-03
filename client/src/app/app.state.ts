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
    entities: {
        tests: ReduxTable;
        users: ReduxTable;
        posts: ReduxTable;
    }
}

export const INITIAL_STATE: IAppState = {
    entities: {
        tests: new ReduxTable(),
        users: new ReduxTable(),
        posts: new ReduxTable()
    },
};

const tests = (state: ReduxTable, action) => {
    switch (action.type) {
        case 'add_tests':
            return myAddMergeNumber(state, action);
        case 'add_or_update_tests':
            return myMerge(state, action);
        default:
            return state;
    }
};

export function rootReducer(state: IAppState, action): IAppState {
    return {
        entities: {
            tests: tests(state.entities.tests, action),
            users: users(state.entities.users, action),
            posts: posts(state.entities.posts, action)
        }
    }
}

const myMerge = (state, action) => {
    const newState = _.mergeWith({}, state, action.payload, (objValue, srcValue) => {
        if (_.isArray(objValue)) {
            return _.union(objValue, srcValue).sort();
        }
    });
    if (_.isEqual(state, newState) === true) {
        return state;
    } else {
        return newState;
    }
};

const myAddMergeNumber = (state: ReduxTable, action: any) => {
    const addingIds = action.payload.ids;
    const existIds = state.ids;
    const newIds = _.difference(addingIds, existIds).sort();
    if (!newIds.length) {
        return state;
    } else {
        const newState = new ReduxTable({
            ids: newIds,
            list: _.pick(action.payload.list, newIds)
        });
        const result = _.mergeWith({}, state, newState, (objValue, srcValue) => {
            if (_.isArray(objValue)) {
                return _.union(objValue, srcValue).sort();
            }
        });
        if (_.isEqual(state, result) === true) {
            return state;
        } else {
            alert(JSON.stringify(result));
            return result;
        }
    }
};
