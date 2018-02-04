import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from 'app/post';
import { MyHttpService } from 'app/my-service.service';
import { UserQueryService } from 'app/users-query.service';
import { IAppState, ReduxTable } from 'app/app.state';
import { NgRedux } from '@angular-redux/store';
import { Subject } from 'rxjs';
import { User } from 'app/user';
import { normalizeUsers } from 'app/schema';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    private unSub: Subject<void> = new Subject<void>();
    p: number = 1;
    user: string;
    users: string;

    users$: Observable<User[]>;

    constructor(private myService: MyHttpService,
        private userQueryService: UserQueryService,
        private ngRedux: NgRedux<IAppState>) {
    }

    ngOnInit(): void {
        this.users$ = this.userQueryService.getUsers();

        this.myService.getUsers(this.p).take(1).subscribe(s => {
            let normalizedData = normalizeUsers(s.list);
            let users = normalizedData.entities.users;
            // let posts = normalizedData.entities.posts;
            // this.ngRedux.dispatch({ type: 'ADD_POSTS', payload: new ReduxTable({ list: posts, ids: Object.keys(posts).map(s => +s) }) });
            this.ngRedux.dispatch({ type: 'ADD_USERS', payload: new ReduxTable({ list: users, ids: normalizedData.result }) });

            // this.users = JSON.stringify(normalizedData);
        });
    }

    getPostsByUserId(userId: number): Observable<Post[]> {
        return this.userQueryService.getPostsByUserId(userId);
    }
    changeTitle(post) {
        this.ngRedux.dispatch({
            type: 'UPDATE_TITLE', payload: {
                id: post.id,
                title: (new Date()).toString()
            }
        });
    }

    updateName(id: number, name: string) {
        this.ngRedux.dispatch({
            type: 'UPDATE_USER',
            payload: { id: id, name: name }
        });
    }

    pageChange(event) {
        this.p = event;
        this.myService.getUsers(event).take(1).subscribe(s => {
            let normalizedData = normalizeUsers(s.list);
            let users = normalizedData.entities.users;
            this.ngRedux.dispatch({ type: 'ADD_USERS', payload: new ReduxTable({ list: users, ids: normalizedData.result }) });
        });
    }
}
