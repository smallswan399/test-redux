import * as _ from 'lodash';
import { Test } from './test';
import { Product } from './post';

export class ReduxTable<T> {
    constructor(init?: Partial<ReduxTable<T>>) {
        Object.assign(this, init);
    }
    ids: T[] = [];
    list: any = {};
}


const users = (state: ReduxTable<number>, action) => {
    switch (action.type) {
        case 'users.add':
          return myAddMergeNumber(state, action);
        case 'users.addOrUpdate':
          return myMerge(state, action);
        default:
          return state;
      }
};

const posts = (state: ReduxTable<number>, action) => {
    switch (action.type) {
        case 'posts.add':
          return myAddMergeNumber(state, action);
        case 'posts.addOrUpdate':
          return myMerge(state, action);
        default:
          return state;
      }
};

export interface IEntities {
    products: ReduxTable<number>;
    tests: ReduxTable<number>;
    users: ReduxTable<number>;
    posts: ReduxTable<number>;
}

export interface IAppState {
    entities: IEntities;
}

export const INITIAL_STATE: IAppState = {
    entities: {
        products: new ReduxTable(),
        tests: new ReduxTable(),
        users: new ReduxTable(),
        posts: new ReduxTable()
    },
};

const tests = (state: ReduxTable<number>, action) => {
    switch (action.type) {
        case 'tests.add':
          return myAddMergeNumber(state, action);
        case 'tests.addOrUpdate':
          return myMerge(state, action);
        default:
          return state;
      }
};

const products = (state: ReduxTable<number>, action) => {
    switch (action.type) {
        case 'products.add':
          return myAddMergeNumber(state, action);
        case 'products.addOrUpdate':
          return myMerge(state, action);
        default:
          return state;
      }
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


const myMerge = (state: ReduxTable<number>, action: any) => {
    const addings = _.difference(action.payload.ids, state.ids);
    const updatings = _.intersection(action.payload.ids, state.ids);
    let result;
    if (addings.length) {
        result = {
            ...state,
            ids: [...state.ids, ...addings].sort(),
            list: {
                ...state.list,
                ..._.pick(action.payload.list, addings)
            }
        };
    }
    if (updatings.length) {
        if (result) {
            result = {
                ...result,
                list: {
                    ...result.list,
                    ..._.mergeWith({}, _.pick(result.list, updatings), _.pick(action.payload.list, updatings), (objValue, srcValue) => {
                        if (_.isArray(objValue) && _.isArray(srcValue)) {
                            return _.union(objValue, srcValue).sort();
                        }
                    })
                }
            };
        } else {
            result = {
                ...state,
                list: {
                    ...state.list,
                    ..._.mergeWith({}, _.pick(state.list, updatings), _.pick(action.payload.list, updatings), (objValue, srcValue) => {
                        if (_.isArray(objValue) && _.isArray(srcValue)) {
                            return _.union(objValue, srcValue).sort();
                        }
                    })
                }
            };
        }
    }
    if (!addings.length && !updatings.length) {
        return state;
    }
    if (_.isEqual(state, result) === true) {
        return state;
    } else {
        return result;
    }
};

const myAddMergeNumber = (state: ReduxTable<number>, action: any) => {
    const newIds = _.difference(action.payload.ids, state.ids);
    if (!newIds.length) {
        return state;
    } else {
        const result = {
            ...state,
            ids: [...state.ids, ...newIds].sort(),
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
};