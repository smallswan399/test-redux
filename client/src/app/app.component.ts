import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IAppState, ReduxTable } from "app/app.state";
import { NgRedux, select } from "@angular-redux/store";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/take";
import { Subject } from "rxjs/Subject";
import { MyHttpService } from "app/my-service.service";
import { normalizeUser, normalizeUsers } from "app/schema";
import { UserQueryService } from "app/users-query.service";
import { User } from 'app/user';
import { Post } from 'app/post';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    ngOnInit(): void {
        
    }
}