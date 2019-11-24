import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedList } from './pagedList';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class MyHttpService {
  constructor(private http: HttpClient) { }

  getPosts(userId: number) {
    return this.http.get(`http://5ddae2ef5730550014fe7add.mockapi.io/users/${userId}/posts`);
  }

  getUser(id: number) {
    return this.http.get('http://5ddae2ef5730550014fe7add.mockapi.io/users/' + id);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://5ddae2ef5730550014fe7add.mockapi.io/users');
  }
}
