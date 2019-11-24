import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/post';
import { UserQueryService } from 'src/app/users-query.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  constructor(private que: UserQueryService) { }

  ngOnInit() {
  }

}
