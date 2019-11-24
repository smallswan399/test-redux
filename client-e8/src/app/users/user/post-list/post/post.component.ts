import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/post';
import { UserQueryService } from 'src/app/users-query.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  user: User;
  constructor(private que: UserQueryService) { }

  ngOnInit() {
    this.que.getUserById(this.post.userId).subscribe(u => this.user = u);
  }

}
