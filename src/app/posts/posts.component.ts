import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Post } from "app/user";
import { UserQueryService } from "app/users-query.service";
import { Subject } from "rxjs/Subject";

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
    this.posts$ = this.userQueryService.getPostsWithUser();
    this.posts$.takeUntil(this.unSub).subscribe(s => {
      debugger;
    });
  }
}
