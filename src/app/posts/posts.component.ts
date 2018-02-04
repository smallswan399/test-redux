import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { User } from "app/user";
import { UserQueryService } from "app/users-query.service";
import { Subject } from "rxjs/Subject";
import { Post } from 'app/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.unSub.next();
    this.unSub.complete();
  }
  unSub = new Subject<void>();
  posts$: Observable<Post[]>;
  constructor(private userQueryService: UserQueryService) { }

  ngOnInit() {
    this.posts$ = this.userQueryService.getPosts();
  }


  getUserById(id: number): Observable<User>{
    return this.userQueryService.getUserById(id);
  }
}
