import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PagedList } from './pagedList';
import { User } from './user';
import { Post } from './post';
import { normalizeUser } from './schema';
import { NgRedux } from '@angular-redux/store';
import { IAppState, ReduxTable } from './app.state';

@Injectable({
  providedIn: 'root'
})
export class MyHttpService {
  constructor(private http: HttpClient, private ngRedux: NgRedux<IAppState>) { }

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
    return this.http.put(`http://5ddae2ef5730550014fe7add.mockapi.io/users/${user.id}`, user).pipe(tap(() => {
      const data = normalizeUser(user);
      const users = data.entities.users;
      this.ngRedux.dispatch({ type: 'users.addOrUpdate', payload: new ReduxTable({ list: users, ids: data.result }) });
    }));
  }

  createPost(post: Post) {
    return this.http.post(`http://5ddae2ef5730550014fe7add.mockapi.io/users/${post.userId}/posts`, post);
  }
  updatePost(post: Post){
    return this.http.put(`http://5ddae2ef5730550014fe7add.mockapi.io/users/${post.userId}/posts/${post.id}`, post);
  }
}
