import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux } from "@angular-redux/store";
import { AppComponent } from './app.component';
import { IAppState, INITIAL_STATE, rootReducer } from "app/app.state";
import { createLogger } from 'redux-logger';
import { MyHttpService } from "app/my-service.service";
import { HttpModule } from "@angular/http";
import { UserQueryService } from "app/users-query.service";
import { PostsComponent } from './posts/posts.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './users/users.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AppComponent,
        PostsComponent,
        UsersComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        NgReduxModule,
        AppRoutingModule,
        RouterModule
    ],
    providers: [MyHttpService,
        UserQueryService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(ngRedux: NgRedux<IAppState>) {
        ngRedux.configureStore(rootReducer, INITIAL_STATE, [createLogger()]);
    }
}
