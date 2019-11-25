import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedList } from './pagedList';
import { User } from './user';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class MyHttpService {
  constructor(private http: HttpClient) { }

  getPosts(userId: string) {
    return this.http.get(`http://5ddae2ef5730550014fe7add.mockapi.io/users/${userId}/posts`);
  }

  getUser(id: string) {
    return this.http.get('http://5ddae2ef5730550014fe7add.mockapi.io/users/' + id);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://5ddae2ef5730550014fe7add.mockapi.io/users');
  }

  updateUser(user: User){
    return this.http.put(`http://5ddae2ef5730550014fe7add.mockapi.io/users/${user.id}`, user);
  }

  createPost(post: Post) {
    return this.http.post(`http://5ddae2ef5730550014fe7add.mockapi.io/users/${post.userId}/posts`, post);
  }
  updatePost(post: Post){
    return this.http.put(`http://5ddae2ef5730550014fe7add.mockapi.io/users/${post.userId}/posts/${post.id}`, post);
  }
}