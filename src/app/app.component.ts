import { Component, OnInit } from '@angular/core';
import { User } from "app/user";
import { Observable } from "rxjs/Observable";
import { IAppState } from "app/app.state";
import { NgRedux, select } from "@angular-redux/store";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/take";
import { Subject } from "rxjs/Subject";
import { MyServiceService } from "app/my-service.service";
import { normalizeUser, normalizeUsers } from "app/schema";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private unSub: Subject<void> = new Subject<void>();
  title = 'app';
  user: string;
  users: string;

  @select((state: IAppState) => state.entities.users.map(s => s)) users$: Observable<User[]>;
  constructor(private myService: MyServiceService, private ngRedux: NgRedux<IAppState>) {
  }

  ngOnInit(): void {
    
  }

  getUser(){
    this.myService.getUser().take(1).subscribe(s => {
      this.user = JSON.stringify(normalizeUser(s));
    });
  }

  getUsers(){
    this.myService.getUsers().take(1).subscribe(s => {
      let normalizedData = normalizeUsers(s);
      let users = normalizedData.entities.user;
      let posts = normalizedData.entities.post;
      debugger;
      this.ngRedux.dispatch({type: 'ADD_USERS', payload: {users: users, ids: normalizedData.result}});
      this.ngRedux.dispatch({type: 'ADD_POSTS', payload: {posts: posts, ids: Object.keys(posts).map(s => +s)}});

      debugger;

      this.users = JSON.stringify(normalizedData);
    });
  }
}