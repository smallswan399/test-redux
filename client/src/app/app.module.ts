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
import {NgxPaginationModule} from 'ngx-pagination';
import { ObjectInitializationComponent } from './object-initialization/object-initialization.component';
import { TemplateComponent } from './template/template.component';

@NgModule({
    declarations: [
        AppComponent,
        PostsComponent,
        UsersComponent,
        ObjectInitializationComponent,
        TemplateComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        NgReduxModule,
        AppRoutingModule,
        RouterModule,
        NgxPaginationModule
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
