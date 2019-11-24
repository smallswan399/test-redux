import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user';
import { MyHttpService } from 'src/app/http.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState, ReduxTable } from 'src/app/app.state';
import { normalizePosts } from 'src/app/schema';
import { getActionData } from 'src/app/action-data';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user: User;
  constructor(private http: MyHttpService, private redux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.http.getPosts(this.user.id).subscribe(ps => {
      const data = normalizePosts(ps);
      const posts = data.entities.posts;
      const users = data.entities.users;

      if (posts) {
        this.redux.dispatch(getActionData(posts, 'posts.addOrUpdate'));
      }
      if (users) {
        this.redux.dispatch(getActionData(users, 'users.addOrUpdate'));
      }


    })
  }

}
