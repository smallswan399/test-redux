import { Component, OnInit } from '@angular/core';
import { User, Message } from "app/user";
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
    debugger;
    this.user$.takeUntil(this.unSub).subscribe(s => {
      alert("user changed");
    });
    this.notification$.takeUntil(this.unSub).subscribe(s => {
      alert('Notification changed');
    });
    this.messageList1$.takeUntil(this.unSub).subscribe(s => {
      alert('Message List 1 changed');
    });
    this.messageList2$.takeUntil(this.unSub).subscribe(s => {
      alert('Message List 2 changed');
    });
  }
  title = 'app';
  // user: User = new User();
  @select() user$;
  @select(['user', 'notifications']) notification$;
  @select((state: IAppState) => state.user.conversations[0].messages) messageList1$: Observable<Message[]>;
  @select((state: IAppState) => state.user.conversations[1].messages) messageList2$: Observable<Message[]>;
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


  message1Call(){
    debugger;
    this.ngRedux.dispatch({type: 'message1'});
  }

  message2Call(){
    debugger;
    this.ngRedux.dispatch({type: 'message2'});
  }
}