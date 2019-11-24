import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from "rxjs";
import { Subject } from "rxjs";
import { UserQueryService } from '../users-query.service';
import { Post } from '../post';
import { User } from '../user';

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
