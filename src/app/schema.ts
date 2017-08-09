import { normalize, schema, Schema } from 'normalizr';

// Define your comments schema
export const post = new schema.Entity('post');

// Define a users schema
export const user = new schema.Entity('user', {
    posts: [post]
});

export const users = new schema.Array(user);



export const normalizeUser = (data) => normalize(data, user);
export const normalizeUsers = (data) => normalize(data, users);