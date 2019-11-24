import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { IAppState, rootReducer, INITIAL_STATE } from './app.state';
import { ProductsComponent } from './products/products.component';
import { TestsComponent } from './tests/tests.component';
import { UsersComponent } from './users/users.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './users/user/user.component';
import { PostListComponent } from './users/user/post-list/post-list.component';
import { PostComponent } from './users/user/post-list/post/post.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    TestsComponent,
    UsersComponent,
    UserComponent,
    PostListComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, private devTools: DevToolsExtension) {
      let enhancers = [];
      if (devTools.isEnabled()) {
          enhancers = [...enhancers, devTools.enhancer()];
        }
      ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancers);
  }
}
