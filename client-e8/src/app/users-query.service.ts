import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { IAppState } from './app.state';
import { NgRedux } from '@angular-redux/store';
import { User } from './user';
import { Post } from './post';

@Injectable({
    providedIn: "root"
})
export class UserQueryService {

    private UserIds$: Observable<string[]> = this.ngRedux.select((state: IAppState) => state.entities.users.ids);
    private Users$: Observable<any[]> = this.ngRedux.select((state: IAppState) => state.entities.users.list);
    private PostIds$: Observable<string[]> = this.ngRedux.select((state: IAppState) => state.entities.posts.ids);
    private Posts$: Observable<any[]> = this.ngRedux.select((state: IAppState) => state.entities.posts.list);

    constructor(private ngRedux: NgRedux<IAppState>) { }

    getUsers(): Observable<User[]> {
        return this.Users$.pipe(map(s => _.values(s)));
    }

    getPosts(): Observable<Post[]> {
        return this.Posts$.pipe(map(s => _.values(s)));
    }

    getPostsByUserId(userId: number) {
        return combineLatest(this.getUserById(userId).pipe(filter(s => {
            if (s) {
                return true;
            }
            return false;
        })), this.Posts$, (user, posts) => {
            return user.posts.map(id => posts[id]);
        })
    }

    getUserById(id: number): Observable<User> {
        return this.Users$.pipe(map(s => s[id]));
    }
}
