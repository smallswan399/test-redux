import { Component, OnInit, Input } from '@angular/core';
import { MyHttpService } from 'src/app/http.service';
import { normalizePosts, normalizePost } from 'src/app/schema';
import { getActionData } from 'src/app/action-data';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'src/app/app.state';
import { Post } from 'src/app/post';
import { UserQueryService } from 'src/app/users-query.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @Input() userId: string;
  posts: Post[] = [];
  postContent: string;
  constructor(private http: MyHttpService, private redux: NgRedux<IAppState>, private query: UserQueryService) { }

  ngOnInit() {
    this.query.getPostsByUserId(this.userId).subscribe(ps => this.posts = ps);
    this.http.getPosts(this.userId).subscribe(ps => {
      const data = normalizePosts(ps);
      const posts = data.entities.posts;
      const users = data.entities.users;

      if (posts) {
        this.redux.dispatch(getActionData(posts, 'posts.addOrUpdate'));
      }
      if (users) {
        this.redux.dispatch(getActionData(users, 'users.addOrUpdate'));
      }
    });
  }

  submitHandler(){
    this.http.createPost(new Post({
      userId: this.userId,
      content: this.postContent,
      title: 'title'
    })).subscribe(p => {
      this.postContent = '';
      const data = normalizePost(p);
      const posts = data.entities.posts;
      if (posts) {
        this.redux.dispatch(getActionData(posts, 'posts.addOrUpdate'));
      }
    });
  }

}
