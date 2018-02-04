import { Injectable } from '@angular/core';
import { IAppState, ReduxTable } from "app/app.state";
import { NgRedux } from "@angular-redux/store/lib/src";
import {Observable} from 'rxjs/Rx'
import 'rxjs/add/observable/from';
import { User } from "app/user";
import * as _ from 'lodash';
import { Post } from 'app/post';

@Injectable()
export class UserQueryService {

    constructor(private ngRedux: NgRedux<IAppState>) { }

    private UserIds$: Observable<number[]> = this.ngRedux.select((state: IAppState) => state.entities.users.ids);
    private Users$: Observable<any[]> = this.ngRedux.select((state: IAppState) => state.entities.users.list);
    private PostIds$: Observable<number[]> = this.ngRedux.select((state: IAppState) => state.entities.posts.ids);
    private Posts$: Observable<any[]> = this.ngRedux.select((state: IAppState) => state.entities.posts.list);


    getUsers(): Observable<User[]>{
        return this.Users$.map(s => _.values(s));
        // return Observable.combineLatest(this.UserIds$, this.Users$, (userIds, users) => {
        //     let result = userIds.map(userId => users[userId] ? users[userId] : new User());
        //     return result;
        // });
    }

    getPosts(): Observable<Post[]>{
        return this.Posts$.map(s => _.values(s));
        // return Observable.combineLatest(this.PostIds$, this.Posts$, (postIds, posts) => {
        //     return postIds.map(id => posts[id] ? posts[id] : new Post());
        // })
    }

    getPostsByUserId(userId: number){
        return Observable.combineLatest(this.getUserById(userId).filter(s => {
            if (s) {
                return true;
            }
            return false;
        }), this.Posts$, (user, posts) => {
            return user.posts.map(id => posts[id]);
        })
    }

    getUserById(id: number): Observable<User>{
        return this.Users$.map(s => s[id]);
    }
}