import * as _ from 'lodash';
import { Test } from './test';
import { Product } from './post';

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
        products: Product[];
        tests: ReduxTable;
        users: ReduxTable;
        posts: ReduxTable;
    }
}

export const INITIAL_STATE: IAppState = {
    entities: {
        products: [],
        tests: new ReduxTable(),
        users: new ReduxTable(),
        posts: new ReduxTable()
    },
};

const tests = (state: ReduxTable, action) => {
    switch (action.type) {
        case 'add_tests':
            const addingIds = action.payload.ids;
            const existIds = state.ids;
            const newIds = _.difference(addingIds, existIds).sort();
            if (!newIds.length) {
                return state;
            } else {
                const result = {
                    ...state,
                    ids: [...existIds, ...newIds],
                    list: {
                        ...state.list,
                        ..._.pick(action.payload.list, newIds)
                    }
                };

                if (_.isEqual(state, result) === true) {
                    return state;
                } else {
                    return result;
                }
            }
        case 'add_or_update_tests':
            const addings = _.difference(action.payload.ids, state.ids);
            const updatings = _.intersection(action.payload.ids, state.ids);
            let result;
            if (addings.length) {
                result = {
                    ...state,
                    ids: [...state.ids, ...addingIds].sort(),
                    list: {
                        ...state.list,
                        ..._.pick(action.payload.list, addingIds)
                    }
                };
            }
            if (updatings.length) {
                result = {
                    ...state,
                    list: {
                        ...state.list,
                        ..._.pick(action.payload.list, updatings)
                    }
                };
            }
            if (_.isEqual(state, result) === true) {
                return state;
            } else {
                return result;
            }
        default:
            return state;
    }
};

const products = (state: Product[], action) => {
    switch (action.type) {
        case 'add_products':
            const adding = action.payload;
            const addingIds = _.differenceBy(adding, state, (s => s.id));
            if (addingIds.length) {
                return [
                    ...state,
                    ...addingIds
                ];
            }
            break;
        case 'add_product':
            break;
        case 'update_product':
            break;
        default:
            break;
    }
    return state;
};

export function rootReducer(state: IAppState, action): IAppState {
    return {
        entities: {
            products: products(state.entities.products, action),
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
            return result;
        }
    }
};
