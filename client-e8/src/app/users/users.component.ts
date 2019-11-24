import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Subject, Observable } from 'rxjs';
import { User } from '../user';
import { MyHttpService } from '../http.service';
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
    users: User[];
    constructor(private http: MyHttpService,
        private userQueryService: UserQueryService,
        private ngRedux: NgRedux<IAppState>) {
    }

    ngOnInit(): void {
        this.userQueryService.getUsers().subscribe(users => this.users = users);

        this.http.getUsers().subscribe(s => {
            const normalizedData = normalizeUsers(s);
            const users = normalizedData.entities.users;
            this.ngRedux.dispatch({ type: 'users.addOrUpdate', payload: new ReduxTable({ list: users, ids: normalizedData.result }) });
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
