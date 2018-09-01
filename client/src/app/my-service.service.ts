import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { PagedList } from 'app/pagedList';
import { User } from 'app/user';

@Injectable()
export class MyHttpService {
  constructor(private http: Http) { }

  getPosts() {
    return this.http.get('http://localhost:9000/api/Posts').map(s => s.json());
  }

  getUser() {
    return this.http.get('http://localhost:9000/api/users/1').map(s => s.json());
  }

  getUsers(): Observable<PagedList<User>> {
    return this.http.get('http://localhost:9000/api/users').map(s => s.json());
  }
}
