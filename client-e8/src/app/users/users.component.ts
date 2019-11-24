import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Subject, Observable } from 'rxjs';
import { User } from '../user';
import { MyHttpService } from '../my-service.service';
import { UserQueryService } from '../users-query.service';
import { IAppState, ReduxTable } from '../app.state';
import { normalizeUsers } from '../schema';
import { Post } from '../post';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    private unSub: Subject<void> = new Subject<void>();
    user: string;
    users: string;

    users$: Observable<User[]>;

    constructor(private myService: MyHttpService,
        private userQueryService: UserQueryService,
        private ngRedux: NgRedux<IAppState>) {
    }

    ngOnInit(): void {
        this.users$ = this.userQueryService.getUsers();

        this.myService.getUsers().subscribe(s => {
            const normalizedData = normalizeUsers(s.list);
            const users = normalizedData.entities.users;
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

    doSomething() {

    }
}
