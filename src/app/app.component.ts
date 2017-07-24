import { Component, OnInit } from '@angular/core';
import { User } from "app/user";
import { Observable } from "rxjs/Observable";
import { IAppState } from "app/app.state";
import { NgRedux, select } from "@angular-redux/store";
import "rxjs/add/operator/takeUntil";
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private unSub: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    this.user$.takeUntil(this.unSub).subscribe(s => {
      alert("user changed");
    });
    this.notification$.takeUntil(this.unSub).subscribe(s => {
      alert('Notification changed');
    });
  }
  title = 'app';
  // user: User = new User();
  @select() user$: Observable<User>;
  @select(['user', 'notifications']) notification$: Observable<Notification[]>;

  /**
   *
   */
  constructor(private ngRedux: NgRedux<IAppState>) {
    // this.user$ = this.ngRedux.select<User>("user");
  }

  userCall(){
    this.ngRedux.dispatch({type: 'user'});
  }

  notificationCall(){
    this.ngRedux.dispatch({type: 'notification'});
  }
}