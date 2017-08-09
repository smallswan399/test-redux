import { Injectable } from '@angular/core';
import { IAppState, ReduxTable } from "app/app.state";
import { NgRedux } from "@angular-redux/store/lib/src";
import {Observable} from 'rxjs/Rx'
import 'rxjs/add/observable/from';
import { User } from "app/user";

@Injectable()
export class UserQueryService {

    constructor(private ngRedux: NgRedux<IAppState>) { }

    UserIds$ = this.ngRedux.select((state: IAppState) => state.entities.users.ids);
    Users$ = this.ngRedux.select((state: IAppState) => state.entities.users.list);
    PostIds$ = this.ngRedux.select((state: IAppState) => state.entities.posts.ids);
    Posts$ = this.ngRedux.select((state: IAppState) => state.entities.posts.list);


    getUsers(){
        return Observable
        .combineLatest(this.UserIds$, this.Users$, (userIds, users) => {
            // debugger;
            let result = userIds.map(userId => users[userId] ? users[userId] : new User());
            return result;
        });
    }

    getUsersWithPosts(){
        return Observable.combineLatest(this.getUsers(), this.Posts$, (users, posts) => {
            // debugger;
            return users.map(user => {
                // debugger;
                return {
                    ...user,
                    posts: user.posts.map(s => posts[s])
                }
            });
        });
    }

    getPosts(){
        return Observable.combineLatest(this.PostIds$, this.Posts$, (postIds, posts) => {
            return postIds.map(id => posts[id]);
        })
    }
    getPostsWithUser(){
        return Observable.combineLatest(this.getPosts, this.Users$, (post, users) => {
            debugger;
            return {
                ...post,
                user: users[post.userId]
            }
        });
    }
}