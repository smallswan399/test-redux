import { Injectable } from '@angular/core';
import { IAppState, ReduxTable } from 'app/app.state';
import { NgRedux } from '@angular-redux/store/lib/src';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/observable/from';
import { User } from 'app/user';
import * as _ from 'lodash';
import { Post } from 'app/post';

@Injectable()
export class UserQueryService {

    private UserIds$: Observable<number[]> = this.ngRedux.select((state: IAppState) => state.entities.users.ids);
    private Users$: Observable<any[]> = this.ngRedux.select((state: IAppState) => state.entities.users.list);
    private PostIds$: Observable<number[]> = this.ngRedux.select((state: IAppState) => state.entities.posts.ids);
    private Posts$: Observable<any[]> = this.ngRedux.select((state: IAppState) => state.entities.posts.list);

    constructor(private ngRedux: NgRedux<IAppState>) { }

    getUsers(): Observable<User[]> {
        return this.Users$.map(s => _.values(s));
    }

    getPosts(): Observable<Post[]> {
        return this.Posts$.map(s => _.values(s));
    }

    getPostsByUserId(userId: number) {
        return Observable.combineLatest(this.getUserById(userId).filter(s => {
            if (s) {
                return true;
            }
            return false;
        }), this.Posts$, (user, posts) => {
            return user.posts.map(id => posts[id]);
        })
    }

    getUserById(id: number): Observable<User> {
        return this.Users$.map(s => s[id]);
    }
}
