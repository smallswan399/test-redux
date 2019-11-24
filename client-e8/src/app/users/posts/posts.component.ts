import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @Input() user: User;
  constructor() { }

  ngOnInit() {
  }

}
