import { Injectable } from '@angular/core';
import { IAppState } from "app/app.state";
import { NgRedux } from "@angular-redux/store/lib/src";
import {Observable} from 'rxjs/Rx'
import 'rxjs/add/observable/from';

@Injectable()
export class UserQueryService {

    constructor(private ngRedux: NgRedux<IAppState>) { }

    selectUserIds$ = this.ngRedux.select(state => state.entities.users.ids);
    selectUsers$ = this.ngRedux.select(state => state.entities.users.users);
    selectPostIds$ = this.ngRedux.select(state => state.entities.posts.ids);
    selectPosts$ = this.ngRedux.select(state => state.entities.posts.posts);


    getUsers(){
        return Observable
        .combineLatest(this.selectUserIds$, this.selectUsers$, (userIds, users) => {
            // debugger;
            let result = userIds.map(userId => users[userId]);
            return result;
        });
    }

    getUsersWithPosts(){
        return Observable.combineLatest(this.getUsers(), this.selectPosts$, (users, posts) => {
            debugger;
            return users.map(user => {
                debugger;
                return {
                    ...user,
                    posts: user.posts.map(s => posts[s])
                }
            });
        });
    }

    getPosts(){
        return Observable.combineLatest(this.selectPostIds$, this.selectPosts$, (postIds, posts) => {
            return postIds.map(id => posts[id]);
        })
    }
    getPostsWithUser(){
        return Observable.combineLatest(this.getPosts, this.selectUsers$, (post, users) => {
            debugger;
            return {
                ...post,
                user: users[post.userId]
            }
        });
    }
}