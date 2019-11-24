import { normalize, schema, Schema } from 'normalizr';

// Define your comments schema
export const post = new schema.Entity('posts');

// Define a users schema
export const user = new schema.Entity('users', {
    posts: [post]
});

export const users = new schema.Array(user);

export const test = new schema.Entity('tests');
export const tests = new schema.Array(test);

export const normalizeUser = (data) => normalize(data, user);
export const normalizeUsers = (data) => normalize(data, users);

export const normalizeTest = (data) => normalize(data, test);
export const normalizeTests = (data) => normalize(data, tests);
