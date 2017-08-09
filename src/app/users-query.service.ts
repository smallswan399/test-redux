import { Injectable } from '@angular/core';
import { IAppState, ReduxTable } from "app/app.state";
import { NgRedux } from "@angular-redux/store/lib/src";
import {Observable} from 'rxjs/Rx'
import 'rxjs/add/observable/from';
import { User, Post } from "app/user";

@Injectable()
export class UserQueryService {

    constructor(private ngRedux: NgRedux<IAppState>) { }

    UserIds$: Observable<number[]> = this.ngRedux.select((state: IAppState) => state.entities.users.ids);
    Users$: Observable<any[]> = this.ngRedux.select((state: IAppState) => state.entities.users.list);
    PostIds$: Observable<number[]> = this.ngRedux.select((state: IAppState) => state.entities.posts.ids);
    Posts$: Observable<any[]> = this.ngRedux.select((state: IAppState) => state.entities.posts.list);


    getUsers(){
        return Observable.combineLatest(this.UserIds$, this.Users$, (userIds, users) => {
            let result = userIds.map(userId => users[userId] ? users[userId] : new User());
            return result;
        });
    }

    getPosts(){
        return Observable.combineLatest(this.PostIds$, this.Posts$, (postIds, posts) => {
            return postIds.map(id => posts[id] ? posts[id] : new Post());
        })
    }

    getPostsByUserId(userId: number){
        return Observable.combineLatest(this.getUserById(userId), this.Posts$, (user, posts) => {
            return user.posts.map(id => posts[id]);
        })
    }

    getUserById(id: number): Observable<User>{
        return this.Users$.map(s => s[id]);
    }
}