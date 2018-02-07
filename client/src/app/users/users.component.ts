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
import { PageInfo } from 'app/pagedList';
import * as _ from 'lodash';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    private unSub: Subject<void> = new Subject<void>();
    pageInfo: PageInfo = new PageInfo({
        page: 1,
        size: 5
    });
    
    user: string;
    users: string;

    users$: Observable<User[]>;

    constructor(private myService: MyHttpService,
        private userQueryService: UserQueryService,
        private ngRedux: NgRedux<IAppState>) {
    }

    ngOnInit(): void {
        this.users$ = this.userQueryService.getUsers().map(s => {
            let result = _(s).orderBy(['id']).drop((this.pageInfo.page - 1)*this.pageInfo.size).take(this.pageInfo.size).value();
            return result;
        });

        this.myService.getUsers(this.pageInfo).take(1).subscribe(s => {
            this.pageInfo = s.pageInfo;
            let normalizedData = normalizeUsers(s.list);
            let users = normalizedData.entities.users;
            this.ngRedux.dispatch({ type: 'ADD_USERS', payload: new ReduxTable({ list: users, ids: normalizedData.result }) });
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
        this.myService.getUsers(new PageInfo({
            ...this.pageInfo,
            page: event
        })).take(1).subscribe(s => {
            this.pageInfo = s.pageInfo;
            let normalizedData = normalizeUsers(s.list);
            let users = normalizedData.entities.users;
            this.ngRedux.dispatch({ type: 'ADD_USERS', payload: new ReduxTable({ list: users, ids: normalizedData.result }) });
        });
    }
}
