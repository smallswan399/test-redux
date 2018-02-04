import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux } from "@angular-redux/store";
import { AppComponent } from './app.component';
import { IAppState, INITIAL_STATE, rootReducer } from "app/app.state";
import { createLogger } from 'redux-logger';
import { MyServiceService } from "app/my-service.service";
import { HttpModule } from "@angular/http";
import { UserQueryService } from "app/users-query.service";
import { PostsComponent } from './posts/posts.component';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgReduxModule,
    AppRoutingModule
  ],
  providers: [MyServiceService,
    UserQueryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [createLogger()]);
  }
}
