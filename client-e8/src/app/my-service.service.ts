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

  getPosts() {
    return this.http.get('http://localhost:9000/api/Posts');
  }

  getUser() {
    return this.http.get('http://localhost:9000/api/users/1');
  }

  getUsers(): Observable<PagedList<User>> {
    return this.http.get<PagedList<User>>('http://localhost:9000/api/users');
  }
}
